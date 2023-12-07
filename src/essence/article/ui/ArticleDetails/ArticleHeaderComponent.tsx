// ArticleHeaderComponent.jsx
import React, { memo } from 'react'

import { Avatar } from 'shared/ui/Avatar'
import { Text, TextSize } from 'shared/ui/Text'
import { Icon } from 'shared/ui/Icon/Icon'

import { IArticle } from 'essence/article/model/types/article'

import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg'

import cls from './ArticleDetails.module.scss'

interface ArticleHeaderComponentProps {
  article: IArticle
}

const ArticleHeaderComponent = ({ article }: ArticleHeaderComponentProps) => (
  <>
    <div className={cls.avatarWrapper}>
      <Avatar
        size={100}
        src={article.img}
        className={cls.avatar}
      />
    </div>
    <Text
      className={cls.title}
      title={article.title}
      text={article.subtitle}
      size={TextSize.L}
    />
    <div className={cls.articleInfo}>
      <Icon
        className={cls.icon}
        Svg={EyeIcon}
      />
      <Text text={String(article.views)} />
    </div>
    <div className={cls.articleInfo}>
      <Icon
        className={cls.icon}
        Svg={CalendarIcon}
      />
      <Text text={article.createdAt} />
    </div>
  </>
)

export default memo(ArticleHeaderComponent)
