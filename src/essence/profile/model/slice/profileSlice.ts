import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProfile, ProfileSchema } from '../types/profile'
import { fetchProfileDataThunk } from '../services/fetchProfileDataThunk'
import { updateProfileDataThunk } from '../services/updateProfileDataThunk'

const initialState: ProfileSchema = { form: null, data: null, error: null, isLoading: false, readonly: true }

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },
    canselEdit: (state) => {
      state.readonly = true
      state.form = state.data
    },
    updateProfile: (state, action: PayloadAction<IProfile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileDataThunk.pending, (state) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(fetchProfileDataThunk.fulfilled, (state, action: PayloadAction<IProfile>) => {
      state.isLoading = false
      state.error = null

      state.data = action.payload
      state.form = action.payload
    })
    builder.addCase(fetchProfileDataThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload || null
    })
    //
    builder.addCase(updateProfileDataThunk.pending, (state) => {
      state.validateError = undefined
      state.isLoading = true
    })
    builder.addCase(updateProfileDataThunk.fulfilled, (state, action: PayloadAction<IProfile>) => {
      state.isLoading = false
      state.validateError = undefined

      state.data = action.payload
      state.form = action.payload
    })
    builder.addCase(updateProfileDataThunk.rejected, (state, action) => {
      state.isLoading = false
      state.validateError = action.payload
    })
  },
})

export const { actions: profileActions, reducer: profileReducer } = profileSlice