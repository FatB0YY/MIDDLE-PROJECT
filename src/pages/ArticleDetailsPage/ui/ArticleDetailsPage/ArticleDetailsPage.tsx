import React, { memo } from 'react'

import { useParams } from 'react-router-dom'

import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'
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
import { ToggleFeatures } from '@/shared/lib/features/index'
import { Card } from '@/shared/ui/Card'

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
        theme='error'
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

          <ToggleFeatures
            feature='isArticleRatingEnabled'
            on={<ArticleRatingAsync articleId={id} />}
            // eslint-disable-next-line i18next/no-literal-string
            off={<Card>Оценка статей скоро появится!</Card>}
          />

          <ArticleDetailsRecommendationsList />

          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
