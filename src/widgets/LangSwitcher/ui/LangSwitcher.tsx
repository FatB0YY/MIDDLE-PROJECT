import React, { type FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LangSwitcher.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation()

  const updateLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value as 'en' | 'ru')
  }

  return (
    <div style={{ margin: 12 }}>
      <select
        value={i18n.language}
        onChange={updateLang}
        className={classNames(cls.LangSwitcher, {}, [className])}
      >
        <option value={'ru'}>Ru</option>
        <option value={'en'}>En</option>
      </select>
      <div>{t('Язык')}</div>
    </div>
  )
}
