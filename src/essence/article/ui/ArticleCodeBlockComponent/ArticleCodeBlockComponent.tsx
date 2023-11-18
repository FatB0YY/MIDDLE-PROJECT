import React, { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleCodeBlockComponent.module.scss'
import { ArticleCodeBlock } from '../../model/types/article'
import { useTranslation } from 'react-i18next'
import { Code } from 'shared/ui/Code/Code'

interface ArticleCodeBlockComponentProps {
  className?: string
  block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> = memo(({ className, block }) => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
      <Code text={block.code} />
    </div>
  )
})
