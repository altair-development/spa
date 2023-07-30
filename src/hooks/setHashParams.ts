import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectClans } from '../redux/clans/slice'
import { setHashParams } from '../redux/hashParams/slice'
import { useHash } from './hashchange'
import { QueryParamName, QueryCntrName, QueryActnName } from '../const'
import { QueryParamsTypeFactory } from '../types/typeFactories'

const { QR_CLN_ID, QR_TCKT_ID, QR_PRJCT_ID, CNTR, ACTN } = QueryParamName
const { CNTR_CLN, CNTR_TICKET, CNTR_DASHBOARD, CNTR_PRJCT} = QueryCntrName
const { ACTN_HOME_DEF} = QueryActnName

export const useSetHashParams = () => {
  const dispatch = useAppDispatch()
  const [hash] = useHash()
  const clans = useAppSelector(selectClans)

  useEffect(() => {
    type HashType = typeof hash
    const hashParam: {
      [K in keyof HashType]: HashType[K] | number
    } = Object.assign({}, hash)

    if (hashParam[QR_CLN_ID] && !clans[hashParam[QR_CLN_ID]!]) {
      return
    }

    if (!hashParam[CNTR] || !hashParam[ACTN]) {
      hashParam[CNTR] = CNTR_DASHBOARD
      hashParam[ACTN] = ACTN_HOME_DEF
    }

    // if (hashParam[CNTR] === CNTR_CLN) {
    //   hashParam[QR_CLN_ID] = !hashParam[QR_CLN_ID] ? "" : hashParam[QR_CLN_ID]
    // } else if (hashParam[CNTR] === CNTR_PRJCT) {
    //   hashParam[QR_PRJCT_ID] = !hashParam[QR_PRJCT_ID] ? "" : hashParam[QR_PRJCT_ID]
    // } else if (hashParam[CNTR] === CNTR_TICKET) {
    //   hashParam[QR_TCKT_ID] = !hashParam[QR_TCKT_ID] ? "" : hashParam[QR_TCKT_ID]
    // }
    hashParam[QR_CLN_ID] = !hashParam[QR_CLN_ID] ? "" : hashParam[QR_CLN_ID]
    hashParam[QR_PRJCT_ID] = !hashParam[QR_PRJCT_ID] ? "" : hashParam[QR_PRJCT_ID]
    hashParam[QR_TCKT_ID] = !hashParam[QR_TCKT_ID] ? "" : hashParam[QR_TCKT_ID]
    
    dispatch(setHashParams(QueryParamsTypeFactory(hashParam)))
  }, [ clans, dispatch, hash])
}