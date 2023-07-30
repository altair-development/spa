export const URL = {
  HOME: '/',
  LOGIN: '/users/login',
  MYPAGE_HOME: '/mypage',
} as const

export const QueryDelimiter = {
  SEPARATOR1: '&',
  SEPARATOR2: '=',
} as const

export const QueryParamName = {
  CNTR: '_c',
  ACTN: '_a',
  QR_CLN_ID: 'clan_id',
  QR_PRJCT_ID: 'project_id',
  QR_TCKT_ID: 'ticket_id',
} as const

export const QueryCntrName = {
  CNTR_DASHBOARD: 'dashboard',
  CNTR_CLN: 'clan',
  CNTR_PRJCT: 'project',
  CNTR_TICKET: 'ticket',
  // export type TypeOfQueryCntrName = typeof CNTR_HOME | typeof CNTR_CLN | typeof CNTR_TICKET
} as const

export const QueryActnName = {
  ACTN_HOME_DEF: 'index',
  ACTN_PRJCT_DEF: 'ticket',
  // export type TypeOfQueryActnName = typeof ACTN_HOME_DEF
} as const
