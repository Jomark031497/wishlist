import { useAuth } from '@/features/auth/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
