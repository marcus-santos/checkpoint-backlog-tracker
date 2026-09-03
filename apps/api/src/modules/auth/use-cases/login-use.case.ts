import { compare } from "bcryptjs"
import { AuthRepository } from "../repositories/auth.repository.interface"

type LoginUserRequest = {
  email: string
  password: string
}

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute({ email, password }: LoginUserRequest) {
    const user = await this.authRepository.findByEmail(email)

    if (!user) {
      throw new Error("User not found")
    }

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) {
      throw new Error("Invalid password")
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    }
  }
}