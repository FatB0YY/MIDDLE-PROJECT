import React, { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlePage.module.scss'
import { useTranslation } from 'react-i18next'

interface ArticlePageProps {
  className?: string
}

const ArticlePage: FC<ArticlePageProps> = ({ className }) => {
  const { t } = useTranslation('article')

  return <div className={classNames(cls.ArticlePage, {}, [className])}></div>
}

export default memo(ArticlePage)
