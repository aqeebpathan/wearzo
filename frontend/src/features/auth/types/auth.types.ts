export interface InitialAuthState {
  user: User | null
  guestId: string
  isAuthLoading: boolean
  isAuthenticated: boolean
}

export interface User {
  _id: string
  username: string
  email: string
  isVerified: boolean
  lastLogin?: string
  role: "customer" | "admin"
}

export interface AuthResponse {
  success: boolean
  message: string
  data: User
}

export interface SignupUserDto {
  username: string
  email: string
  password: string
}

export type LoginUserDto = Omit<SignupUserDto, "username">

export interface VerifyEmailDto {
  code: string
}

export interface AuthState {
  user: User | null
  isAuthLoading: boolean
  isAuthenticated: boolean
}
