import React, { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleSearch.module.scss'
import { Input } from 'shared/ui/Input'
import { useTranslation } from 'react-i18next'
import { Card } from 'shared/ui/Card/Card'

interface ArticleSearchProps {
  className?: string
  onChange: (value: string) => void
  value: string
}

export const ArticleSearch: FC<ArticleSearchProps> = ({ className, onChange, value }) => {
  const { t } = useTranslation('article')

  return (
    <Card className={classNames(cls.ArticleSearch, {}, [className])}>
      <Input onChange={onChange} value={value} placeholder={t('features.articlesearch.placeholder')} />
    </Card>
  )
}
