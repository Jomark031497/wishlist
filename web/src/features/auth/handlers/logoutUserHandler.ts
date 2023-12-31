export const logoutUserHandler = async () => {
  const url = new URL(`http://localhost:8080/api/auth/logout`)

  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
  })

  const data = await response.json()

  if (!response.ok) throw new Error(data.message)
  return data
}
