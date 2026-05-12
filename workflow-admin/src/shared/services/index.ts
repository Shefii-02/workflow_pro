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
import { AccountType, UserRole } from '../types'
import { API_ROUTES } from '../constants/routes'

export { apiCache, createApiCacheKey } from './api-cache'
export type { ApiCacheEntry, ApiCacheOptions } from './api-cache'

type QueryParams = Partial<PaginationParams> & Record<string, string | number | boolean | undefined>
type EntityMutation<T extends { id: string; createdAt: string; updatedAt: string }> = Partial<
  Omit<T, 'id' | 'createdAt' | 'updatedAt'>
>

type BackendUser = Partial<User> & {
  account_type?: string
  created_at?: string
  updated_at?: string
}

type BackendAuthResponse = Partial<AuthResponse> & {
  access_token?: string
  refresh_token?: string
  expires_in?: number
  user?: BackendUser
}

function getResponseData<T>(response: { data: ApiResponse<T> }): T {
  if (response.data.data === undefined) {
    throw new Error(response.data.error || response.data.message || 'API response did not include data')
  }

  return response.data.data
}

function unwrapResponseData<T>(response: { data: ApiResponse<T> | T }): T {
  const payload = response.data
  if (payload && typeof payload === 'object' && 'data' in payload) {
    const apiResponse = payload as ApiResponse<T>
    if (apiResponse.data === undefined) {
      throw new Error(apiResponse.error || apiResponse.message || 'API response did not include data')
    }
    return apiResponse.data
  }

  return payload as T
}

function normalizeUser(user: BackendUser): User {
  const now = new Date().toISOString()
  const rawAccountType = user.accountType || user.account_type || AccountType.SUPER_ADMIN
  const accountType = rawAccountType === 'sp' ? AccountType.SUPER_ADMIN : rawAccountType

  return {
    id: user.id || '',
    email: user.email || '',
    name: user.name || user.email || 'User',
    avatar: user.avatar,
    accountType: Object.values(AccountType).includes(accountType as AccountType)
      ? accountType as AccountType
      : AccountType.SUPER_ADMIN,
    role: user.role || UserRole.ADMIN,
    permissions: user.permissions || ['view_dashboard'],
    status: user.status || 'active',
    createdAt: user.createdAt || user.created_at || now,
    updatedAt: user.updatedAt || user.updated_at || now,
  }
}

function normalizeAuthResponse(payload: BackendAuthResponse): AuthResponse {
  if (!payload.user) {
    throw new Error('Login response did not include user data')
  }

  const token = payload.token || payload.access_token
  const refreshToken = payload.refreshToken || payload.refresh_token

  if (!token || !refreshToken) {
    throw new Error('Login response did not include auth tokens')
  }

  return {
    token,
    refreshToken,
    expiresIn: payload.expiresIn || payload.expires_in || 3600,
    user: normalizeUser(payload.user),
  }
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

export const authService = {
  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<BackendAuthResponse> | BackendAuthResponse>(API_ROUTES.AUTH.LOGIN, credentials)
    return normalizeAuthResponse(unwrapResponseData(response))
  },

  register: async (userData: Partial<User> & { password: string }): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<BackendAuthResponse> | BackendAuthResponse>(API_ROUTES.AUTH.REGISTER, userData)
    return normalizeAuthResponse(unwrapResponseData(response))
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_ROUTES.AUTH.LOGOUT)
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<BackendAuthResponse> | BackendAuthResponse>(API_ROUTES.AUTH.REFRESH, {
      refreshToken,
      refresh_token: refreshToken,
    })
    return normalizeAuthResponse(unwrapResponseData(response))
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<BackendUser> | BackendUser>(API_ROUTES.AUTH.ME)
    return normalizeUser(unwrapResponseData(response))
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(API_ROUTES.AUTH.FORGOT_PASSWORD, {
      email,
    })
    return getResponseData(response)
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(API_ROUTES.AUTH.RESET_PASSWORD, {
      token,
      newPassword,
    })
    return getResponseData(response)
  },
}

export const userService = {
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`${API_ROUTES.USERS.BASE}/${id}`)
    return getResponseData(response)
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(`${API_ROUTES.USERS.BASE}/${id}`, userData)
    return getResponseData(response)
  },

  updateProfile: async (profileData: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(API_ROUTES.USERS.PROFILE, profileData)
    return getResponseData(response)
  },

  changePassword: async (oldPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(API_ROUTES.USERS.CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
    })
    return getResponseData(response)
  },

  deleteAccount: async (): Promise<{ message: string }> => {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(API_ROUTES.USERS.ACCOUNT)
    return getResponseData(response)
  },
}

const companiesApi = createEntityService<Company>(API_ROUTES.COMPANIES)
const projectsApi = createEntityService<Project>(API_ROUTES.PROJECTS)
const tasksApi = createEntityService<Task>(API_ROUTES.TASKS)

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
