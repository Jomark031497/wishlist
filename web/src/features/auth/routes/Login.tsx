import { Button, TextField } from '@/components/ui'

export const Login = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="max-w-sm grow rounded border p-4">
        <h1 className="text-2xl">Wishlist</h1>

        <form className="flex flex-col gap-4">
          <TextField label="Username" type="text" />
          <TextField label="Password" type="password" />

          <Button>Login</Button>
        </form>
      </div>
    </main>
  )
}
