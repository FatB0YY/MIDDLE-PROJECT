import React, { memo } from 'react'

import { Text } from '@/shared/ui/Text'

import { classNames } from '@/shared/lib/classNames/classNames'

import { ArticleImageBlock } from '../../model/types/article'

import cls from './ArticleImageBlockComponent.module.scss'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: ArticleImageBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
      >
        <img
          src={block.src}
          alt={block.title}
          className={cls.img}
        />
        {block.title && (
          <Text
            text={block.title}
            align='center'
          />
        )}
      </div>
    )
  }
)

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent'
