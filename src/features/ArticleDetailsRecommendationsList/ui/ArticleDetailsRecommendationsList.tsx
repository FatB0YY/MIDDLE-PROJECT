import React from 'react'

import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleList } from 'essence/article'
import { HStack, VStack } from 'shared/ui/Stack'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Text, TextTheme } from 'shared/ui/Text'

import { useGetArticleRecommendationsListQuery } from '../api/articleDetailsRecommendationsApi'

interface ArticleDetailsRecommendationsListProps {
  className?: string
}

export const ArticleDetailsRecommendationsList = ({
  className
}: ArticleDetailsRecommendationsListProps) => {
  const { isLoading: isLoadingRecomList, data: recommendations } =
    useGetArticleRecommendationsListQuery(3)

  if (isLoadingRecomList) {
    return (
      <VStack
        max
        gap='16'
      >
        <Skeleton
          height={'30px'}
          width={150}
        />
        <HStack
          max
          justify='between'
        >
          <Skeleton
            height={'300px'}
            width={250}
          />
          <Skeleton
            height={'300px'}
            width={250}
          />
          <Skeleton
            height={'300px'}
            width={250}
          />
        </HStack>
      </VStack>
    )
  }

  if (!recommendations) {
    return (
      <Text
        theme={TextTheme.ERROR}
        text='Извините за неудобства! Мы работаем над вашими рекомендациями, загляните позже :)'
      />
    )
  }

  return (
    <VStack
      gap='8'
      max
      className={classNames('', {}, [className])}
    >
      <ArticleList
        isVirtualizationList={false}
        target={'_blank'}
        articles={recommendations}
      />
    </VStack>
  )
}
