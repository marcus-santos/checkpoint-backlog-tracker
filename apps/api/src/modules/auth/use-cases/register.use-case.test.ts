import { beforeEach, describe, expect, it, vi } from "vitest"
import { RegisterUseCase } from "./register.use-case"

const { hashMock } = vi.hoisted(() => ({
  hashMock: vi.fn(),
}))

vi.mock("bcryptjs", () => ({
  hash: hashMock,
}))

describe("RegisterUseCase", () => {

  beforeEach(() => {
    hashMock.mockReset()
  })

  it("should create a new user with a hashed password", async () => {
    hashMock.mockResolvedValue("hashed-password")

    const authRepository = {
      findByEmail: vi.fn().mockResolvedValue(null),
      findByUsername: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({
        id: "user-1",
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "hashed-password",
        createdAt: new Date("2026-07-03T12:00:00.000Z"),
      }),
    }

    const registerUseCase = new RegisterUseCase(authRepository)

    const result = await registerUseCase.execute({
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "Secret123!",
    })

    expect(hashMock).toHaveBeenCalledWith("Secret123!", 10)
    expect(authRepository.findByEmail).toHaveBeenCalledWith("john@example.com")
    expect(authRepository.findByUsername).toHaveBeenCalledWith("johndoe")
    expect(authRepository.create).toHaveBeenCalledWith({
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      password: "hashed-password",
    })
    expect(result).toEqual({
      user: {
        id: "user-1",
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        createdAt: new Date("2026-07-03T12:00:00.000Z"),
      },
    })
  })

  it("should throw when the email already exists", async () => {
    hashMock.mockResolvedValue("hashed-password")

    const authRepository = {
      findByEmail: vi.fn().mockResolvedValue({ id: "user-1" }),
      findByUsername: vi.fn(),
      create: vi.fn(),
    }

    const registerUseCase = new RegisterUseCase(authRepository)

    await expect(
      registerUseCase.execute({
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "Secret123!",
      })
    ).rejects.toThrow("Email already exists")

    expect(authRepository.findByUsername).not.toHaveBeenCalled()
    expect(hashMock).not.toHaveBeenCalled()
    expect(authRepository.create).not.toHaveBeenCalled()
  })

  it("should throw when the username already exists", async () => {
    hashMock.mockResolvedValue("hashed-password")

    const authRepository = {
      findByEmail: vi.fn().mockResolvedValue(null),
      findByUsername: vi.fn().mockResolvedValue({ id: "user-1" }),
      create: vi.fn(),
    }

    const registerUseCase = new RegisterUseCase(authRepository)

    await expect(
      registerUseCase.execute({
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "Secret123!",
      })
    ).rejects.toThrow("Username already exists")

    expect(hashMock).not.toHaveBeenCalled()
    expect(authRepository.create).not.toHaveBeenCalled()
  })
})