import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from 'shared/lib/store'

import { IProfile } from 'essence/profile'

export const fetchProfileDataThunk = createAsyncThunk<
  IProfile,
  string,
  ThunkConfig<string>
>('profile/fetchProfileDataThunk', async (profileId, thunkAPI) => {
  try {
    const response = await thunkAPI.extra.api.get<IProfile>(
      `/profile/${profileId}`
    )

    if (!response.data) {
      return thunkAPI.rejectWithValue('my rejectWithValue error!')
    }

    return thunkAPI.fulfillWithValue(response.data)
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue('my rejectWithValue error!')
  }
})
