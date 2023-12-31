import React from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import { Button } from '@/shared/ui/Button'

import cls from './PageError.module.scss'

interface PageErrorProps {
  className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation()

  const reloadPage = () => {
    location.reload()
  }

  return (
    <Page className={classNames(cls.PageError, {}, [className])}>
      <p>{t('widgets.pageerror.title')}</p>
      <Button onClick={reloadPage}>
        {t('widgets.pageerror.buttonreload')}
      </Button>
    </Page>
  )
}
