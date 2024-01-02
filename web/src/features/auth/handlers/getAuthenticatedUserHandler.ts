import { API_URL } from '@/constants'

export const getAuthenticatedUserHandler = async () => {
  const url = new URL(`${API_URL}/api/auth/user`)

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.message)

  return data
}
