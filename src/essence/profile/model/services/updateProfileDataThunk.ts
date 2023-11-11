import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProfile } from '../types/profile'
import { ThunkConfig } from 'shared/lib/store'
import { getProfileState } from '../selectors/getProfileState'

export const updateProfileDataThunk = createAsyncThunk<IProfile, void, ThunkConfig<string>>(
  'profile/updateProfileDataThunk',
  async (_, thunkAPI) => {
    try {
      const formData = getProfileState(thunkAPI.getState())

      const response = await thunkAPI.extra.api.put('/profile', formData.form)

      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('my rejectWithValue error!')
    }
  }
)
