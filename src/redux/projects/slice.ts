import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../createStore'
import { ProjectsSliceStateType } from 'SliceStateTypes'
import { Projects } from 'RequestDataTypes'
import { SelectRelatedClans } from 'ApiDataTypes'
import { debug } from '../../utils'
import { get, post } from '../../lib/axios'
import { LoadingState } from '../../const'
import { setError } from '../errors/slice'
import { selectRelatedClans } from '../clans/slice'

interface PayloadOfSetClan {
  clanId: number,
  profile: ClansDataType
}

type CreateResult = {
  project: SelectRelatedClans[string]['projects'],
  clan_id: string,
  user: string
}

export const defaultinitialState: ProjectsSliceStateType = {
  projects: {},
  loading: LoadingState.IDLE
}
export const createAppSlice = (initialState: ProjectsSliceStateType) => {
  return createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(selectRelatedClans.fulfilled, (state, { payload }) => {
          const projects: ProjectsSliceStateType['projects'] = {}
          const clanIds = Object.keys(payload)
          for (const cid of clanIds) {
            if (Object.keys(payload[cid].projects).length === 0) continue
            projects[cid] = {}
            const projectIds = Object.keys(payload[cid].projects)
            for (const pid of projectIds) {
              projects[cid][pid] = {
                info: payload[cid].projects[pid].info,
                histories: payload[cid].projects[pid].histories,
              }
            }
            
          }
          state.projects = projects
        })
        .addCase(create.pending, (state) => {
          if (state.loading === LoadingState.IDLE) {
            state.loading = LoadingState.LOADING
          }
        })
        .addCase(create.fulfilled, (state, { payload }) => {
          if (state.loading === LoadingState.LOADING) {
            state.loading = LoadingState.IDLE
            const projectId = Object.keys(payload.project)[0]
            const project = payload.project[projectId]
            const tmpProject: ProjectsSliceStateType['projects'][string][string] = {
              info: project.info,
              histories: project.histories
            }
            if (!state.projects[payload.clan_id]) {
              state.projects[payload.clan_id] = {
                [projectId]: tmpProject
              }
            } else {
              state.projects[payload.clan_id][projectId] = tmpProject
            }
          }
        })
    },
  })
}

export const projectsSlice = createAppSlice(defaultinitialState)

// export const { setClan } = projectsSlice.actions

export const create = createAsyncThunk(
  '/projects/create',
  async (project: Projects['create'], thunkAPI) => {
    try {
      const response = await post<CreateResult>('/projects/create', project)
      return response.data
    } catch (error: any) {
      thunkAPI.dispatch(setError(error))
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export default projectsSlice.reducer

export const selectLoading = (state: RootState) => state.projects.loading
export const selectProjects = (state: RootState) => state.projects.projects
export const selectClanId = (_: RootState, clanId: string) => clanId
export const selectProjectId = (_: RootState, projectId: string) => projectId
export const selectProjectsByClanId = createSelector(
  [selectProjects, selectClanId],
  (projects, clanId) => projects[clanId]
)
// export const selectProjectsByClanId = createSelector(
//   [selectProjects, selectClanId],
//   (projects, clanId) => projects[clanId]
// )
export const selectProjectName = createSelector(
  [selectProjects, (_: RootState, clanId: string, projectId) => ({ clanId, projectId })],
  (projects, ids) => projects[ids.clanId][ids.projectId].info.name
)