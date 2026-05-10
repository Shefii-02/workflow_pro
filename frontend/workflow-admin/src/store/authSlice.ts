import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../lib/api'
import type { AuthResponse, LoginPayload, RegisterPayload } from '../lib/api'

export interface User {
  name: string
  email: string
}

export interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: User | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  status: 'idle',
  error: null,
}

export const loginAsync = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.login(payload)
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message ?? 'Login failed')
    }
  },
)

export const registerAsync = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.register(payload)
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message ?? 'Registration failed')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.token = null
      state.user = null
      state.status = 'idle'
      state.error = null
    },
    setCredentials(state, action: PayloadAction<AuthResponse>) {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.user = action.payload.user
      state.status = 'succeeded'
      state.error = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.token = action.payload.token
        state.user = action.payload.user
        state.error = null
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to login'
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.token = action.payload.token
        state.user = action.payload.user
        state.error = null
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to register'
      })
  },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer
