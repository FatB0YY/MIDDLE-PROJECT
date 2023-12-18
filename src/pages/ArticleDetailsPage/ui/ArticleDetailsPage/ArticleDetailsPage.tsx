import React, { memo } from 'react'

import { useParams } from 'react-router-dom'

import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleDetails } from 'essence/article'
import { PageError } from 'widgets/PageError'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsCommentsReducer } from 'features/ArticleCommentsList'
import { VStack } from 'shared/ui/Stack'
import { Page } from 'widgets/Page/Page'
import { ArticleDetailsRecommendationsList } from 'features/ArticleDetailsRecommendationsList'
import { Text, TextTheme } from 'shared/ui/Text'
import { ArticleDetailsComments } from 'features/ArticleDetailsCommenst/ArticleDetailsCommenst'

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

          <ArticleDetailsRecommendationsList />

          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
