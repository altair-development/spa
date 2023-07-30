import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrorsSliceStateType } from 'SliceStateTypes'
import { FetchError } from '../../lib/FetchError'
import { RootState } from '../createStore'

type setError = Error | null
export const defaultinitialState: ErrorsSliceStateType = {
  error: null
}

export const createAppSlice = (initialState: ErrorsSliceStateType) => {
  return createSlice({
    name: 'errors',
    initialState: initialState,
    reducers: {
      setError (state, { payload: error }: PayloadAction<setError>) {
        let serialized = null
        if (error) {
          serialized = { 
            message:  error.message, 
            stack: error.stack, 
            name: error.name,
            status: error instanceof FetchError ? error.status : undefined,
            request: error instanceof FetchError ? error.request : undefined,
          }
        }
        
        state.error = serialized
      },
    },
  })
}

export const errorsSlice = createAppSlice(defaultinitialState)

export const { setError } = errorsSlice.actions

export default errorsSlice.reducer

export const selectError = (state: RootState) => state.errors.error