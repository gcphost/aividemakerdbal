import { BaseEntity as TypeORMBaseEntity } from 'typeorm';
export declare class BaseEntity extends TypeORMBaseEntity {
    static findOne<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, options?: any): Promise<T | null>;
    static find<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, options?: any): Promise<T[]>;
    static create<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, data: Partial<T>): T;
    static findById<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, id: string): Promise<T | null>;
    static findByIdAndUpdate<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, id: string, update: Partial<T> | {
        $set: Partial<T>;
    }, options?: {
        new?: boolean;
    }): Promise<T | null>;
    static findByIdAndDelete<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, id: string): Promise<T | null>;
    static findOneAndUpdate<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, filter: any, update: any, options?: {
        new?: boolean;
    }): Promise<T | null>;
    static findOneAndDelete<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, filter: any): Promise<T | null>;
    static createAndSave<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, data: Partial<T>): Promise<T>;
    static countDocuments<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, filter?: Partial<T>): Promise<number>;
    static deleteOne<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, filter: Partial<T>): Promise<{
        deletedCount?: number;
    }>;
    static deleteMany<T extends BaseEntity>(this: {
        new (): T;
    } & typeof BaseEntity, filter: Partial<T>): Promise<{
        deletedCount?: number;
    }>;
    save(): Promise<this>;
}
//# sourceMappingURL=BaseEntity.d.ts.map