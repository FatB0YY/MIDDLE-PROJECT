import { Counter } from 'entites/Counter'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation('main')

  return (
    <div>
      {t('pages.mainpage')}
      <Counter />
    </div>
  )
}

export default MainPage
