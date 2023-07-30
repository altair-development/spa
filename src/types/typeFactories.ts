import { QueryParamsTypes } from 'QueryParamsTypes'

export function QueryParamsTypeFactory(obj: any): QueryParamsTypes {
  return {
    _c: obj._c,
    _a: obj._a,
    clan_id: obj.clan_id,
    project_id: obj.project_id,
    ticket_id: obj.ticket_id
  }
}