import { BaseEntity as TypeORMBaseEntity, ObjectLiteral, DeepPartial } from 'typeorm';
import { randomUUID } from 'crypto';

// @ts-expect-error - TypeORM's BaseEntity has findOne with different signature, but we need our own implementation
export class BaseEntity extends TypeORMBaseEntity {
  // MongoDB-style findOne method
  static async findOne<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    options?: any
  ): Promise<T | null> {
    // Get the DataSource and repository
    const { AppDataSource } = await import('../data-source');
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const repository = AppDataSource.getRepository(this as any);
    return repository.findOne(options as any) as Promise<T | null>;
  }

  // MongoDB-style find method
  static async find<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    options?: any
  ): Promise<T[]> {
    // Get the DataSource and repository
    const { AppDataSource } = await import('../data-source');
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const repository = AppDataSource.getRepository(this as any);
    return repository.find(options as any) as Promise<T[]>;
  }


  // MongoDB-style findById method
  static async findById<T extends BaseEntity>(this: { new(): T } & typeof BaseEntity, id: string): Promise<T | null> {
    return this.findOne({ where: { _id: id } } as any) as Promise<T | null>;
  }

  // MongoDB-style findByIdAndUpdate method
  static async findByIdAndUpdate<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    id: string,
    update: Partial<T> | { $set: Partial<T> },
    options: { new?: boolean } = {}
  ): Promise<T | null> {
    const entity = await this.findOne({ where: { _id: id } } as any) as T;
    if (!entity) {
      return null;
    }

    // Handle $set operator
    const updateData = (update as any).$set || update;

    // Apply updates
    Object.assign(entity, updateData);

    // Save and return
    await entity.save();
    return entity;
  }

  // MongoDB-style findByIdAndDelete method
  static async findByIdAndDelete<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    id: string
  ): Promise<T | null> {
    const entity = await this.findOne({ where: { _id: id } } as any) as T;
    if (!entity) {
      return null;
    }

    await (this as any).delete({ _id: id } as any);
    return entity;
  }

  // MongoDB-style findOneAndUpdate with filter and update object
  static async findOneAndUpdate<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    filter: any,
    update: any,
    options: { new?: boolean } = {}
  ): Promise<T | null> {
    // Handle $set operator
    const updateData = update.$set || update;
    
    const entity = await this.findOne({ where: filter } as any) as T;
    if (!entity) {
      return null;
    }

    // Apply updates
    Object.assign(entity, updateData);

    // Save and return
    await entity.save();
    return entity;
  }

  // MongoDB-style findOneAndDelete with filter
  static async findOneAndDelete<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    filter: any
  ): Promise<T | null> {
    const entity = await this.findOne({ where: filter } as any) as T;
    if (!entity) {
      return null;
    }

    await (this as any).delete(filter as any);
    return entity;
  }

  // MongoDB-style createAndSave method (static wrapper that creates and saves)
  static async createAndSave<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    data: Partial<T>
  ): Promise<T> {
    // If _id is not provided but processId is, use processId as _id
    if (!(data as any)._id && (data as any).processId) {
      (data as any)._id = (data as any).processId;
    }
    
    // Auto-generate _id if not provided (for entities with PrimaryColumn _id)
    if (!(data as any)._id) {
      (data as any)._id = randomUUID();
    }
    
    // Use TypeORM's create method to create instance
    const entity = (this as any).create(data) as T;
    // Save the entity
    return await entity.save();
  }

  // Additional MongoDB-style methods
  static async countDocuments<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    filter: Partial<T> = {}
  ): Promise<number> {
    return (this as any).count({ where: filter } as any);
  }

  static async deleteOne<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    filter: Partial<T>
  ): Promise<{ deletedCount?: number }> {
    const result = await (this as any).delete(filter as any);
    return { deletedCount: result.affected ?? undefined };
  }

  static async deleteMany<T extends BaseEntity>(
    this: { new(): T } & typeof BaseEntity,
    filter: Partial<T>
  ): Promise<{ deletedCount?: number }> {
    const result = await (this as any).delete(filter as any);
    return { deletedCount: result.affected ?? undefined };
  }

  // Override save to ensure proper functionality
  async save(): Promise<this> {
    return super.save() as Promise<this>;
  }
}
