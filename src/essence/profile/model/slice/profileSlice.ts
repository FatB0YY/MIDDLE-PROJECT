import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProfile, ProfileSchema } from '../types/profile'
import { fetchProfileDataThunk } from '../services/fetchProfileDataThunk'

const initialState: ProfileSchema = { data: null, error: null, isLoading: false, readonly: true }

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfileDataThunk.pending, (state) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(fetchProfileDataThunk.fulfilled, (state, action: PayloadAction<IProfile>) => {
      state.isLoading = false
      state.error = null

      state.data = action.payload
    })
    builder.addCase(fetchProfileDataThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload || null
    })
  },
})

export const { actions: profileActions, reducer: profileReducer } = profileSlice
