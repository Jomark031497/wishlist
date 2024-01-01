import { useAuth } from '@/features/auth/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthRoute = () => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
