import { configureStore } from '@reduxjs/toolkit'
import clansReducer from './clans/slice'
import authReducer from './auth/slice'
import errorsReducer from './errors/slice'
import projectsReducer from './projects/slice'
import hashParamsReducer from './hashParams/slice'
import membersReducer from './members/slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    clans: clansReducer,
    errors: errorsReducer,
    projects: projectsReducer,
    hashParams: hashParamsReducer,
    members: membersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store