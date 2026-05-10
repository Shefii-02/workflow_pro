import axios from 'axios'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: { name: string; email: string }
}

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (payload.email === 'admin@workflow.com' && payload.password === 'Password123') {
      return {
        token: 'demo-token',
        user: {
          name: 'Alex Admin',
          email: payload.email,
        },
      }
    }

    throw new Error('Invalid credentials')
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      token: 'demo-token',
      user: {
        name: payload.name,
        email: payload.email,
      },
    }
  },
}

export default api
