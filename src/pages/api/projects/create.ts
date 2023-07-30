import type { NextApiRequest, NextApiResponse } from 'next'
import { SelectRelatedClans } from 'ApiDataTypes'
import { debug } from '../../../utils'
import { post } from '../../../lib/axios'
import { FetchError } from '../../../lib/FetchError'
import { STATUS } from '../../../const'

type CreateResult = {
  project: SelectRelatedClans[string]['projects'],
  clan_id: string,
  user: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateResult | string>
) {
  try {
    const { headers, body } = req
    const response = await post<CreateResult>(
      '/projects/create',
      body,
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