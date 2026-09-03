export type IgdbTokenEntity = {
  service: string;
  token: string;
  expiresAt: number;
  type: string;
};

export interface IgdbAuthRepository {
  getToken(): Promise<IgdbTokenEntity | null>;
  saveToken(data: Omit<IgdbTokenEntity, 'service'>): Promise<void>;
}