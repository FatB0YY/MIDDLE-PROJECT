import { rtkApi } from '@/shared/api/rtkApi'

import { INotification } from '../model/types/notification'

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotificationList: build.query<INotification[], null>({
      query: () => ({
        url: '/notifications'
      })
    })
  })
})

export const { useGetNotificationListQuery } = notificationApi
