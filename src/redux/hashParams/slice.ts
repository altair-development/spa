import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../createStore'
import { HashParamsSliceStateType } from 'SliceStateTypes'
import { QueryParamsTypes } from 'QueryParamsTypes'
import { QueryCntrName, QueryActnName } from '../../const'

export const defaultinitialState: HashParamsSliceStateType = {
  _c: QueryCntrName.CNTR_CLN,
  _a: QueryActnName.ACTN_HOME_DEF,
  clanId: '',
  projectId: '',
  ticketId: ''
}

export const createAppSlice = (initialState: HashParamsSliceStateType) => {
  return createSlice({
    name: 'hashParams',
    initialState: initialState,
    reducers: {
      setHashParams (state, { payload }: PayloadAction<QueryParamsTypes>) {
        state._c = payload._c
        state._a = payload._a
        state.clanId = payload.clan_id
        state.projectId = payload.project_id
        state.ticketId = payload.ticket_id
      },
    },
  })
}

export const hashParamsSlice = createAppSlice(defaultinitialState)

export const { setHashParams } = hashParamsSlice.actions

export default hashParamsSlice.reducer

export const select_c = (state: RootState) => state.hashParams._c
export const selectClanId = (state: RootState) => state.hashParams.clanId
export const selectProjectId = (state: RootState) => state.hashParams.projectId
export const selectTicketId = (state: RootState) => state.hashParams.ticketId