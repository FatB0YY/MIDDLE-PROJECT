import React, { Suspense, lazy } from 'react'

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

import { ArticleRatingProps } from './ArticleRating'

const ArticleRatingLazy = lazy(async () => await import('./ArticleRating'))

export const ArticleRatingAsync = (props: ArticleRatingProps) => {
  return (
    <Suspense
      fallback={
        <Skeleton
          width={'100%'}
          height={'120px'}
        />
      }
    >
      <ArticleRatingLazy {...props} />
    </Suspense>
  )
}
