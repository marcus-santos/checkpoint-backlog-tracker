import { IgdbAuthRepository } from "./repositories/igdb-auth.repository.interface"

export type IgdbAuthResponse = {
  access_token: string
  expires_in: number
  token_type: string
}

export class IgdbAuthService {
  private clientId: string
  private clientSecret: string
  private authUrl: string
  private igdbAuthRepository: IgdbAuthRepository

  constructor(clientId: string, clientSecret: string, igdbAuthRepository: IgdbAuthRepository) {
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.authUrl = "https://id.twitch.tv/oauth2/token"
    this.igdbAuthRepository = igdbAuthRepository
  }

  async getValidToken(): Promise<IgdbAuthResponse> {
    const cached = await this.igdbAuthRepository.getToken()

    const currentTime = new Date().getTime()
    

    if (cached && cached.expiresAt > currentTime + (1000 * 5 * 60)) { // transform to seconds and check if the token is valid for at least 5 minutes
      return {
        access_token: cached.token,
        expires_in: cached.expiresAt,
        token_type: cached.type
      }
    } 

    const response = await fetch(this.authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials',
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch IGDB token: ${response.statusText}`)
    }

    const data = await response.json() as IgdbAuthResponse

    data.expires_in = new Date().getTime() + (data.expires_in * 1000) // convert to milliseconds
console.log(data)
    try{
    await this.igdbAuthRepository.saveToken({
      token: data.access_token,
      expiresAt: data.expires_in,
      type: data.token_type
    })}catch (error) {
      console.error("Failed to save IGDB token:", error);
    }
    return data;
  }
}