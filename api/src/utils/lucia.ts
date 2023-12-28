import { lucia } from 'lucia';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL);

const auth = lucia({
  adapter: postgresAdapter(sql, {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session',
  }),
  // ...
});
