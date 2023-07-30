import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import {
  ClansSliceStateType,
  AuthSliceStateType,
  ErrorsSliceStateType,
  ProjectsSliceStateType,
  // TicketsSliceStateType,
  HashParamsSliceStateType,
  MembersSliceStateType
} from 'SliceStateTypes'
import { createAppSlice as createClansSlice } from '../../redux/clans/slice'
import { createAppSlice as createAuthSlice } from '../../redux/auth/slice'
import { createAppSlice as createErrorsSlice } from '../../redux/errors/slice'
import { createAppSlice as createProjectsSlice } from '../../redux/projects/slice'
// import { createAppSlice as createTicketsSlice } from '../../redux/tickets/slice'
import { createAppSlice as createHashParamsSlice } from '../../redux/hashParams/slice'
import { createAppSlice as createMembersSlice } from '../../redux/members/slice'

type MockstoreParamType = {
  clansState?: ClansSliceStateType,
  authState?: AuthSliceStateType,
  errorsState?: ErrorsSliceStateType,
  projectsState?: ProjectsSliceStateType,
  // ticketsState?: TicketsSliceStateType,
  hashParamsState?: HashParamsSliceStateType,
  membersState?: MembersSliceStateType,
  children: React.ReactNode,
}

type MockStoreReducerType = {
  clans?: any,
  auth?: any,
  errors?: any,
  projects?: any,
  // tickets?: any,
  hashParams?: any,
  members?: any,
} 

export const MockStore = (
  {
    clansState,
    authState,
    errorsState,
    projectsState,
    // ticketsState,
    hashParamsState,
    membersState,
    children,
  }: MockstoreParamType
) => {
  const reducer: MockStoreReducerType = {}
  if (clansState) {
    reducer.clans = createClansSlice(clansState).reducer
  }
  if (authState) {
    reducer.auth = createAuthSlice(authState).reducer
  }
  if (errorsState) {
    reducer.errors = createErrorsSlice(errorsState).reducer
  }
  if (projectsState) {
    reducer.projects = createProjectsSlice(projectsState).reducer
  }
  if (hashParamsState) {
    reducer.hashParams = createHashParamsSlice(hashParamsState).reducer
  }
  if (membersState) {
    reducer.members = createMembersSlice(membersState).reducer
  }
  // if (ticketsState) {
  //   reducer.tickets = createTicketsSlice(ticketsState).reducer
  // }

  return (
    <Provider
    store={configureStore({
      reducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    })}
  >
    {children}
  </Provider>
  )
}