import React from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Counter } from '@/essence/counter'
import { Page } from '@/widgets/Page/Page'

import cls from './MainPage.module.scss'

interface MainPageProps {
  className?: string
}

const MainPage = ({ className }: MainPageProps) => {
  const { t } = useTranslation('main')

  return (
    <Page className={classNames(cls.MainPage, {}, [className])}>
      {t('pages.mainpage')}
      <Counter />
    </Page>
  )
}

export default MainPage
