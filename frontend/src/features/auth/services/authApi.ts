import { httpClient } from "@/shared/api/httpClient"
import { AuthResponse, LoginUserDto, SignupUserDto } from "../types/auth.types"

export const signupUser = async (
  userData: SignupUserDto,
): Promise<AuthResponse> => {
  const { data } = await httpClient.post("/auth/signup", userData)
  return data
}

export const loginUser = async (
  userData: LoginUserDto,
): Promise<AuthResponse> => {
  const { data } = await httpClient.post("/auth/login", userData)
  return data
}

export const checkAuthStatus = async (): Promise<AuthResponse> => {
  const { data } = await httpClient.get<AuthResponse>("/auth/status")
  return data
}

export const logoutUser = async (): Promise<AuthResponse> => {
  const { data } = await httpClient.post<AuthResponse>("/auth/logout")
  return data
}

export const verifyUserEmail = async (code: string): Promise<AuthResponse> => {
  const { data } = await httpClient.post<AuthResponse>("/auth/verify-email", {
    code,
  })
  return data
}
