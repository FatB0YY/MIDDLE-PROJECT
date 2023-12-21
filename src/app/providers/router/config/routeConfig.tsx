import React from 'react'

import { RouteProps } from 'react-router-dom'

import { AboutPageAsync } from 'pages/AboutPage'
import { ArticleDetailsPageAsync } from 'pages/ArticleDetailsPage'
import { ArticleEditPageAsync } from 'pages/ArticleEditPage'
import { ArticlePageAsync } from 'pages/ArticlePage'
import { MainPageAsync } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePageAsync } from 'pages/ProfilePage'
import { AdminPanelPageAsync } from 'pages/AdminPanelPage'
import { ForbiddenPageAsync } from 'pages/ForbiddenPage'
import { UserRole } from 'essence/user'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}

// перечисление роутов
export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLES_DETAILS = 'articles_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',
  // last!
  NOT_FOUND = 'not_found'
}

// пути
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile/', // + id
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLES_DETAILS]: '/articles/', // + :id
  [AppRoutes.ARTICLE_CREATE]: '/articles/create',
  [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
  [AppRoutes.ADMIN_PANEL]: '/adminpanel',
  [AppRoutes.FORBIDDEN]: '/forbidden',

  // last!
  [AppRoutes.NOT_FOUND]: '*'
}

// сами
export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  // public
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPageAsync />
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPageAsync />
  },
  [AppRoutes.FORBIDDEN]: {
    path: RoutePath.forbidden,
    element: <ForbiddenPageAsync />
  },
  // private
  [AppRoutes.PROFILE]: {
    path: `${RoutePath.profile}:id`,
    element: <ProfilePageAsync />,
    authOnly: true
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePath.articles,
    element: <ArticlePageAsync />,
    authOnly: true
  },
  [AppRoutes.ARTICLES_DETAILS]: {
    path: `${RoutePath.articles_details}:id`,
    element: <ArticleDetailsPageAsync />,
    authOnly: true
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: `${RoutePath.article_create}`,
    element: <ArticleEditPageAsync />,
    authOnly: true
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: `${RoutePath.article_edit}`,
    element: <ArticleEditPageAsync />,
    authOnly: true
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: `${RoutePath.admin_panel}`,
    element: <AdminPanelPageAsync />,
    authOnly: true,
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  // last!
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
}
