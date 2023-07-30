import { createSlice, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../createStore'
import { MembersSliceStateType } from 'SliceStateTypes'
import { selectRelatedClans } from '../clans/slice'

export const defaultinitialState: MembersSliceStateType = {
  members: {},
}
export const createAppSlice = (initialState: MembersSliceStateType) => {
  return createSlice({
    name: 'members',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(selectRelatedClans.fulfilled, (state, { payload }) => {
          const members: MembersSliceStateType['members'] = {}
          const clanIds = Object.keys(payload)
          for (const cid of clanIds) {
            if (Object.keys(payload[cid].members).length === 0) continue
            members[cid] = payload[cid].members            
          }
          state.members = members
        })
    },
  })
}

export const membersSlice = createAppSlice(defaultinitialState)

export default membersSlice.reducer

export const selectMembers = (state: RootState) => state.members.members
export const selectClanId = (_: RootState, clanId: string) => clanId
export const selectMembersByClanId = createSelector(
  [selectMembers, selectClanId],
  (members, clanId) => members[clanId]
)