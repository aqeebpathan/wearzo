import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { getOrCreateGuestId } from "@/shared/utils/guest"
import { InitialAuthState, User } from "./types/auth.types"

const initialState: InitialAuthState = {
  user: null,
  guestId: getOrCreateGuestId(),
  isAuthLoading: true,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isAuthLoading = false
    },
    clearUser: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.isAuthLoading = false
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isAuthLoading = action.payload
    },
  },
})

export const { setUser, clearUser, setAuthLoading } = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer
