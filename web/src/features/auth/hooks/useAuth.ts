import { getAuthenticatedUserHandler } from '@/features/auth/handlers/getAuthenticatedUserHandler'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: getAuthenticatedUserHandler,
    retry: false,
  })
}
