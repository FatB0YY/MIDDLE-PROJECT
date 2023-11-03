import { Counter } from 'entities/Counter/index'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'shared/ui/Input'

const MainPage = () => {
  const { t } = useTranslation('main')
  const [value, setValue] = useState('')

  const onChange = (val: string) => {
    setValue(val)
  }

  return (
    <div>
      {t('pages.mainpage')}
      <Counter />

      <Input placeholder='Введите текст' onChange={onChange} value={value} />
    </div>
  )
}

export default MainPage
