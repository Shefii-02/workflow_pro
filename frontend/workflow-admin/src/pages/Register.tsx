import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { registerAsync } from '../store/authSlice'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const registerSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authState = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [authState.isAuthenticated, navigate])

  const onSubmit = (values: RegisterFormValues) => {
    dispatch(registerAsync(values))
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white/95 p-8 shadow-soft">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Create account</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950">Start your team today</h1>
          <p className="mt-2 text-sm text-slate-500">Secure access with email and password.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="mt-2 text-sm text-rose-600">{errors.name.message}</p>}
          </div>

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
            {authState.status === 'loading' ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link className="font-medium text-brand-600 hover:text-brand-700" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
