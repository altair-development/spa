declare type UserDataType = {
  id: string,
  name: string,
  email: string,
  created: string,
  modified: string
}

declare type ClansDataType = {
  user_id: string,
  name: string,
  description: string,
  created: string,
  modified: string,
  user_name: string,
  agreement: 0 | 1,
  is_owner: boolean
}

declare type PlaytitlesDataType = {
  title_id: string,
  title_name: string
}

declare type MembersDataType = {
  user_id: string,
  user_name: string,
  agreement: 0 | 1,
}

declare type ClanProfileType = {
  [key: string]: ClansDataType
}

declare type ProjectInfoType = {
  start_date: string,
  end_date: string,
  name: string,
  clan_id: string,
  created: string,
  modified: string,
  clan_user_id: string,
  clan_name: string,
  clan_user_name: string,
  author_id: string,
  author_name: string,
  writer_id: string,
  writer_name: string
}

declare type ProjectHistoryType = {
  name: string,
  clan_id: string,
  start_date: string,
  end_date: string,
  created: string,
  modified: string,
  clan_user_id: string,
  clan_name: string,
  clan_user_name: string,
  author_id: string,
  author_name: string,
  writer_id: string,
  writer_name: string
}

declare type ProjectHistoriesType = {
  [key: string]: ProjectHistoryType
}

declare type WatcherHistoriesType = {
  [key: string]: {
    dml: 'i' | 'd'
  }
}

declare type LiveHistoriesType = {
  [key: string]: {
    live: number,
    live_url: string
  }
}

declare type TicketHistoryCommonType = {
  clan_id: string,
  project_id: string,
  tracker: string,
  status: string,
  created: string,
  modified: string,
  clan_user_id: string,
  clan_name: string,
  clan_user_name: string,
  project_name: string,
  writer_clan_id: string,
  writer_clan_user_id: string,
  writer_clan_name: string,
  writer_clan_user_name: string,
  author_id: string,
  author_name: string,
  writer_id: string,
  writer_name: string,
  ticket_project_id: string,
  watcher_histories: WatcherHistoriesType,
  live_histories: LiveHistoriesType
}

declare type MatchingTicketsHistoryType = TicketHistoryCommonType & {
  fight_tickets: {
    play_title_id: string,
    play_title_name: string,
    opponent_id: string,
    opponent_user_id: string,
    opponent_name: string,
    opponent_user_name: string
  }
}

declare type WorkTicketsHistoryType = TicketHistoryCommonType & {
  work_tickets: {
    title: string,
  }
}

declare type NotificationTicketsHistoryType = TicketHistoryCommonType & {
  notification_tickets: {
    title: string,
  }
}

declare TicketHistoryType = MatchingTicketsHistoryType | WorkTicketsHistoryType | NotificationTicketsHistoryType

declare type TicketHistoriesType = {
  [key: string]: TicketHistoryType
}

declare type WatcherType = {
  user_id: string,
  user_name: string
}

declare type TicketCommonType = {
  limit_date: string,
  description: string,
  clan_id: string,
  project_id: string,
  tracker: 1,
  status: 0,
  created: string,
  modified: string,
  clan_user_id: string,
  clan_name: string,
  clan_user_name: string,
  project_name: string,
  writer_clan_id: string,
  writer_clan_user_id: string,
  writer_clan_name: string,
  writer_clan_user_name: string,
  author_id: string,
  author_name: string,
  writer_id: string,
  writer_name: string,
  shoulder_id: string,
  shoulder_name: string,
  watchers: {
    [key: string]: WatcherType[]
  },
  ticket_histories: TicketHistoriesType
}

declare type MatchingTicketsType = TicketCommonType & {
  fight_tickets: {
    play_title_id: string,
    play_title_name: string,
    opponent_id: string,
    opponent_user_id: string,
    opponent_name: string,
    opponent_user_name: string
  }
}

declare type WorkTicketsType = TicketCommonType & {
  work_tickets: {
    title: string,
    progress_rate: string
  }
}

declare type NotificationTicketsType = TicketCommonType & {
  notification_tickets: {
    title: string,
  }
}

declare TicketType = MatchingTicketsType | WorkTicketsType | NotificationTicketsType

declare module 'ApiDataTypes' {
  export type SelectRelatedClans = {
    [key: string]: {
      profile: ClansDataType,
      play_titles: PlaytitlesDataType[],
      members: MembersDataType[],
      projects: {
        [key: string]: {
          info: ProjectInfoType,
          tickets: {
            [key: string]: TicketType
          }
          histories: ProjectHistoriesType
        }
      }
    }
  }
}