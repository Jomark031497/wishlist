import { NavLink, Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <>
      <header>
        <ul className="mx-auto flex max-w-sm items-center gap-2 rounded bg-gray-500 p-4 shadow">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
