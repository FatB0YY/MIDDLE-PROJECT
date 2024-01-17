import React, { HTMLAttributes, ReactNode, memo } from 'react'

import { classNames } from '../../lib/classNames/classNames'

import cls from './Card.module.scss'

export type CardTheme = 'normal' | 'outlined'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: ReactNode
  theme?: CardTheme
}

export const Card = memo(
  ({ className, children, theme = 'normal', ...otherProps }: CardProps) => {
    return (
      <div
        {...otherProps}
        className={classNames(cls.Card, {}, [className, cls[theme]])}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
