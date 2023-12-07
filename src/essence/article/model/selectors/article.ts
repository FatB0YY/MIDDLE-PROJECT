import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthData } from 'essence/user'

import { getArticleDetailsData } from './articleDetailsSelectors'

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, { authData }) => {
    if (!article || !authData) return false

    return article.user.id === authData.id
  }
)
