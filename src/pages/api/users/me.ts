import type { NextApiRequest, NextApiResponse } from 'next'
import { get } from '../../../lib/axios'
import { debug } from '../../../utils'
import { STATUS } from '../../../const'
import { FetchError } from '../../../lib/FetchError'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserDataType | string>
) {
  try {
    const { headers } = req
    const response = await get<UserDataType>(
      '/users/me',
      {
        headers
      }
    )
    const { data, headers: returnedHeaders } = response
    Object.entries(returnedHeaders).forEach((keyArr) =>
      res.setHeader(keyArr[0], keyArr[1])
    )
    res.send(data)
  } catch (err: any) {
    debug(err)
    const status = err instanceof FetchError ? err.status! : STATUS.INTERNAL_SERVER_ERROR
    const message = ''
    res.status(status)
    res.send(message)
  }
}