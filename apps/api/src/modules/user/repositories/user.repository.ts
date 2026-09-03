import { eq } from "drizzle-orm";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { users } from "../../../config/db/schema";
import { User, UserRepository } from "./user.repository.interface";

export class DrizzleUserRepository implements UserRepository {
  private db: DrizzleD1Database;
  
    constructor(d1Binding: D1Database) {
      this.db = drizzle(d1Binding);
    }
  
  async findById(userId: string): Promise<User> {
    const user = await this.db.select()
    .from(users)
    .where(eq(users.id, userId))
    .get()

    if (!user) {
      throw new Error("User not found");
    }

    return user

  }
  async update(userId: string, userData: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
  
  async delete(userId: string): Promise<void> {
    await this.db.delete(users)
    .where(eq(users.id, userId))
    .run()
  }
  
} 