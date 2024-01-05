import React from 'react'

import { ArticleDetailsPageAsync } from '@/pages/ArticleDetailsPage'
import { ArticleEditPageAsync } from '@/pages/ArticleEditPage'
import { ArticlePageAsync } from '@/pages/ArticlePage'
import { MainPageAsync } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePageAsync } from '@/pages/ProfilePage'
import { AdminPanelPageAsync } from '@/pages/AdminPanelPage'
import { ForbiddenPageAsync } from '@/pages/ForbiddenPage'
import { UserRole } from '@/essence/user'
import { AppRoutesProps } from '@/shared/types/router'
import {
  getRouteMain,
  getRouteForbidden,
  getRouteProfile,
  getRouteArticles,
  getRouteArticleDetails,
  getRouteArticleCreate,
  getRouteArticleEdit,
  getRouteAdminpanel,
  AppRoutes
} from '@/shared/const/router'

// // пути
// export const RoutePath: Record<AppRoutes, string> = {
//   [AppRoutes.MAIN]: getRouteMain(),
//   [AppRoutes.PROFILE]: getRouteProfile(':id'),
//   [AppRoutes.ARTICLES]: getRouteArticles(),
//   [AppRoutes.ARTICLES_DETAILS]: getRouteArticleDetails(':id'),
//   [AppRoutes.ARTICLE_CREATE]: getRouteArticleCreate(),
//   [AppRoutes.ARTICLE_EDIT]: getRouteArticleEdit(':id'),
//   [AppRoutes.ADMIN_PANEL]: getRouteAdminpanel(),
//   [AppRoutes.FORBIDDEN]: getRouteForbidden(),

//   // last!
//   [AppRoutes.NOT_FOUND]: '*'
// }

// сами
export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  // public
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPageAsync />
  },
  [AppRoutes.FORBIDDEN]: {
    path: getRouteForbidden(),
    element: <ForbiddenPageAsync />
  },
  // private
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <ProfilePageAsync />,
    authOnly: true
  },
  [AppRoutes.ARTICLES]: {
    path: getRouteArticles(),
    element: <ArticlePageAsync />,
    authOnly: true
  },
  [AppRoutes.ARTICLES_DETAILS]: {
    path: getRouteArticleDetails(':id'),
    element: <ArticleDetailsPageAsync />,
    authOnly: true
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: getRouteArticleCreate(),
    element: <ArticleEditPageAsync />,
    authOnly: true
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: getRouteArticleEdit(':id'),
    element: <ArticleEditPageAsync />,
    authOnly: true
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: getRouteAdminpanel(),
    element: <AdminPanelPageAsync />,
    authOnly: true,
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  // last!
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />
  }
}
