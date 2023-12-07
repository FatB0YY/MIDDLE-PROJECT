import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthData } from 'essence/user'

import { RoutePath } from 'app/providers/router/config/routeConfig'

import MainIcon from 'shared/assets/icons/main-20-20.svg'
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg'
import ArticleIcon from 'shared/assets/icons/article-20-20.svg'

import { ISidebarItem } from '../types/sidebar'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: ISidebarItem[] = [
    {
      path: RoutePath.main,
      Icon: MainIcon,
      text: 'widgets.navbar.applink.main'
    },
    {
      path: RoutePath.about,
      Icon: AboutIcon,
      text: 'widgets.navbar.applink.about'
    }
  ]

  if (userData && userData.authData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData.authData.id,
        Icon: ProfileIcon,
        text: 'widgets.navbar.applink.profile',
        authOnly: true
      },
      {
        path: RoutePath.articles,
        Icon: ArticleIcon,
        text: 'widgets.navbar.applink.articles',
        authOnly: true
      }
    )
  }

  return sidebarItemsList
})
