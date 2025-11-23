// NO DECORATORS - Using EntitySchema instead (see Settings.schema.ts)
// NO extends BaseEntity - plain class to avoid TypeORM metadata initialization
// Re-export from schema file
export { Settings, SettingsSchema } from './Settings.schema';
