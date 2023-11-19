import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProfile } from '../types/profile'
import { ThunkConfig } from 'shared/lib/store'

export const fetchProfileDataThunk = createAsyncThunk<IProfile, string, ThunkConfig<string>>(
  'profile/fetchProfileDataThunk',
  async (profileId, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.get<IProfile>(`/profile/${profileId}`)

      if (!response.data) {
        return thunkAPI.rejectWithValue('my rejectWithValue error!')
      }

      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('my rejectWithValue error!')
    }
  }
)
