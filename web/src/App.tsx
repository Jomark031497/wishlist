import { MainLayout } from '@/components/layout/MainLayout'
import { Login } from '@/features/auth/routes/Login'
import { AuthRoute } from '@/features/misc/components/AuthRoute'
import { Dashboard } from '@/features/misc/routes/Dashboard'
import { ProtectedRoute } from '@/features/misc/components/ProtectedRoute'
import { Route, Routes } from 'react-router-dom'
import { About } from '@/features/misc/routes/About'

function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<>catchall</>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
