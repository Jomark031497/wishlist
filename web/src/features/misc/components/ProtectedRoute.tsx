import { useAuth } from '@/features/auth/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { data: auth } = useAuth()

  console.log('rendering protected route')

  if (!auth) {
    console.log('unauthenticated, navigating...')
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
