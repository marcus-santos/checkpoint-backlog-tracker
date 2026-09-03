export type UserEntity = {
  id: string
  name: string
  username: string
  email: string
  password: string
  createdAt: Date
}

export interface AuthRepository {
  findByEmail(email: string): Promise<UserEntity | null>
  findByUsername(username: string): Promise<UserEntity | null>
  create(user: Omit<UserEntity, 'id' | 'createdAt'>): Promise<UserEntity>
}