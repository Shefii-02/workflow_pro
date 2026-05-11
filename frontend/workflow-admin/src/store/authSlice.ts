import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../lib/api'
import type { AuthResponse, LoginPayload, RegisterPayload, RefreshTokenResponse } from '../lib/api'

export interface User {
  id: string
  name: string
  email: string
  account_type: string
}

export interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
  tokenExpiry: number | null
  refreshTokenExpiry: number | null
  user: User | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  isRefreshing: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  tokenExpiry: null,
  refreshTokenExpiry: null,
  user: null,
  status: 'idle',
  error: null,
  isRefreshing: false,
}

// Load auth state from localStorage
const loadAuthState = (): Partial<AuthState> => {
  try {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')
    const tokenExpiry = localStorage.getItem('token_expiry')
    const refreshTokenExpiry = localStorage.getItem('refresh_token_expiry')
    const user = localStorage.getItem('user')

    if (accessToken && user) {
      const now = Date.now()
      const expiry = tokenExpiry ? parseInt(tokenExpiry) : 0

      // Check if token is still valid (with 5 minute buffer)
      if (expiry > now + 300000) {
        return {
          isAuthenticated: true,
          accessToken,
          refreshToken: refreshToken || null,
          tokenExpiry: expiry,
          refreshTokenExpiry: refreshTokenExpiry ? parseInt(refreshTokenExpiry) : null,
          user: JSON.parse(user),
        }
      }
    }
  } catch (error) {
    console.error('Error loading auth state:', error)
  }

  return {}
}

// Save auth state to localStorage
const saveAuthState = (state: AuthState) => {
  try {
    if (state.accessToken) {
      localStorage.setItem('access_token', state.accessToken)
    } else {
      localStorage.removeItem('access_token')
    }

    if (state.refreshToken) {
      localStorage.setItem('refresh_token', state.refreshToken)
    } else {
      localStorage.removeItem('refresh_token')
    }

    if (state.tokenExpiry) {
      localStorage.setItem('token_expiry', state.tokenExpiry.toString())
    } else {
      localStorage.removeItem('token_expiry')
    }

    if (state.refreshTokenExpiry) {
      localStorage.setItem('refresh_token_expiry', state.refreshTokenExpiry.toString())
    } else {
      localStorage.removeItem('refresh_token_expiry')
    }

    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('user')
    }
  } catch (error) {
    console.error('Error saving auth state:', error)
  }
}

export const loginAsync = createAsyncThunk<AuthResponse, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.login(payload)
    } catch (error: unknown) {
      const err = error as any
      return rejectWithValue(err.response?.data?.error || err.message || 'Login failed')
    }
  },
)

export const registerAsync = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.register(payload)
    } catch (error: unknown) {
      const err = error as any
      return rejectWithValue(err.response?.data?.error || err.message || 'Registration failed')
    }
  },
)

export const refreshTokenAsync = createAsyncThunk<RefreshTokenResponse, void, { rejectValue: string }>(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { auth: AuthState }
      const refreshToken = state.auth.refreshToken

      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      return await authApi.refreshToken(refreshToken)
    } catch (error: unknown) {
      const err = error as any
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const rejectWithValue = thunkAPI.rejectWithValue
      return rejectWithValue(err.response?.data?.error || err.message || 'Token refresh failed')
    }
  },
)

export const logoutAsync = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as { auth: AuthState }
      const refreshToken = state.auth.refreshToken

      if (refreshToken) {
        await authApi.logout(refreshToken)
      }
    } catch (error: unknown) {
      // Even if logout fails on server, we still want to clear local state
      console.warn('Logout request failed:', error)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState: { ...initialState, ...loadAuthState() },
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.accessToken = null
      state.refreshToken = null
      state.tokenExpiry = null
      state.refreshTokenExpiry = null
      state.user = null
      state.status = 'idle'
      state.error = null
      state.isRefreshing = false
      saveAuthState(state)
    },
    setCredentials(state, action: PayloadAction<AuthResponse>) {
      const now = Date.now()
      state.isAuthenticated = true
      state.accessToken = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
      state.tokenExpiry = now + (action.payload.expires_in * 1000)
      state.refreshTokenExpiry = now + (action.payload.refresh_expires_in * 1000)
      state.user = action.payload.user
      state.status = 'succeeded'
      state.error = null
      state.isRefreshing = false
      saveAuthState(state)
    },
    setRefreshing(state, action: PayloadAction<boolean>) {
      state.isRefreshing = action.payload
    },
    checkTokenExpiry(state) {
      const now = Date.now()
      if (state.tokenExpiry && state.tokenExpiry <= now + 300000) { // 5 minutes before expiry
        state.isRefreshing = true
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const now = Date.now()
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.accessToken = action.payload.access_token
        state.refreshToken = action.payload.refresh_token
        state.tokenExpiry = now + (action.payload.expires_in * 1000)
        state.refreshTokenExpiry = now + (action.payload.refresh_expires_in * 1000)
        state.user = action.payload.user
        state.error = null
        saveAuthState(state)
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to login'
        state.isAuthenticated = false
        state.accessToken = null
        state.refreshToken = null
        state.tokenExpiry = null
        state.refreshTokenExpiry = null
        state.user = null
        saveAuthState(state)
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        const now = Date.now()
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.accessToken = action.payload.access_token
        state.refreshToken = action.payload.refresh_token
        state.tokenExpiry = now + (action.payload.expires_in * 1000)
        state.refreshTokenExpiry = now + (action.payload.refresh_expires_in * 1000)
        state.user = action.payload.user
        state.error = null
        saveAuthState(state)
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to register'
        state.isAuthenticated = false
        state.accessToken = null
        state.refreshToken = null
        state.tokenExpiry = null
        state.refreshTokenExpiry = null
        state.user = null
        saveAuthState(state)
      })
      .addCase(refreshTokenAsync.pending, (state) => {
        state.isRefreshing = true
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        const now = Date.now()
        state.accessToken = action.payload.access_token
        state.refreshToken = action.payload.refresh_token
        state.tokenExpiry = now + (action.payload.expires_in * 1000)
        state.refreshTokenExpiry = now + (action.payload.refresh_expires_in * 1000)
        state.user = action.payload.user
        state.isRefreshing = false
        state.error = null
        saveAuthState(state)
      })
      .addCase(refreshTokenAsync.rejected, (state, action) => {
        state.isRefreshing = false
        state.error = action.payload ?? 'Token refresh failed'
        // If refresh fails, logout user
        state.isAuthenticated = false
        state.accessToken = null
        state.refreshToken = null
        state.tokenExpiry = null
        state.refreshTokenExpiry = null
        state.user = null
        saveAuthState(state)
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false
        state.accessToken = null
        state.refreshToken = null
        state.tokenExpiry = null
        state.refreshTokenExpiry = null
        state.user = null
        state.status = 'idle'
        state.error = null
        state.isRefreshing = false
        saveAuthState(state)
      })
  },
})

export const { logout, setCredentials, setRefreshing, checkTokenExpiry } = authSlice.actions
export default authSlice.reducer
