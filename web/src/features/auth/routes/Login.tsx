import { Button, TextField } from '@/components/ui'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { LoginInputs, loginSchema } from '@/features/auth/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FaGithub, FaMicrosoft, FaDiscord, FaGoogle } from 'react-icons/fa'
import { loginUserByOAuth } from '@/features/auth/handlers/loginUserByOAuth'

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

  const loginWithOAuth = async (provider: string) => {
    try {
      const data = await loginUserByOAuth(provider)
      console.log(data)
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
          <Button
            onClick={() => loginWithOAuth('google')}
            className="flex w-full items-center justify-center gap-2 border border-primary bg-white text-xs text-primary hover:bg-gray-100"
          >
            <FaGoogle className="h-5 w-5" /> Login with Google
          </Button>

          <Button className="flex w-full items-center justify-center gap-2 border border-primary bg-white text-xs text-primary hover:bg-gray-100">
            <FaGithub className="h-5 w-5" /> Login with Github
          </Button>

          <Button className="flex w-full items-center justify-center gap-2 border border-primary bg-white text-xs text-primary hover:bg-gray-100">
            <FaMicrosoft className="h-5 w-5" /> Login with Microsoft
          </Button>

          <Button className="flex w-full items-center justify-center gap-2 border border-primary bg-white text-xs text-primary hover:bg-gray-100">
            <FaDiscord className="h-5 w-5" /> Login with Discord
          </Button>
        </div>
      </div>
    </main>
  )
}
