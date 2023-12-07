import React, { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/classNames/classNames'

import cls from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const updateLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value as 'en' | 'ru')
  }

  return (
    <div className='LangSwitcher-container'>
      <select
        data-testid='LangSwitcherSelect'
        value={i18n.language}
        onChange={updateLang}
        className={classNames(cls.LangSwitcher, {}, [className])}
      >
        <option
          data-testid='select-option'
          value={'ru'}
        >
          {short
            ? t('widgets.langswitcher.optionrushort')
            : t('widgets.langswitcher.optionru')}
        </option>
        <option
          data-testid='select-option'
          value={'en'}
        >
          {short
            ? t('widgets.langswitcher.optionenshort')
            : t('widgets.langswitcher.optionen')}
        </option>
      </select>
    </div>
  )
})

LangSwitcher.displayName = 'LangSwitcher'
