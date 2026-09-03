import { eq } from "drizzle-orm";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { users } from "../../../config/db/schema";
import { AuthRepository, UserEntity } from "./auth.repository.interface";

export class DrizzleAuthRepository implements AuthRepository {
  private db: DrizzleD1Database;
  
  constructor(d1Binding: D1Database) {
    this.db = drizzle(d1Binding);
  }
  

    async findByEmail(email: string): Promise<UserEntity | null> {
      const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get()

      if(!result) return null;

      return {
        id: result.id,
        name: result.name,
        username: result.username,
        email: result.email,
        password: result.password,
        createdAt: result.createdAt
      }
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
      const result = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .get()

      if(!result) return null;
      
      return {
        id: result.id,
        name: result.name,
        username: result.username,
        email: result.email,
        password: result.password,
        createdAt: result.createdAt
      }
    }

    async create(user: Omit<UserEntity, 'id' | 'createdAt'>): Promise<UserEntity> {
      const [inserted] = await this.db
      .insert(users)
      .values({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password
      })
      .returning()

      return {
        id: inserted.id,
        name: inserted.name,
        username: inserted.username,
        email: inserted.email,
        password: inserted.password,
        createdAt: inserted.createdAt
      }
    }


}