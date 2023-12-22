import { Button, TextField } from '@/components/ui'
import { LoginInputs, loginSchema } from '@/features/auth/schemas/login.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginInputs> = (values) => {
    console.log(values)
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 md:p-0">
      <div className="max-w-sm grow rounded border p-4">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-500">Wishlist</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField label="Username" type="text" {...register('username')} formError={errors.username} />
          <TextField label="Password" type="password" {...register('password')} formError={errors.password} />

          <Button>Login</Button>
        </form>
      </div>
    </main>
  )
}
