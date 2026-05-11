import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { loginAsync } from '../../app/store/authSlice'
import { ACCOUNT_TYPE_ROUTES } from '../../shared/constants'
import { ROUTES } from '../../shared/constants/routes'
import { Button } from '../../shared/components/Button'
import { Input } from '../../shared/components/Form'
import { Card, Alert } from '../../shared/components/Card'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    const result = await dispatch(loginAsync(data))
    if (result.meta.requestStatus === 'fulfilled' && result.payload && typeof result.payload !== 'string') {
      const accountType = result.payload.user.accountType
      const redirectPath = ACCOUNT_TYPE_ROUTES[accountType]
      navigate(redirectPath, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-600 text-white text-xl font-bold mb-4">
            ⚡
          </div>
          <h1 className="text-3xl font-bold text-white">Workflow</h1>
          <p className="text-brand-200 mt-2">Enterprise SaaS Platform</p>
        </div>

        {/* Card */}
        <Card className="shadow-2xl">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
              <p className="text-sm text-gray-600 mt-1">Enter your credentials to access your account</p>
            </div>

            {error && <Alert variant="error" title="Login failed" onClose={() => {}}>{error}</Alert>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-brand-600 hover:text-brand-700"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="rounded" />
                  Keep me signed in
                </label>
                <a href={ROUTES.FORGOT_PASSWORD} className="text-sm text-brand-600 hover:text-brand-700">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full"
                isLoading={status === 'loading'}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href={ROUTES.REGISTER} className="text-brand-600 hover:text-brand-700 font-medium">
                Sign up
              </a>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>© 2024 Workflow Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
