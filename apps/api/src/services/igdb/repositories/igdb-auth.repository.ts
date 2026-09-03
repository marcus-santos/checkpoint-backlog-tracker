import { eq } from "drizzle-orm";
import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { thirdPartyTokens } from "../../../config/db/schema";
import { IgdbAuthRepository, IgdbTokenEntity } from "./igdb-auth.repository.interface";

export class DrizzleIgdbAuthRepository implements IgdbAuthRepository {
  private db: DrizzleD1Database;

  constructor(d1Binding: D1Database) {
    this.db = drizzle(d1Binding);
  }
  
  async getToken(): Promise<IgdbTokenEntity | null> {
    const result = await this.db
      .select()
      .from(thirdPartyTokens)
      .where(eq(thirdPartyTokens.service, 'igdb'))
      .get();

    if (!result) return null;

    return {
      service: result.service,
      token: result.token,
      expiresAt: result.expiresAt.getTime(),
      type: result.type
    }

  }
  async saveToken(data: Omit<IgdbTokenEntity, "service">): Promise<void> {
    await this.db
      .insert(thirdPartyTokens)
      .values({
        service: 'igdb',
        token: data.token,
        expiresAt: new Date(data.expiresAt),
        type: data.type
      }).onConflictDoUpdate({
        target: thirdPartyTokens.service,
        set: {
          token: data.token,
          expiresAt: new Date(data.expiresAt),
          type: data.type
        }
      })

  }
  
}