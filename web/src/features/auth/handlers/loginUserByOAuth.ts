export const loginUserByOAuth = async (provider: string) => {
  const response = await fetch(`http://localhost:8080/api/auth/login/${provider}`, {
    method: 'GET',
    credentials: 'include',
  })

  const data = await response.json()

  if (!response.ok) throw new Error(data.message)

  return data
}
