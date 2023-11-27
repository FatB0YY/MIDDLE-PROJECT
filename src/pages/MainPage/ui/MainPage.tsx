import React, { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MainPage.module.scss'
import { useTranslation } from 'react-i18next'
import { Counter } from 'essence/counter'
import { Page } from 'widgets/Page/Page'

interface MainPageProps {
  className?: string
}

const MainPage: FC<MainPageProps> = ({ className }) => {
  const { t } = useTranslation('main')

  return (
    <Page className={classNames(cls.MainPage, {}, [className])}>
      {t('pages.mainpage')}
      <Counter />
    </Page>
  )
}

export default MainPage
