import { getAuthenticatedUserHandler } from '@/features/auth/handlers/getAuthenticatedUserHandler'
import { loginUserHandler } from '@/features/auth/handlers/loginUserHandler'
import { logoutUserHandler } from '@/features/auth/handlers/logoutUserHandler'
import { LoginInputs } from '@/features/auth/schemas'
import { User } from '@/features/auth/types'
import { ReactNode, createContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: User | null
  handleLogin: (payload: LoginInputs) => Promise<void>
  handleLogout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [user, setUser] = useState<AuthContextType['user']>(null)

  const handleLogin = async (payload: LoginInputs) => {
    try {
      const user = await loginUserHandler(payload)
      setUser(user)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Login failed')
    }
  }

  const handleLogout = async () => {
    try {
      await logoutUserHandler()
      setUser(null)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('Login failed')
    }
  }

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const user = await getAuthenticatedUserHandler()
        setUser(user)
      } catch (error) {
        setUser(null)
      } finally {
        setIsInitialLoading(false)
      }
    }

    checkAuthenticated()
  }, [])

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {!isInitialLoading && children}
    </AuthContext.Provider>
  )
}
