import React, { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { classNames } from '@/shared/lib/classNames/classNames'

import { Text } from '@/shared/ui/Text'
import { Icon } from '@/shared/ui/Icon/Icon'

import { Card } from '@/shared/ui/Card/Card'
import { Avatar } from '@/shared/ui/Avatar'
import { Button, ThemeButton } from '@/shared/ui/Button'
import { RoutePath } from '@/app/providers/router/config/routeConfig'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'

import { EArticleBlockType, EArticleView } from '../../model/const/const'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { ArticleTextBlock, IArticle } from '../../model/types/article'

import cls from './ArticleListItem.module.scss'

// import { useHover } from 'shared/lib/hooks/useHover/useHover'

interface ArticleListItemProps {
  className?: string
  article: IArticle
  view: EArticleView
  target?: React.HTMLAttributeAnchorTarget
  // style: object
}

export const ArticleListItem = memo(
  ({ className, article, view, target }: ArticleListItemProps) => {
    // const [isHover, bindHover] = useHover()
    const { t } = useTranslation('article')

    const types = (
      <Text
        text={article.type.join(', ')}
        className={cls.types}
      />
    )
    const views = (
      <>
        <Text
          text={String(article.views)}
          className={cls.views}
        />
        <Icon Svg={EyeIcon} />
      </>
    )

    if (view === EArticleView.BIG) {
      const textBlock = article.blocks.find(
        (block) => block.type === EArticleBlockType.TEXT
      ) as ArticleTextBlock
      return (
        <Card
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view]
            // style
          ])}
        >
          <div className={cls.header}>
            <Avatar
              size={30}
              src={article.user.avatar}
              alt={article.title}
            />
            <Text
              text={article.user.username}
              className={cls.username}
            />
            <Text
              text={article.createdAt}
              className={cls.date}
            />
          </div>

          <Text
            title={article.title}
            className={cls.title}
          />

          {types}

          <img
            src={article.img}
            alt={article.title}
            className={cls.img}
          />

          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}

          <div className={cls.footer}>
            <Link to={RoutePath.articles_details + article.id}>
              <Button theme={ThemeButton.ACCENT}>
                {t('entities.article.articlelistitem.readmore')}
              </Button>
            </Link>

            {views}
          </div>
        </Card>
      )
    }

    if (view === EArticleView.SMALL) {
      return (
        <Link
          target={target}
          to={RoutePath.articles_details + article.id}
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view]
            // style
          ])}
        >
          <Card className={cls.card}>
            <div className={cls.imageWrapper}>
              <img
                src={article.img}
                alt={article.title}
                className={cls.img}
              />
              <Text
                text={article.createdAt}
                className={cls.date}
              />
            </div>
            <div className={cls.infoWrapper}>
              {types}
              {views}
            </div>
            <Text
              text={article.title}
              className={cls.title}
            />
          </Card>
        </Link>
      )
    }

    return null
  }
)

ArticleListItem.displayName = 'ArticleListItem'
