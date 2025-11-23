// NO DECORATORS - Using EntitySchema instead (see User.schema.ts)
// NO extends BaseEntity - plain class to avoid TypeORM metadata initialization
// Re-export from schema file
export { User, UserSchema } from './User.schema';
