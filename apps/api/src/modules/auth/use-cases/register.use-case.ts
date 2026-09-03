import { hash } from "bcryptjs"
import { AuthRepository } from "../repositories/auth.repository.interface"

type RegisterUserRequest = {
  name: string
  username: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

    async execute({name, username, email, password}: RegisterUserRequest) {
      const doesEmailExists = await this.authRepository.findByEmail(email);
      if(doesEmailExists) {
        throw new Error('Email already exists');
      }

      const doesUsernameExists = await this.authRepository.findByUsername(username);
      if(doesUsernameExists) {
        throw new Error('Username already exists');
      }

      const passwordHash = await hash(password, 10);

      const user = await this.authRepository.create({
        name,
        username,
        email,
        password: passwordHash
      });

      return {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt
        }
      }
  }
}