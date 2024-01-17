import React, { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Text } from '@/shared/ui/Text'
import { Icon } from '@/shared/ui/Icon'

import { Card, CardTheme } from '@/shared/ui/Card'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'

import { classNames } from '@/shared/lib/classNames/classNames'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import { getRouteArticleDetails } from '@/shared/const/router'
import { HStack } from '@/shared/ui/Stack'
import { AppImage } from '@/shared/ui/AppImage'
import { Skeleton } from '@/shared/ui/Skeleton'

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

    const themeCard: CardTheme = 'normal'

    const types = (
      <Text
        text={article.type.join(', ')}
        className={cls.types}
      />
    )
    const views = (
      <HStack gap='8'>
        <Text
          text={String(article.views)}
          className={cls.views}
        />
        <Icon Svg={EyeIcon} />
      </HStack>
    )

    if (view === EArticleView.BIG) {
      const textBlock = article.blocks.find(
        (block) => block.type === EArticleBlockType.TEXT
      ) as ArticleTextBlock
      return (
        <Card
          theme={themeCard}
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

          <AppImage
            fallback={
              <Skeleton
                width={'100%'}
                height={250}
                border='5px'
              />
            }
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

          <HStack
            max
            justify='between'
            className={cls.footer}
          >
            <Link to={getRouteArticleDetails(article.id)}>
              <Button theme='accent'>
                {t('entities.article.articlelistitem.readmore')}
              </Button>
            </Link>

            {views}
          </HStack>
        </Card>
      )
    }

    if (view === EArticleView.SMALL) {
      return (
        <Link
          target={target}
          to={getRouteArticleDetails(article.id)}
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view]
            // style
          ])}
        >
          <Card
            className={cls.card}
            theme={themeCard}
          >
            <div className={cls.imageWrapper}>
              <AppImage
                src={article.img}
                alt={article.title}
                className={cls.img}
                fallback={
                  <Skeleton
                    width={'200px'}
                    height={'200px'}
                    border='5px'
                  />
                }
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
