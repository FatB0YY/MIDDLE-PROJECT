import { rtkApi } from '@/shared/api/rtkApi'

import { IUser } from '../model/types/user'
import { JsonSettings } from '../model/types/jsonSettings'

interface SetJsonSettingsArgs {
  userId: string
  jsonSettings: JsonSettings
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    setJsonSettings: build.mutation<IUser, SetJsonSettingsArgs>({
      query: ({ userId, jsonSettings }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          jsonSettings
        }
      })
    }),
    // в реал. приложении помимо userId был бы токен
    getUserDataById: build.query<IUser, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET'
      })
    })
  })
})

export const setJsonSettingsMutation =
  userApi.endpoints.setJsonSettings.initiate

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate
