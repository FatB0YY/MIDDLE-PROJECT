import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/loginSchema'
import { loginByUsernameThunk } from '../services/loginByUsernameThunk'

const initialState: LoginSchema = {
  isLoading: false,
  password: '',
  username: '',
  error: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginByUsernameThunk.pending, (state) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(loginByUsernameThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null

      // очищаем поля модалки
      state.password = ''
      state.username = ''
    })
    builder.addCase(loginByUsernameThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload || null
    })
  },
})

export const { actions: loginActions, reducer: loginReducer } = loginSlice
