import React, { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Text.module.scss'

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
}

export enum TextTheme {
  PRIMARY = 'primary',
  DARK = 'dark',
  ERROR = 'error',
}

export const Text: FC<TextProps> = memo(({ className, title, text, theme = TextTheme.PRIMARY }) => {
  return (
    <div className={classNames(cls.Text, {}, [className, cls[theme]])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})
