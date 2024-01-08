import { createAsyncThunk } from '@reduxjs/toolkit'

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { ThunkConfig } from '@/shared/lib/store'

import { IUser, userActions } from '../../../../essence/user/index'

export interface ILoginByUsername {
  username: string
  password: string
}

// enum LoginErrors {
//   INCORRECT_DATA = '',
//   SERVER_ERROR = ''
// }

export const loginByUsernameThunk = createAsyncThunk<
  IUser,
  ILoginByUsername,
  ThunkConfig<string>
>('login/loginByUsernameThunk', async ({ password, username }, thunkAPI) => {
  try {
    const response = await thunkAPI.extra.api.post<IUser>('/login', {
      username,
      password
    })

    if (!response.data) {
      throw new Error()
    }

    // имитация авторизации
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
    thunkAPI.dispatch(userActions.setAuthData(response.data))

    // thunkAPI.extra.navigate('/about')

    return thunkAPI.fulfillWithValue(response.data)
  } catch (error) {
    // console.error(error)
    return thunkAPI.rejectWithValue('my rejectWithValue error!')
  }
})
