import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IUser, userActions } from '../../../../entities/User/index'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

export interface ILoginByUsername {
  username: string
  password: string
}

enum LoginErrors {
  INCORRECT_DATA = '',
  SERVER_ERROR = '',
}

export const loginByUsernameThunk = createAsyncThunk<IUser, ILoginByUsername, { rejectValue: string }>(
  'login/loginByUsernameThunk',
  async ({ password, username }, thunkAPI) => {
    try {
      const response = await axios.post<IUser>('http://localhost:8000/login', { username, password })

      if (!response.data) {
        throw new Error()
      }

      // имитация авторизации
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
      thunkAPI.dispatch(userActions.setAuthData(response.data))

      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('my rejectWithValue error!')
    }
  }
)
