import { Button, TextField } from '@/components/ui'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { LoginInputs, loginSchema } from '@/features/auth/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FaMicrosoft, FaGoogle } from 'react-icons/fa'
import { API_URL } from '@/constants'

export const Login = () => {
  const navigate = useNavigate()

  const { handleLogin } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginInputs> = async (values) => {
    try {
      await handleLogin(values)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 md:p-0">
      <div className="max-w-sm grow rounded border">
        <h1 className="my-4 text-center text-2xl font-semibold text-gray-500">Wishlist</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
          <TextField label="Email" type="text" placeholder="johndoe" {...register('email')} formError={errors.email} />
          <TextField
            label="Password"
            type="password"
            placeholder="******"
            {...register('password')}
            formError={errors.password}
          />

          <div className="mb-2 flex items-center justify-between">
            <label className="flex cursor-pointer select-none items-center gap-1 text-sm font-semibold text-gray-500">
              <input type="checkbox" className="h-4 w-4" />
              Remember me
            </label>

            <button type="button" className="text-sm font-semibold text-blue-500">
              Forgot Password?
            </button>
          </div>

          <Button type="submit">Login</Button>
        </form>

        <div className="my-4">
          <hr />
        </div>

        <div className="flex flex-col gap-3 p-4">
          <a
            href={`${API_URL}/api/auth/google`}
            className="flex w-full items-center justify-center gap-2 rounded border border-primary bg-white p-2 text-xs text-primary hover:bg-gray-100"
          >
            <FaGoogle className="h-5 w-5" /> Login with Google
          </a>

          <a
            href={`${API_URL}/api/auth/azure`}
            className="flex w-full items-center justify-center gap-2 rounded border border-primary bg-white p-2 text-xs text-primary hover:bg-gray-100"
          >
            <FaMicrosoft className="h-5 w-5" /> Login with Microsoft
          </a>
        </div>
      </div>
    </main>
  )
}
