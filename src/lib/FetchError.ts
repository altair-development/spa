export type Props = {
  status?: number,
  request?: boolean,
  message: string
}

export class FetchError extends Error {

  status: Props['status']
  request: Props['request']

  constructor({ status, request, message }: Props) {

    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError)
    }

    this.name = 'FetchError'
    this.status = status
    this.request = request
  }
}