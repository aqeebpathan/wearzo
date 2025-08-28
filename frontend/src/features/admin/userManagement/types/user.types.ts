// User entity
export interface User {
  _id: string
  username: string
  email: string
  isVerified: boolean
  lastLogin?: string
  role: "customer" | "admin"
}

// Generic API response
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

// Specific API response types
export type UsersResponse = ApiResponse<User[]>
export type UserResponse = ApiResponse<User>
export type UpdateUserResponse = ApiResponse<User>

// DTOs
export type CreateUserDto = Omit<User, "id">
export type UpdateUserDto = Partial<Omit<User, "id">> & { id: string }

// Payloads for role update or other partial updates
export interface UpdateUserRoleDto {
  userId: string
  role: User["role"]
}
