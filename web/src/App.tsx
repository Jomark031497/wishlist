import { RootLayout } from '@/components/layout/RootLayout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
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
