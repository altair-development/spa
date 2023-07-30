declare module 'RequestDataTypes' {
  export type Projects = {
    create: {
      clan_id: string,
      name: string,
      start_date: string,
      end_date: string,
      watchers: {
        user_id: string
      }[]
    }
  }
}