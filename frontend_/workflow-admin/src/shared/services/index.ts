import { mockUsers } from '../utils/mock-data'
import type { AccountType, AuthCredentials, AuthResponse, User, UserRole } from '../types'
import { Storage } from '../utils/helpers'
import { STORAGE_KEYS } from '../constants'

const MOCK_PASSWORD = 'password123'

const makeToken = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2)}`

const createAuthResponse = (user: User): AuthResponse => ({
  token: makeToken('auth-token'),
  refreshToken: makeToken('refresh-token'),
  user,
})

export const authService = {
  login: async ({ email, password }: AuthCredentials): Promise<AuthResponse> => {
    const normalizedEmail = email.trim().toLowerCase()
    const user = mockUsers.find((item) => item.email.toLowerCase() === normalizedEmail)

    await new Promise((resolve) => setTimeout(resolve, 250))

    if (!user || password !== MOCK_PASSWORD) {
      throw new Error('Invalid email or password')
    }

    const response = createAuthResponse(user)
    Storage.set(STORAGE_KEYS.USER, response.user)
    Storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token)
    Storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken)
    return response
  },

  register: async (userData: Partial<User> & { password: string }): Promise<AuthResponse> => {
    const createdUser: User = {
      id: `${Date.now()}`,
      email: userData.email ?? '',
      name: userData.name ?? 'New User',
      avatar: userData.name?.slice(0, 2).toUpperCase() ?? 'NU',
      accountType: (userData.accountType ?? 'company') as AccountType,
      role: (userData.role ?? 'staff') as UserRole,
      permissions: [],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const response = createAuthResponse(createdUser)
    Storage.set(STORAGE_KEYS.USER, response.user)
    Storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token)
    Storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken)
    return response
  },

  getCurrentUser: async (): Promise<User> => {
    const storedUser = Storage.get(STORAGE_KEYS.USER)
    if (!storedUser) {
      throw new Error('No authenticated user')
    }
    return storedUser as User
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const storedRefreshToken = Storage.get(STORAGE_KEYS.REFRESH_TOKEN)
    if (refreshToken !== storedRefreshToken) {
      throw new Error('Invalid refresh token')
    }
    const user = Storage.get(STORAGE_KEYS.USER) as User | null
    if (!user) {
      throw new Error('No authenticated user found')
    }
    const response = createAuthResponse(user)
    Storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token)
    Storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken)
    return response
  },
}
