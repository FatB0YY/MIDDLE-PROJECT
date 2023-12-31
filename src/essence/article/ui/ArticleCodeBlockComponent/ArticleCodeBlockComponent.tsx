import React, { memo } from 'react'

import { Code } from '@/shared/ui/Code'

import { classNames } from '@/shared/lib/classNames/classNames'

import { ArticleCodeBlock } from '../../model/types/article'

import cls from './ArticleCodeBlockComponent.module.scss'

interface ArticleCodeBlockComponentProps {
  className?: string
  block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(
  ({ className, block }: ArticleCodeBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}
      >
        <Code text={block.code} />
      </div>
    )
  }
)

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent'
