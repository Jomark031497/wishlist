import { Button } from '@/components/ui'
import { useEffect, useState } from 'react'

type Auth = {
  user: {
    userId: string
    username: string
    email: string
  } | null
}

export const Dashboard = () => {
  const [user, setUser] = useState<Auth['user']>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('http://localhost:8080/api/auth/me', {
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        setUser(null)
        return console.error(data)
      }

      console.log(data)
    }

    checkAuth()
  }, [])

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login/github')

      const data = await response.json()

      if (!response.ok) throw new Error('Login failed')

      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col rounded border p-8 ">
        {user ? <>Logged in!</> : <Button onClick={() => handleLogin()}>Login using Github</Button>}
      </div>
    </>
  )
}
