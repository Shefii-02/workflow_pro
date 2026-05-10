import { useMemo, type ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from './app/store/store.ts'
import LoginPage from './auth/pages/LoginPage.tsx'
import Unauthorized from './pages/Unauthorized.tsx'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8 text-gray-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Workflow Admin</h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to the admin demo. Use one of the demo credentials to sign in.
        </p>
        <p className="text-sm text-gray-500">After login, there is no backend required for authentication.</p>
      </div>
    </div>
  )
}

export default function App() {
  const routes = useMemo(
    () => [
      { path: '/', element: <ProtectedRoute><HomePage /></ProtectedRoute> },
      { path: '/login', element: <LoginPage /> },
      { path: '/unauthorized', element: <Unauthorized /> },
    ],
    [],
  )

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
