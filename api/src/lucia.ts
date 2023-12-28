// lucia.ts
import { lucia } from 'lucia'
import { express } from 'lucia/middleware'
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql'
import { client } from './db/client.js'

export const auth = lucia({
  adapter: postgresAdapter(client, {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session',
  }),
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: express(),

  getUserAttributes: (data) => {
    return {
      githubUsername: data.username,
    }
  },
})

export type Auth = typeof auth
