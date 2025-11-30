import 'reflect-metadata';
import { getAppDataSource } from '../data-source';
import Database from 'better-sqlite3';

async function addMissingColumns() {
  const dataSource = getAppDataSource();
  
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  const dbPath = process.env.SQLITE_DB_PATH || dataSource.options.database as string;
  console.log(`[Migration] Using database: ${dbPath}`);
  
  const db = new Database(dbPath);
  
  try {
    // Check if columns exist and add them if missing
    const tables = [
      {
        table: 'video',
        columns: [
          { name: 'desiredResolution', type: 'TEXT', nullable: true }
        ]
      },
      {
        table: 'profile',
        columns: [
          { name: 'imageModel', type: 'TEXT', nullable: true }
        ]
      },
      {
        table: 'channel',
        columns: [
          { name: 'descriptionFooter', type: 'TEXT', nullable: true }
        ]
      }
    ];

    for (const { table, columns } of tables) {
      // Check if table exists
      const tableInfo = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`).get(table);
      if (!tableInfo) {
        console.log(`⚠️  Table ${table} does not exist, skipping...`);
        continue;
      }

      // Get existing columns
      const existingColumns = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
      const existingColumnNames = existingColumns.map(col => col.name);

      for (const column of columns) {
        if (existingColumnNames.includes(column.name)) {
          console.log(`✅ Column ${table}.${column.name} already exists`);
        } else {
          console.log(`➕ Adding column ${table}.${column.name}...`);
          const nullable = column.nullable ? '' : ' NOT NULL';
          db.prepare(`ALTER TABLE ${table} ADD COLUMN ${column.name} ${column.type}${nullable}`).run();
          console.log(`✅ Added column ${table}.${column.name}`);
        }
      }
    }

    console.log('\n✅ Migration complete!');
  } catch (error: any) {
    console.error('❌ Migration error:', error);
    throw error;
  } finally {
    db.close();
    await dataSource.destroy();
  }
}

if (require.main === module) {
  addMissingColumns().catch(error => {
    console.error('Failed to run migration:', error);
    process.exit(1);
  });
}

export { addMissingColumns };

