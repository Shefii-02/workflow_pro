import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../app/store/store.ts'
import { loginAsync } from '../../app/store/authSlice.ts'
import { mockUsers } from '../../shared/utils/mock-data.ts'
import type { AuthCredentials } from '../../shared/types.ts'
import { Input } from '../../shared/components/Form.tsx'
import { Button } from '../../shared/components/Button.tsx'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { status, error } = useSelector((state: RootState) => state.auth)

  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: AuthCredentials) => {
    const result = await dispatch(loginAsync(values))
    if (loginAsync.fulfilled.match(result)) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
        <p className="text-sm text-gray-600 mb-6">Use the demo credentials below to sign in.</p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" autoComplete="email" {...register('email')} error={formState.errors.email?.message} />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            {...register('password')}
            error={formState.errors.password?.message}
            icon={<button type="button" onClick={() => setShowPassword((current) => !current)} className="text-sm text-brand-600">
              {showPassword ? 'Hide' : 'Show'}
            </button>}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" isLoading={status === 'loading'}>
            Sign In
          </Button>
        </form>

        <div className="mt-8 rounded-3xl bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Demo accounts</h2>
          <div className="space-y-2 text-sm text-gray-700">
            {mockUsers.map((user) => (
              <div key={user.id} className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.accountType}</p>
                <p className="text-sm">Email: <span className="font-medium">{user.email}</span></p>
                <p className="text-sm">Password: <span className="font-medium">password123</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
