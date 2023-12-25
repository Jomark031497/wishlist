// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./lucia').Auth
  type DatabaseUserAttributes = {
    username: string
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  type DatabaseSessionAttributes = {}
}
