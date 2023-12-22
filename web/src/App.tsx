import { RootLayout } from '@/components/layout/RootLayout'
import { Login } from '@/features/auth/routes/Login'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <>Homepage</>,
      },
      {
        path: '/about',
        element: <>about</>,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
