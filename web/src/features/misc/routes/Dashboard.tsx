import { useAuth } from '@/features/auth/hooks/useAuth'

export const Dashboard = () => {
  const { user } = useAuth()

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col rounded border p-8">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  )
}
