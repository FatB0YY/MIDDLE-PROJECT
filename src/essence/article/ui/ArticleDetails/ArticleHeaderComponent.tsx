// ArticleHeaderComponent.jsx
import React, { memo } from 'react'

import { Avatar } from '@/shared/ui/Avatar'
import { Text } from '@/shared/ui/Text'
import { Icon } from '@/shared/ui/Icon'

import { HStack, VStack } from '@/shared/ui/Stack'

import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg'

import { IArticle } from '../../model/types/article'

import cls from './ArticleDetails.module.scss'

interface ArticleHeaderComponentProps {
  article: IArticle
}

const ArticleHeaderComponent = ({ article }: ArticleHeaderComponentProps) => (
  <>
    <HStack
      justify='center'
      max
      className={cls.avatarWrapper}
    >
      <Avatar
        size={100}
        src={article.img}
        className={cls.avatar}
      />
    </HStack>
    <VStack
      gap='4'
      max
    >
      <Text
        className={cls.title}
        title={article.title}
        text={article.subtitle}
        size='l'
      />
      <HStack
        gap='8'
        className={cls.articleInfo}
      >
        <Icon
          className={cls.icon}
          Svg={EyeIcon}
        />
        <Text text={String(article.views)} />
      </HStack>
      <HStack
        gap='8'
        className={cls.articleInfo}
      >
        <Icon
          className={cls.icon}
          Svg={CalendarIcon}
        />
        <Text text={article.createdAt} />
      </HStack>
    </VStack>
  </>
)

export default memo(ArticleHeaderComponent)
