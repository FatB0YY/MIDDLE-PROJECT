import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProfile, ValidateProfileError } from '../types/profile'
import { ThunkConfig } from 'shared/lib/store'
import { getProfileState } from '../selectors/getProfileState'
import { validateProfile } from './validateProfile'

export const updateProfileDataThunk = createAsyncThunk<IProfile, void, ThunkConfig<ValidateProfileError[]>>(
  'profile/updateProfileDataThunk',
  async (_, thunkAPI) => {
    try {
      const formData = getProfileState(thunkAPI.getState())

      const errors = validateProfile(formData.form)

      if (errors.length) {
        return thunkAPI.rejectWithValue(errors)
      }

      const response = await thunkAPI.extra.api.put<IProfile>(`/profile/${formData.data?.id}`, formData.form)

      if (!response.data) {
        throw new Error()
      }

      return thunkAPI.fulfillWithValue(response.data)
    } catch (e) {
      console.log(e)
      return thunkAPI.rejectWithValue([ValidateProfileError.SERVER_ERROR])
    }
  }
)
