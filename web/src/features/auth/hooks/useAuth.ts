import { AuthContext } from '@/context/auth'
import { useContext } from 'react'

export const useAuth = () => {
  return useContext(AuthContext)
}
