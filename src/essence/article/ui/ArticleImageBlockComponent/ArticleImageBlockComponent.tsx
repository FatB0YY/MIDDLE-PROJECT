import React, { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleImageBlockComponent.module.scss'
import { Text, TextAlign } from 'shared/ui/Text'
import { ArticleImageBlock } from '../../model/types/article'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> = memo(({ className, block }) => {
  return (
    <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
      <img src={block.src} alt={block.title} className={cls.img} />
      {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
    </div>
  )
})
