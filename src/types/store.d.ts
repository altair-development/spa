
declare module 'SliceStateTypes' {
  export type AuthSliceStateType = {
    me: UserDataType | null
    loading: LoadingStateType.IDLE | LoadingStateType.LOADING | null
  }
  export type ClansSliceStateType = {
    clans: ClanProfileType,
    loading: LoadingStateType.IDLE | LoadingStateType.LOADING
  }
  export type ProjectsSliceStateType = {
    projects: {
      [clanId: string]: {
        [projectId: string]: {
          info: ProjectInfoType,
          histories: ProjectHistoriesType
        }
      }
    },
    loading: LoadingStateType.IDLE | LoadingStateType.LOADING
  }
  export type TicketsSliceStateType = {
    entities: {
      [key: string]: TicketType
    },
  }
  export type ErrorsSliceStateType = {
    error: {
      message: string | undefined, 
      stack: string | undefined, 
      name: string | undefined,
      status: number | undefined,
      request: boolean | undefined
    } | null
  }
  export type HashParamsSliceStateType = {
    _c: import('ConstTypes').QueryCntrNameValueType,
    _a: import('ConstTypes').QueryActnNameValueType,
    clanId: string,
    projectId: string,
    ticketId: string
  }
  export type MembersSliceStateType = {
    members: {
      [clanId: string]: MembersDataType[]
    },
  }
}