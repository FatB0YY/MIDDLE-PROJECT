import React, { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleListItem.module.scss'
import { ArticleTextBlock, EArticleBlockType, EArticleView, IArticle } from '../../model/types/article'
import { Text } from 'shared/ui/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar'
import { Button, ThemeButton } from 'shared/ui/Button'
import { useTranslation } from 'react-i18next'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { AppLink } from 'shared/ui/AppLink'
import { RoutePath } from 'app/providers/router/config/routeConfig'
// import { useHover } from 'shared/lib/hooks/useHover/useHover'

interface ArticleListItemProps {
  className?: string
  article: IArticle
  view: EArticleView
  target?: React.HTMLAttributeAnchorTarget
}

export const ArticleListItem: FC<ArticleListItemProps> = memo(({ className, article, view, target }) => {
  // const [isHover, bindHover] = useHover()
  const { t } = useTranslation('article')

  const types = <Text text={article.type.join(', ')} className={cls.types} />
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  )

  if (view === EArticleView.BIG) {
    let textBlock = article.blocks.find((block) => block.type === EArticleBlockType.TEXT) as ArticleTextBlock
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} alt={article.title} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>

          <Text title={article.title} className={cls.title} />

          {types}

          <img src={article.img} alt={article.title} className={cls.img} />

          {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}

          <div className={cls.footer}>
            <AppLink to={RoutePath.articles_details + article.id}>
              <Button theme={ThemeButton.ACCENT}>{t('entities.article.articlelistitem.readmore')}</Button>
            </AppLink>

            {views}
          </div>
        </Card>
      </div>
    )
  }

  if (view === EArticleView.SMALL) {
    return (
      <AppLink
        target={target}
        to={RoutePath.articles_details + article.id}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.imageWrapper}>
            <img src={article.img} alt={article.title} className={cls.img} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          <Text text={article.title} className={cls.title} />
        </Card>
      </AppLink>
    )
  }

  return null
})
