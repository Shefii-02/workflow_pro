import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '../constants'
import { API_ROUTES, ROUTES } from '../constants/routes'
import { Storage } from '../utils/helpers'

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Storage.get(STORAGE_KEYS.AUTH_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Handle 401 (refresh token)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = Storage.get(STORAGE_KEYS.REFRESH_TOKEN)
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}${API_ROUTES.AUTH.REFRESH}`, {
            refreshToken,
          })

          const token = response.data?.token || response.data?.access_token || response.data?.data?.token || response.data?.data?.access_token
          Storage.set(STORAGE_KEYS.AUTH_TOKEN, token)

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }

          return apiClient(originalRequest)
        }
      } catch {
        // Refresh failed, redirect to login
        Storage.remove(STORAGE_KEYS.AUTH_TOKEN)
        Storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
        Storage.remove(STORAGE_KEYS.USER)
        window.location.href = ROUTES.LOGIN
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
