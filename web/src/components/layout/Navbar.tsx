import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <header className="flex h-16 items-center justify-between px-8">
      <ul className="flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </ul>

      <a href="http://localhost:8080/api/auth/logout">Logout</a>
    </header>
  )
}
