import { QueryDelimiter , QueryParamName, QueryCntrName, QueryActnName } from "../const"

const { SEPARATOR1, SEPARATOR2 } = QueryDelimiter
const { QR_CLN_ID, QR_PRJCT_ID, QR_TCKT_ID, CNTR, ACTN } = QueryParamName
const { CNTR_DASHBOARD, CNTR_CLN, CNTR_PRJCT, CNTR_TICKET} = QueryCntrName
const { ACTN_HOME_DEF, ACTN_PRJCT_DEF} = QueryActnName

export function isMypage(path: string) {
  return path.toLowerCase().split('/')[0] === 'mypage'
}

export function getDashboardUrl () {
  return [
      '#' + CNTR + SEPARATOR2 + CNTR_DASHBOARD,
      ACTN + SEPARATOR2 + ACTN_HOME_DEF,
  ].join(SEPARATOR1);
}

export function getClanUrl (clanId: string) {
  return [
      '#' + CNTR + SEPARATOR2 + CNTR_CLN,
      ACTN + SEPARATOR2 + ACTN_HOME_DEF,
      QR_CLN_ID + SEPARATOR2 + clanId
  ].join(SEPARATOR1);
}

export function getProjectUrl (clanId: string, projectId: string) {
  return [
      '#' + CNTR + SEPARATOR2 + CNTR_PRJCT,
      ACTN + SEPARATOR2 + ACTN_PRJCT_DEF,
      QR_CLN_ID + SEPARATOR2 + clanId,
      QR_PRJCT_ID + SEPARATOR2 + projectId
  ].join(SEPARATOR1);
}

export function getTicketUrl (ticketId: string) {
  return [
      '#' + CNTR + SEPARATOR2 + CNTR_TICKET,
      ACTN + SEPARATOR2 + ACTN_HOME_DEF,
      QR_TCKT_ID + SEPARATOR2 + ticketId
  ].join(SEPARATOR1);
}

export function expandHash (hash: string) {
  if (!hash) return {}
  const properties: {
    [key: string]: string | undefined
  } = {}
  let queries: string[] = []
  queries = hash.toLowerCase().slice(1).split(SEPARATOR1)
  queries.forEach(query => {
    const [ key, value ] = query.split(SEPARATOR2)
    properties[key] = value
  })
  return properties
}