import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/shared/lib/store'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

import { IUser } from '../types/user'
import { getUserDataByIdQuery } from '../../api/userApi'

export const initAuthData = createAsyncThunk<IUser, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    const userId = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY) || '')

    if (!userId) {
      return rejectWithValue('my error')
    }

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap()

      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue('my error')
    }
  }
)
