import React, { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { Listbox } from '@/shared/ui/Popups'

import { classNames } from '@/shared/lib/classNames/classNames'

// import cls from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
}
export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const updateLang = useCallback(
    (value: string) => {
      i18n.changeLanguage(value as 'en' | 'ru')
    },
    [i18n]
  )

  const options = [
    {
      value: 'ru',
      content: t('widgets.langswitcher.optionru'),
      unavailable: false
    },
    {
      value: 'en',
      content: t('widgets.langswitcher.optionen'),
      unavailable: false
    }
  ]

  return (
    <Listbox
      className={classNames('', {}, [className])}
      onChange={updateLang}
      value={i18n.language}
      items={options}
    />
  )
})

LangSwitcher.displayName = 'LangSwitcher'
