import { useAuth } from '@/features/auth/hooks/useAuth'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  const { handleLogout } = useAuth()

  const onLogout = async () => {
    try {
      await handleLogout()
      window.location.reload()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
      console.error('Something went wrong')
    }
  }

  return (
    <header className="flex h-16 items-center justify-between px-8">
      <ul className="flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </ul>

      <button onClick={onLogout}>Logout</button>
    </header>
  )
}
