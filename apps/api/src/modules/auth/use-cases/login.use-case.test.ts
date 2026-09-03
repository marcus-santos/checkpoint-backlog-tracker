import { beforeEach, describe, expect, it, vi } from "vitest"
import { LoginUseCase } from "./login-use.case"

const { compareMock } = vi.hoisted(() => ({
  compareMock: vi.fn(),
}))

vi.mock("bcryptjs", () => ({
  compare: compareMock,
}))

describe("LoginUseCase", () => {
  beforeEach(() => {
    compareMock.mockReset()
  })

  it("should return the user when the credentials are valid", async () => {
    compareMock.mockResolvedValue(true)

    const authRepository = {
      findByEmail: vi.fn().mockResolvedValue({
        id: "user-1",
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "hashed-password",
        createdAt: new Date("2026-07-03T12:00:00.000Z"),
      }),
      findByUsername: vi.fn(),
      create: vi.fn(),
    }

    const loginUseCase = new LoginUseCase(authRepository)

    const result = await loginUseCase.execute({
      email: "john@example.com",
      password: "Secret123!",
    })

    expect(authRepository.findByEmail).toHaveBeenCalledWith("john@example.com")
    expect(compareMock).toHaveBeenCalledWith("Secret123!", "hashed-password")
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

  it("should throw when the user is not found", async () => {
    const authRepository = {
      findByEmail: vi.fn().mockResolvedValue(null),
      findByUsername: vi.fn(),
      create: vi.fn(),
    }

    const loginUseCase = new LoginUseCase(authRepository)

    await expect(
      loginUseCase.execute({
        email: "john@example.com",
        password: "Secret123!",
      })
    ).rejects.toThrow("User not found")

    expect(compareMock).not.toHaveBeenCalled()
  })

  it("should throw when the password is invalid", async () => {
    compareMock.mockResolvedValue(false)

    const authRepository = {
      findByEmail: vi.fn().mockResolvedValue({
        id: "user-1",
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "hashed-password",
        createdAt: new Date("2026-07-03T12:00:00.000Z"),
      }),
      findByUsername: vi.fn(),
      create: vi.fn(),
    }

    const loginUseCase = new LoginUseCase(authRepository)

    await expect(
      loginUseCase.execute({
        email: "john@example.com",
        password: "WrongPassword!",
      })
    ).rejects.toThrow("Invalid password")

    expect(compareMock).toHaveBeenCalledWith("WrongPassword!", "hashed-password")
  })
})