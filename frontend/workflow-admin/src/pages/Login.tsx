import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { loginAsync } from '../store/authSlice'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const authState = useAppSelector((state) => state.auth)

  const from = (location.state as { from?: Location })?.from?.pathname ?? '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@workflow.com',
      password: 'Password123',
    },
  })

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [authState.isAuthenticated, from, navigate])

  const onSubmit = (values: LoginFormValues) => {
    dispatch(loginAsync(values))
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-soft">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin portal</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950">Sign in to Workflow</h1>
          <p className="mt-2 text-sm text-slate-500">Use admin@workflow.com / Password123 to demo access.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} />
            {errors.password && <p className="mt-2 text-sm text-rose-600">{errors.password.message}</p>}
          </div>

          {authState.error && <p className="text-sm text-rose-600">{authState.error}</p>}

          <Button type="submit" className="w-full" disabled={authState.status === 'loading'}>
            {authState.status === 'loading' ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here?{' '}
          <Link className="font-medium text-brand-600 hover:text-brand-700" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
