import { useAuth } from '@/features/auth/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthRoute = () => {
  const { data: auth } = useAuth()

  if (auth) {
    console.log('authenticated, navigating to home')
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
