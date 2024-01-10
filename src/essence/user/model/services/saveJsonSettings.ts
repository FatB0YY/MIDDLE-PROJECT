import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/shared/lib/store'

import { JsonSettings } from '../types/jsonSettings'
import { getUserAuthData } from '../selectors/getUserAuthData'
import { getUserJsonSettings } from '../selectors/jsonSettings'
import { setJsonSettingsMutation } from '../../api/userApi'

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
  const { rejectWithValue, getState, dispatch } = thunkApi
  const { authData } = getUserAuthData(getState())
  const currentSettings = getUserJsonSettings(getState())

  if (!authData) {
    return rejectWithValue('my error')
  }

  try {
    const response = await dispatch(
      setJsonSettingsMutation({
        userId: authData.id,
        jsonSettings: {
          ...currentSettings,
          ...newJsonSettings
        }
      })
    ).unwrap()

    if (!response.jsonSettings) {
      return rejectWithValue('')
    }

    return response.jsonSettings
  } catch (e) {
    console.log(e)
    return rejectWithValue('my error')
  }
})
