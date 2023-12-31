import { LoginInputs } from '@/features/auth/schemas'

export const loginUserHandler = async (payload: LoginInputs) => {
  const url = new URL('/api/auth/login', 'http://localhost:8080')

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': ' application/json',
    },
  })

  const data = await response.json()

  if (!response.ok) throw new Error(data.message)

  return data
}
