import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../createStore'
import { ClansSliceStateType } from 'SliceStateTypes'
import { SelectRelatedClans } from 'ApiDataTypes'
import { debug } from '../../utils'
import { get, post } from '../../lib/axios'
import { LoadingState } from '../../const'
import { setError } from '../errors/slice'

interface PayloadOfSetClan {
  clanId: number,
  profile: ClansDataType
}

type CreateResult = {
  id: string,
  name: string,
  user_id: string,
  user_name: string,
  created: string,
  description: string,
  modified: string
}

export const defaultinitialState: ClansSliceStateType = {
  clans: {},
  loading: LoadingState.IDLE
}
export const createAppSlice = (initialState: ClansSliceStateType) => {
  return createSlice({
    name: 'clans',
    initialState: initialState,
    reducers: {
      setClan (state, { payload: { clanId, profile } }: PayloadAction<PayloadOfSetClan>) {
        state.clans[clanId] = profile
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(selectRelatedClans.pending, (state) => {
          if (state.loading === LoadingState.IDLE) {
            state.loading = LoadingState.LOADING
          }
        })
        .addCase(selectRelatedClans.fulfilled, (state, { payload }) => {
          if (state.loading === LoadingState.LOADING) {
            state.loading = LoadingState.IDLE
            const clans: ClanProfileType = {}
            const clanIds = Object.keys(payload)
            for (const id of clanIds) {
              clans[id] = payload[id].profile
            }
            state.clans = clans
          }
        })
        .addCase(selectRelatedClans.rejected, (state) => {
          state.loading = LoadingState.IDLE
        })
        .addCase(create.pending, (state) => {
          if (state.loading === LoadingState.IDLE) {
            state.loading = LoadingState.LOADING
          }
        })
        .addCase(create.fulfilled, (state, { payload }) => {
          if (state.loading === LoadingState.LOADING) {
            state.loading = LoadingState.IDLE
            const clan: ClansSliceStateType['clans'][string] = {
              user_id: payload.user_id,
              name: payload.name,
              description: payload.description,
              created: payload.created,
              modified: payload.modified,
              user_name: payload.user_name,
              agreement: 1,
              is_owner: true
            }
            state.clans[payload.id] = clan
          }
        })
        .addCase(create.rejected, (state) => {
          state.loading = LoadingState.IDLE
        })
    },
  })
}

export const clansSlice = createAppSlice(defaultinitialState)

export const { setClan } = clansSlice.actions

export const selectRelatedClans = createAsyncThunk(
  '/clans/selectRelatedClans',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await get<SelectRelatedClans>('/clans/selectRelatedClans')
      return data as SelectRelatedClans
    } catch (err: any) {
      return rejectWithValue(err)
    }
  }
)

export const create = createAsyncThunk(
  '/clans/create',
  async (clan: { name: string }, thunkAPI) => {
    try {
      const response = await post<CreateResult>('/clans/create', clan)
      return response.data
    } catch (error: any) {
      thunkAPI.dispatch(setError(error))
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export default clansSlice.reducer

export const selectLoading = (state: RootState) => state.clans.loading
export const selectClans = (state: RootState) => state.clans.clans
export const selectClanId = (_: RootState, clanId: number) => clanId
export const selectClanById = createSelector(
  [selectClans, selectClanId],
  (clans, clanId) => clans[clanId]
)
