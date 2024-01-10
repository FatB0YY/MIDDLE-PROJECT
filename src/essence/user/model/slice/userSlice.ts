import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { setFeatureFlags } from '@/shared/lib/features'

import { IUser, UserSchema } from '../types/user'
import { saveJsonSettings } from '../services/saveJsonSettings'
import { JsonSettings } from '../types/jsonSettings'
import { initAuthData } from '../services/initAuthData'

const initialState: UserSchema = {
  _initiated: false,
  authData: null,
  isLoading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IUser>) => {
      state.authData = action.payload
      setFeatureFlags(action.payload.features)
      localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id)
    },
    logout: (state) => {
      state.authData = null
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    }
  },
  extraReducers(builder) {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload
        }
      }
    )
    // -----
    builder.addCase(initAuthData.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(
      initAuthData.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.isLoading = false
        state._initiated = true
        state.authData = action.payload
        setFeatureFlags(action.payload.features)
      }
    )

    builder.addCase(initAuthData.rejected, (state) => {
      state._initiated = true
      state.isLoading = false
    })
  }
})

export const { actions: userActions, reducer: userReducer } = userSlice
