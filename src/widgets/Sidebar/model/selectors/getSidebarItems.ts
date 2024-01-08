import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthData } from '@/essence/user'
import MainIcon from '@/shared/assets/icons/main-20-20.svg'
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg'
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg'
import {
  getRouteArticles,
  getRouteMain,
  getRouteProfile
} from '@/shared/const/router'

import { ISidebarItem } from '../types/sidebar'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: ISidebarItem[] = [
    {
      path: getRouteMain(),
      Icon: MainIcon,
      text: 'widgets.navbar.applink.main'
    }
  ]

  if (userData && userData.authData) {
    sidebarItemsList.push(
      {
        path: getRouteProfile(userData.authData.id),
        Icon: ProfileIcon,
        text: 'widgets.navbar.applink.profile',
        authOnly: true
      },
      {
        path: getRouteArticles(),
        Icon: ArticleIcon,
        text: 'widgets.navbar.applink.articles',
        authOnly: true
      }
    )
  }

  return sidebarItemsList
})
