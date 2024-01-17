import React, { memo } from 'react'

import { Text } from '@/shared/ui/Text'

import { classNames } from '@/shared/lib/classNames/classNames'

import { ArticleTextBlock } from '../../model/types/article'

import cls from './ArticleTextBlockComponent.module.scss'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
  ({ className, block }: ArticleTextBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && (
          <Text
            title={block.title}
            className={cls.title}
            size='m'
          />
        )}
        {block.paragraphs.map((paragraph) => (
          <Text
            key={paragraph}
            text={paragraph}
            className={cls.paragraph}
            size='m'
          />
        ))}
      </div>
    )
  }
)

ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent'
