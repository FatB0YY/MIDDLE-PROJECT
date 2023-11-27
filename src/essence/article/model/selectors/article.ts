import { createSelector } from '@reduxjs/toolkit'
import { getArticleDetailsData } from './articleDetailsSelectors'
import { getUserAuthData } from 'essence/user'

export const getCanEditArticle = createSelector(getArticleDetailsData, getUserAuthData, (article, { authData }) => {
  if (!article || !authData) return false

  return article.user.id === authData.id
})
