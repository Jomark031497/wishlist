import { Button, TextField } from '@/components/ui'
import { loginUserHandler } from '@/features/auth/handlers/loginUserHandler'
import { LoginInputs, loginSchema } from '@/features/auth/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginInputs> = async (values) => {
    try {
      await loginUserHandler(values)

      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 md:p-0">
      <div className="max-w-sm grow rounded border p-4">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-500">Wishlist</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField label="Email" type="text" {...register('email')} formError={errors.email} />
          <TextField label="Password" type="password" {...register('password')} formError={errors.password} />

          <Button type="submit">Login</Button>
        </form>
      </div>
    </main>
  )
}
