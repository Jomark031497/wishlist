import { MainLayout } from '@/components/layout/MainLayout'
import { Login } from '@/features/auth/routes/Login'
import { Dashboard } from '@/features/misc/routes/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { About } from '@/features/misc/routes/About'
import { ProtectedRoute } from '@/features/misc/components/ProtectedRoute'
import { AuthRoute } from '@/features/misc/components/AuthRoute'
import { Register } from '@/features/auth/routes/Register'

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
      <Route path="*" element={<>Page not found</>} />
    </Routes>
  )
}

export default App
