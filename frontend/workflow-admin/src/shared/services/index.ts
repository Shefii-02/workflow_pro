import apiClient from './api-client'
import type {
  ApiResponse,
  AuthCredentials,
  AuthResponse,
  Company,
  PaginationParams,
  Project,
  Task,
  User,
} from '../types'
import { mockUsers } from '../utils/mock-data'

export { apiCache, createApiCacheKey } from './api-cache'
export type { ApiCacheEntry, ApiCacheOptions } from './api-cache'

// Mock Auth Service - validates against mock users
const MOCK_PASSWORD = 'password123'

type QueryParams = Partial<PaginationParams> & Record<string, string | number | boolean | undefined>
type EntityMutation<T extends { id: string; createdAt: string; updatedAt: string }> = Partial<
  Omit<T, 'id' | 'createdAt' | 'updatedAt'>
>

function getResponseData<T>(response: { data: ApiResponse<T> }): T {
  if (response.data.data === undefined) {
    throw new Error(response.data.error || response.data.message || 'API response did not include data')
  }

  return response.data.data
}

function createEntityService<T extends { id: string; createdAt: string; updatedAt: string }>(resourcePath: string) {
  return {
    getMany: async (params?: QueryParams): Promise<T[]> => {
      const response = await apiClient.get<ApiResponse<T[]>>(resourcePath, { params })
      return getResponseData(response)
    },

    getOne: async (id: string): Promise<T> => {
      const response = await apiClient.get<ApiResponse<T>>(`${resourcePath}/${id}`)
      return getResponseData(response)
    },

    create: async (data: EntityMutation<T>): Promise<T> => {
      const response = await apiClient.post<ApiResponse<T>>(resourcePath, data)
      return getResponseData(response)
    },

    update: async (id: string, data: EntityMutation<T>): Promise<T> => {
      const response = await apiClient.patch<ApiResponse<T>>(`${resourcePath}/${id}`, data)
      return getResponseData(response)
    },

    delete: async (id: string): Promise<void> => {
      await apiClient.delete(`${resourcePath}/${id}`)
    },
  }
}

const createAuthResponse = (user: User): AuthResponse => ({
  user,
  token: `mock_token_${user.id}`,
  refreshToken: `mock_refresh_${user.id}`,
  expiresIn: 3600,
})

export const authService = {
  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    // Mock implementation: find user by email and validate password
    const user = mockUsers.find((u) => u.email === credentials.email)
    
    if (!user) {
      throw new Error('Invalid email or password')
    }
    
    // Simple password check (in real app, this would be hashed on backend)
    if (credentials.password !== MOCK_PASSWORD) {
      throw new Error('Invalid email or password')
    }
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    return createAuthResponse(user)
  },

  register: async (userData: Partial<User> & { password: string }): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData)
    return getResponseData(response)
  },

  logout: async (): Promise<void> => {
    // Mock logout
    await new Promise((resolve) => setTimeout(resolve, 300))
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/refresh', {
      refreshToken,
    })
    return getResponseData(response)
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me')
    return getResponseData(response)
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/forgot-password', {
      email,
    })
    return getResponseData(response)
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/reset-password', {
      token,
      newPassword,
    })
    return getResponseData(response)
  },
}

export const userService = {
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`)
    return getResponseData(response)
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, userData)
    return getResponseData(response)
  },

  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>('/users/profile', profileData)
    return getResponseData(response)
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>('/users/change-password', {
      oldPassword,
      newPassword,
    })
    return getResponseData(response)
  },

  deleteAccount: async (): Promise<{ message: string }> => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>('/users/account')
    return getResponseData(response)
  },
}

const companiesApi = createEntityService<Company>('/companies')
const projectsApi = createEntityService<Project>('/projects')
const tasksApi = createEntityService<Task>('/tasks')

export const companyService = {
  getCompanies: companiesApi.getMany,

  getCompany: companiesApi.getOne,

  createCompany: companiesApi.create,

  updateCompany: companiesApi.update,

  deleteCompany: companiesApi.delete,
}

export const projectService = {
  getProjects: projectsApi.getMany,

  getProject: projectsApi.getOne,

  createProject: projectsApi.create,

  updateProject: projectsApi.update,

  deleteProject: projectsApi.delete,
}

export const taskService = {
  getTasks: tasksApi.getMany,

  getTask: tasksApi.getOne,

  createTask: tasksApi.create,

  updateTask: tasksApi.update,

  deleteTask: tasksApi.delete,
}
