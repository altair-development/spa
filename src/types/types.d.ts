type t = typeof import('../const').STATUS
type u = typeof import('../const').Regex
type v = typeof import('../const').URL
type w = typeof import('../const').LoadingState
type x = typeof import('../const').QueryCntrName
type y = typeof import('../const').QueryActnName

type KeyOfStatus = keyof t
type ValueOfStatus = t[keyof t]
type KeyOfRegex = keyof u
type ValueOfRegex = u[keyof u]
type KeyOfURL = keyof v
type ValueOfURL = v[keyof v]
type KeyOfLoadingState = keyof w
type ValueOfLoadingState = w[keyof w]

// オブジェクトの指定された省略可能プロパティを必須に変換する
declare type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property]
}

// オブジェクトの指定された必須プロパティを省略可能に変換する
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

declare type DammyComponentType = {
  children: React.ReactNode
}

declare module 'ConstTypes' {
  export type StatusKey = KeyOfStatus
  export type StatusValue = ValueOfStatus
  export type RegexKey = KeyOfRegex
  export type RegexValue = ValueOfRegex
  export type URLKey = KeyOfURL
  export type URLValue = ValueOfURL
  export type LoadingStateKey = KeyOfLoadingState
  export type LoadingStateValue = ValueOfLoadingState
  export type QueryCntrNameType = keyof x
  export type QueryCntrNameValueType = x[keyof x]
  export type QueryActnNameType = keyof y
  export type QueryActnNameValueType = y[keyof y]
}

declare module 'QueryParamsTypes' {
  export type QueryParamsTypes = {
    _c: ValueOfQueryCntrName,
    _a: ValueOfQueryActnName,
    clan_id: string,
    project_id: string,
    ticket_id: string
  }
}