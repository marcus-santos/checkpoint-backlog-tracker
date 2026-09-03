export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: Date;
  favoriteGameId?: number | null;
  profilePicture?: string | null;
  coverPicture?: string | null;
};


export interface UserRepository {
  findById(userId: string): Promise<User>;
  update(userId: string, userData: Partial<User>): Promise<User>;
  delete(userId: string): Promise<void>;
}