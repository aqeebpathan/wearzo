import { httpClient } from "@/shared/api/httpClient"
import {
  CreateUserDto,
  UpdateUserRoleDto,
  UserResponse,
  UsersResponse,
  UpdateUserResponse,
  ApiResponse,
} from "../types/user.types"

// Fetch all users
export const fetchUsers = async (): Promise<UsersResponse> => {
  const { data } = await httpClient.get<UsersResponse>("/admin/users")
  return data
}

// Create a new user
export const createUser = async (
  payload: CreateUserDto,
): Promise<UserResponse> => {
  const { data } = await httpClient.post<UserResponse>("/admin/users", payload)
  return data
}

// Update user role
export const updateUserRole = async (
  payload: UpdateUserRoleDto,
): Promise<UpdateUserResponse> => {
  const { data } = await httpClient.patch<UpdateUserResponse>(
    `/admin/users/${payload.userId}/role`,
    { role: payload.role },
  )
  return data
}

// Delete a user by ID
export const deleteUser = async (
  userId: string,
): Promise<ApiResponse<null>> => {
  const { data } = await httpClient.delete<ApiResponse<null>>(
    `/admin/users/${userId}`,
  )
  return data
}
