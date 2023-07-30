import type { NextApiRequest, NextApiResponse } from 'next'
import { SelectRelatedClans } from 'ApiDataTypes'
import { debug } from '../../../utils'
import { get } from '../../../lib/axios'
import { FetchError } from '../../../lib/FetchError'
import { STATUS } from '../../../const'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SelectRelatedClans | string>
) {
  try {
    const { headers } = req
    const response = await get<SelectRelatedClans>(
      '/clans/selectRelatedClans',
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