export class ApiError extends Error {
  statusCode: number
  data: Record<string, unknown> | null | undefined

  constructor(statusCode: number, message: string, data?: Record<string, unknown> | null, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (data) {
      this.data = data
    }

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
