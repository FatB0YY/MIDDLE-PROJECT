import React from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/classNames/classNames'

import { Input } from 'shared/ui/Input'
import { Card } from 'shared/ui/Card/Card'

import cls from './ArticleSearch.module.scss'

interface ArticleSearchProps {
  className?: string
  onChange: (value: string) => void
  value: string
}

export const ArticleSearch = ({
  className,
  onChange,
  value
}: ArticleSearchProps) => {
  const { t } = useTranslation('article')

  return (
    <Card className={classNames(cls.ArticleSearch, {}, [className])}>
      <Input
        onChange={onChange}
        value={value}
        placeholder={t('features.articlesearch.placeholder')}
      />
    </Card>
  )
}
