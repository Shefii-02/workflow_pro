import apiClient from './api-client'
import type { AuthCredentials, AuthResponse, User, ApiResponse } from '../types'
import { mockUsers } from '../utils/mock-data'

// Mock Auth Service - validates against mock users
const MOCK_PASSWORD = 'password123'

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
    return response.data.data!
  },

  logout: async (): Promise<void> => {
    // Mock logout
    await new Promise((resolve) => setTimeout(resolve, 300))
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/refresh', {
      refreshToken,
    })
    return response.data.data!
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me')
    return response.data.data!
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/forgot-password', {
      email,
    })
    return response.data.data!
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>('/auth/reset-password', {
      token,
      newPassword,
    })
    return response.data.data!
  },
}

export const userService = {
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`)
    return response.data.data!
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, userData)
    return response.data.data!
  },

  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>('/users/profile', profileData)
    return response.data.data!
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>('/users/change-password', {
      oldPassword,
      newPassword,
    })
    return response.data.data!
  },

  deleteAccount: async (): Promise<{ message: string }> => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>('/users/account')
    return response.data.data!
  },
}

export const companyService = {
  getCompanies: async (params?: any) => {
    const response = await apiClient.get('/companies', { params })
    return response.data.data
  },

  getCompany: async (id: string) => {
    const response = await apiClient.get(`/companies/${id}`)
    return response.data.data
  },

  createCompany: async (data: any) => {
    const response = await apiClient.post('/companies', data)
    return response.data.data
  },

  updateCompany: async (id: string, data: any) => {
    const response = await apiClient.patch(`/companies/${id}`, data)
    return response.data.data
  },

  deleteCompany: async (id: string) => {
    await apiClient.delete(`/companies/${id}`)
  },
}

export const projectService = {
  getProjects: async (params?: any) => {
    const response = await apiClient.get('/projects', { params })
    return response.data.data
  },

  getProject: async (id: string) => {
    const response = await apiClient.get(`/projects/${id}`)
    return response.data.data
  },

  createProject: async (data: any) => {
    const response = await apiClient.post('/projects', data)
    return response.data.data
  },

  updateProject: async (id: string, data: any) => {
    const response = await apiClient.patch(`/projects/${id}`, data)
    return response.data.data
  },

  deleteProject: async (id: string) => {
    await apiClient.delete(`/projects/${id}`)
  },
}

export const taskService = {
  getTasks: async (params?: any) => {
    const response = await apiClient.get('/tasks', { params })
    return response.data.data
  },

  getTask: async (id: string) => {
    const response = await apiClient.get(`/tasks/${id}`)
    return response.data.data
  },

  createTask: async (data: any) => {
    const response = await apiClient.post('/tasks', data)
    return response.data.data
  },

  updateTask: async (id: string, data: any) => {
    const response = await apiClient.patch(`/tasks/${id}`, data)
    return response.data.data
  },

  deleteTask: async (id: string) => {
    await apiClient.delete(`/tasks/${id}`)
  },
}
