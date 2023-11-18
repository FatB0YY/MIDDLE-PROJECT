// ArticleHeaderComponent.jsx
import React, { FC, memo } from 'react'
import { Avatar } from 'shared/ui/Avatar'
import { Text, TextSize } from 'shared/ui/Text'
import { Icon } from 'shared/ui/Icon/Icon'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'
import cls from './ArticleDetails.module.scss'
import { IArticle } from 'essence/article/model/types/article'

interface ArticleHeaderComponentProps {
  article: IArticle
}

const ArticleHeaderComponent: FC<ArticleHeaderComponentProps> = ({ article }) => (
  <>
    <div className={cls.avatarWrapper}>
      <Avatar size={100} src={article.img} className={cls.avatar} />
    </div>
    <Text className={cls.title} title={article.title} text={article.subtitle} size={TextSize.L} />
    <div className={cls.articleInfo}>
      <Icon className={cls.icon} Svg={EyeIcon} />
      <Text text={String(article.views)} />
    </div>
    <div className={cls.articleInfo}>
      <Icon className={cls.icon} Svg={CalendarIcon} />
      <Text text={article.createdAt} />
    </div>
  </>
)

export default memo(ArticleHeaderComponent)
