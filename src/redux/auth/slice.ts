import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { get, post } from '../../lib/axios'
import { AuthSliceStateType } from 'SliceStateTypes'
import { RootState } from '../createStore'
import { setError } from '../errors/slice'
import { LoadingState } from '../../const'

export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const response = await get<UserDataType>('/users/me')
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await post<UserDataType>('/users/login', credentials)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: { email: string; password: string; }, thunkAPI) => {
    try {
      const response = await post<UserDataType>('/users/signup', credentials)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await get<string>('/users/logout')
    return response.data
  } catch (error: any) {
    thunkAPI.dispatch(setError(error))
    return thunkAPI.rejectWithValue(error)
  }
})

export const defaultinitialState: AuthSliceStateType = {
  me: null,
  loading: LoadingState.IDLE,
}

export const createAppSlice = (initialState: AuthSliceStateType) => {
  return createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
      reset: () => defaultinitialState,
    },
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
        state.me = action.payload
        state.loading = LoadingState.IDLE
      })
      builder.addCase(login.rejected, (state, action) => {
        state.loading = LoadingState.IDLE
      })
      builder.addCase(login.pending, (state) => {
        state.loading = LoadingState.LOADING
      })
      builder.addCase(logout.pending, (state) => {
        state.loading = LoadingState.LOADING
      })
      builder.addCase(logout.fulfilled, (_state) => {
        return defaultinitialState
      })
      builder.addCase(logout.rejected, (state) => {
        state.loading = LoadingState.IDLE
      })
      builder.addCase(signup.fulfilled, (state, action) => {
        state.me = action.payload
        state.loading = LoadingState.IDLE
      })
      builder.addCase(signup.rejected, (state) => {
        state.loading = LoadingState.IDLE
      })
      builder.addCase(fetchUser.rejected, (state) => {
        state.loading = LoadingState.IDLE
      })
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.me = action.payload
      })
    },
  })
}

export const authSlice = createAppSlice(defaultinitialState)

export const { reset } = authSlice.actions

export default authSlice.reducer

export const selectLoading = (state: RootState) => state.auth.loading
export const selectMe = (state: RootState) => state.auth.me