// lucia.ts
import { lucia } from 'lucia'
import { express } from 'lucia/middleware'
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql'
import { client } from './db/client.js'

export const auth = lucia({
  env: process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV', // "PROD" if deployed to HTTPS
  middleware: express(),
  adapter: postgresAdapter(client, {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session',
  }),
  getUserAttributes: (data) => {
    return {
      username: data.username,
    }
  },
})

export type Auth = typeof auth
