import React, { HTMLAttributeAnchorTarget } from 'react'

import { FixedSizeList } from 'react-window'

import AutoSizer from 'react-virtualized-auto-sizer'

import { classNames } from 'shared/lib/classNames/classNames'
import { HStack } from 'shared/ui/Stack'
import { IArticle } from 'essence/article/model/types/article'
import { EArticleView } from 'essence/article/model/const/const'

import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
// import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

// import AutoSizer from 'react-virtualized-auto-sizer'

import cls from './ArticleList.module.scss'
// import InfiniteLoader from 'react-window-infinite-loader'
// import { useThrottle } from 'shared/lib/hooks/useTrottle/useThrottle'

interface ArticleListProps {
  className?: string
  articles: IArticle[]
  isLoading?: boolean
  view?: EArticleView
  target?: HTMLAttributeAnchorTarget
  isVirtualizationList: boolean
}

// const getSkeletons = (view: EArticleView) =>
//   new Array(view === EArticleView.SMALL ? 9 : 3).fill(0).map((item, index) => (
//     <ArticleListItemSkeleton
//       className={cls.card}
//       key={index}
//       view={view}
//     />
//   ))

/* eslint-disable */
const Row = ({ data, index, style }: any) => {
  console.log('style', style)

  /* eslint-enable */

  const { articles, view, target, itemsCount } = data

  if (index + 1 >= itemsCount) return null

  const article = articles[index]

  return (
    <ArticleListItem
      // style={style}
      target={target}
      key={article.id}
      view={view}
      article={article}
      className={cls.card}
    />
  )
}

export const ArticleList = ({
  className,
  articles,
  // isLoading,
  view = EArticleView.SMALL,
  target,
  isVirtualizationList
}: ArticleListProps) => {
  const size = view === EArticleView.BIG ? 750 : 350

  const renderArticle = (article: IArticle) => {
    return (
      <ArticleListItem
        target={target}
        key={article.id}
        view={view}
        article={article}
        className={cls.card}
      />
    )
  }

  if (isVirtualizationList) {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
            height={height}
            width={width}
            itemCount={articles.length}
            itemData={{ articles, itemsCount: articles.length, target, view }}
            itemSize={size}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    )
  } else {
    return (
      <HStack
        max
        justify='between'
        className={classNames(cls.ArticleListNoisVirtualizationList, {}, [
          className,
          cls[view]
        ])}
      >
        {articles.length > 0 ? articles.map(renderArticle) : null}
      </HStack>
    )
  }
}
