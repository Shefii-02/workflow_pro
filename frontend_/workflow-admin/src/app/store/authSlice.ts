import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authService } from '../../shared/services'
import type { AuthCredentials, AuthResponse, AuthState, User } from '../../shared/types'
import { Storage } from '../../shared/utils/helpers'
import { STORAGE_KEYS } from '../../shared/constants'

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: Storage.get(STORAGE_KEYS.AUTH_TOKEN) || null,
  refreshToken: Storage.get(STORAGE_KEYS.REFRESH_TOKEN) || null,
  status: 'idle',
  error: null,
}

export const loginAsync = createAsyncThunk<AuthResponse, AuthCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials)
      Storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token)
      Storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken)
      Storage.set(STORAGE_KEYS.USER, response.user)
      return response
    } catch (error: any) {
      return rejectWithValue(error?.message || error.response?.data?.message || 'Login failed')
    }
  },
)

export const registerAsync = createAsyncThunk<
  AuthResponse,
  Partial<User> & { password: string },
  { rejectValue: string }
>('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData)
    Storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token)
    Storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken)
    Storage.set(STORAGE_KEYS.USER, response.user)
    return response
  } catch (error: any) {
    return rejectWithValue(error?.message || error.response?.data?.message || 'Registration failed')
  }
})

export const getCurrentUserAsync = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser()
      Storage.set(STORAGE_KEYS.USER, user)
      return user
    } catch (error: any) {
      return rejectWithValue(error?.message || error.response?.data?.message || 'Failed to fetch user')
    }
  },
)

export const refreshTokenAsync = createAsyncThunk<
  AuthResponse,
  string,
  { rejectValue: string }
>('auth/refreshToken', async (refreshToken, { rejectWithValue }) => {
  try {
    const response = await authService.refreshToken(refreshToken)
    Storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token)
    Storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken)
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Token refresh failed')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.refreshToken = null
      state.status = 'idle'
      state.error = null
      Storage.remove(STORAGE_KEYS.AUTH_TOKEN)
      Storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
      Storage.remove(STORAGE_KEYS.USER)
    },
    clearError: (state) => {
      state.error = null
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
        state.error = null
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Login failed'
        state.isAuthenticated = false
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
        state.error = null
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Registration failed'
        state.isAuthenticated = false
      })
      .addCase(getCurrentUserAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.status = 'succeeded'
      })
      .addCase(getCurrentUserAsync.rejected, (state) => {
        state.status = 'failed'
        state.isAuthenticated = false
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.refreshToken = action.payload.refreshToken
      })
      .addCase(refreshTokenAsync.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.refreshToken = null
      })
  },
})

export const { logout, clearError, setUser } = authSlice.actions
export default authSlice.reducer
