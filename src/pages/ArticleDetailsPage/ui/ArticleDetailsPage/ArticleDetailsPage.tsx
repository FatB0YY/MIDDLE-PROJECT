import React, { memo } from 'react'

import { useParams } from 'react-router-dom'

import { VStack } from '@/shared/ui/Stack'

import { Text, TextTheme } from '@/shared/ui/Text'

import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleDetails } from '@/essence/article'
import { PageError } from '@/widgets/PageError'
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsCommentsReducer } from '@/features/ArticleCommentsList'
import { Page } from '@/widgets/Page'
import { ArticleDetailsRecommendationsList } from '@/features/ArticleDetailsRecommendationsList'

import { ArticleDetailsComments } from '@/features/ArticleDetailsCommenst'
import { ArticleRatingAsync } from '@/features/ArticleRating'

import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <Page className={classNames('', {}, [className])}>
        <PageError />
      </Page>
    )
  }

  if (!/^\d+$/.test(id)) {
    return (
      <Text
        theme={TextTheme.ERROR}
        title='Недействительный id!'
      />
    )
  }

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount={true}
    >
      <Page className={classNames('', {}, [className])}>
        <VStack
          max
          gap='16'
        >
          <ArticleDetailsPageHeader />

          <ArticleDetails id={id} />

          <ArticleRatingAsync articleId={id} />

          <ArticleDetailsRecommendationsList />

          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
