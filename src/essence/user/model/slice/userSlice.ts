import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

import { IUser, UserSchema } from '../types/user'

const initialState: UserSchema = { _initiated: false, authData: null }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IUser>) => {
      state.authData = action.payload
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)

      if (user) {
        state.authData = JSON.parse(user)
      }
      state._initiated = true
    },
    logout: (state) => {
      state.authData = null
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    }
  }
})

export const { actions: userActions, reducer: userReducer } = userSlice
