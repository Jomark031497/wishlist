import { logoutUserHandler } from '@/features/auth/handlers/logoutUserHandler'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  const handleLogout = async () => {
    try {
      await logoutUserHandler()

      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <header className="flex h-16 items-center justify-between px-8">
      <ul className="flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}
