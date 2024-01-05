import React, { HTMLAttributeAnchorTarget } from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { HStack, VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'

import { IArticle } from '../../model/types/article'
import { EArticleView } from '../../model/const/const'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

import cls from './ArticleList.module.scss'

interface ArticleListProps {
  className?: string
  articles: IArticle[]
  view?: EArticleView
  target?: HTMLAttributeAnchorTarget
  isVirtualizationList: boolean
  isLoading?: boolean
}

/* eslint-disable */
const Row = ({ data, index, style }: any) => {
  /* eslint-enable */
  const { articles, view, target, itemsCount } = data

  if (index + 1 >= itemsCount) return null

  const article = articles[index]

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

export const ArticleList = ({
  className,
  articles,
  view = EArticleView.SMALL,
  target,
  isVirtualizationList,
  isLoading
}: ArticleListProps) => {
  const size = view === EArticleView.BIG ? 750 : 350

  const renderArticle = (article: IArticle) => (
    <ArticleListItem
      target={target}
      key={article.id}
      view={view}
      article={article}
      className={cls.card}
    />
  )

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
  }

  const ListComponent = view === EArticleView.BIG ? VStack : HStack

  return (
    <ListComponent
      max
      justify='between'
      className={classNames(cls.ArticleListNoisVirtualizationList, {}, [
        className,
        cls[view]
      ])}
    >
      {isLoading && getSkeletons(view)}
      {articles.length > 0 && articles.map(renderArticle)}
    </ListComponent>
  )
}

const getSkeletons = (view: EArticleView) =>
  new Array(view === EArticleView.SMALL ? 9 : 3).fill(0).map((item, index) => (
    <ArticleListItemSkeleton
      className={cls.card}
      key={index}
      view={view}
    />
  ))
