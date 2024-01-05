import React from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'

import cls from './MainPage.module.scss'

interface MainPageProps {
  className?: string
}

const MainPage = ({ className }: MainPageProps) => {
  const { t } = useTranslation('main')

  return (
    <Page
      data-testid='MainPage'
      className={classNames(cls.MainPage, {}, [className])}
    >
      {t('pages.mainpage')}
    </Page>
  )
}

export default MainPage
