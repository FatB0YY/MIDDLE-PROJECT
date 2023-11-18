import { AboutPageAsync } from 'pages/AboutPage'
import { ArticleDetailsPageAsync } from 'pages/ArticleDetailsPage'
import { ArticlePageAsync } from 'pages/ArticlePage'
import { MainPageAsync } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePageAsync } from 'pages/ProfilePage'
import { RouteProps } from 'react-router-dom'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}

// перечисление роутов
export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLES_DETAILS = 'articles_details',
  // last!
  NOT_FOUND = 'not_found',
}

// пути
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLES_DETAILS]: '/articles/', // + :id
  // last!
  [AppRoutes.NOT_FOUND]: '*',
}

// сами
export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  // public
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPageAsync />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPageAsync />,
  },
  // private
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePageAsync />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES]: {
    path: RoutePath.articles,
    element: <ArticlePageAsync />,
    authOnly: true,
  },
  [AppRoutes.ARTICLES_DETAILS]: {
    path: `${RoutePath.articles_details}:id`,
    element: <ArticleDetailsPageAsync />,
    authOnly: true,
  },
  // last!
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
}
