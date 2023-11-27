import React, { FC, HTMLAttributeAnchorTarget } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { EArticleView, IArticle } from 'essence/article/model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
  className?: string
  articles: IArticle[]
  isLoading?: boolean
  view?: EArticleView
  target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: EArticleView) =>
  new Array(view === EArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />)

export const ArticleList: FC<ArticleListProps> = ({
  className,
  articles,
  isLoading,
  view = EArticleView.SMALL,
  target,
}) => {
  const renderArticle = (article: IArticle) => {
    return <ArticleListItem target={target} key={article.id} view={view} article={article} className={cls.card} />
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  )
}
