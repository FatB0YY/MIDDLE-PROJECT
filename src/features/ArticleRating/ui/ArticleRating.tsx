import React from 'react'
import { useSelector } from 'react-redux'

import { Skeleton } from '@/shared/ui/Skeleton'

import { classNames } from '@/shared/lib/classNames/classNames'
import { RatingCard } from '@/essence/rating'
import { getUserAuthData } from '@/essence/user'

import {
  useGetArticleRatingQuery,
  useRateArticleMutation
} from '../api/articleRatingApi'

import cls from './ArticleRating.module.scss'

export interface ArticleRatingProps {
  className?: string
  articleId: string
}

const ArticleRating = ({ className, articleId }: ArticleRatingProps) => {
  const { authData } = useSelector(getUserAuthData)

  const { isLoading: getArticleRatingIsLoading, data } =
    useGetArticleRatingQuery({
      articleId: articleId,
      userId: authData?.id ?? ''
    })

  const [rateArticleMutation] = useRateArticleMutation()

  const handleRateArticle = (starsCount: number, feedback?: string) => {
    try {
      rateArticleMutation({
        articleId,
        rate: starsCount,
        userId: authData?.id ?? '',
        feedback
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const onAccept = (starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback)
  }

  const onCancel = (starsCount: number) => {
    handleRateArticle(starsCount)
  }

  if (getArticleRatingIsLoading) {
    return (
      <Skeleton
        width={'100%'}
        height={'120px'}
      />
    )
  }

  const rating = data?.[0]

  return (
    <RatingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={classNames(cls.ArticleRating, {}, [className])}
      title='Оцените статью'
      feedbackTitle='Оставьте свой отзыв о статье, это поможет улучшить качество'
      hasFeedback
    />
  )
}

export default ArticleRating
