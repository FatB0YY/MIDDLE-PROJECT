import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react'

import { Mods, classNames } from '../../../lib/classNames/classNames'

import cls from './Button.module.scss'

export type ThemeButton =
  // для иконок
  | 'icon_outline'
  // success удача (зеленая)
  | 'success'
  // Только border
  | 'outline'
  // Пустая полностью
  | 'clear'
  // другое
  | 'accent'
  // ошибки
  | 'red'
  | 'outline_red'

type ButtonSize = 'size_m' | 'size_l' | 'size_xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  /**
   * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
   */
  theme?: ThemeButton
  /**
   * Флаг, делающий кнопку квадратной
   */
  square?: boolean
  /**
   * Размер кнопки в соответствии с дизайн системой
   */
  size?: ButtonSize
  /**
   * Флаг, отвечающий за работу кнопки
   */
  disabled?: boolean
  /**
   * Содержимое кнопки
   */
  children?: ReactNode
}

// не рекомендуется использовать memo когда компонент
// использует пропс children.
// НО в кнопке нет сложной древовидной структуры, поэтому можно :) хранить дешево, а сравнивать легко

export const Button = memo(
  ({
    className,
    children,
    theme = 'outline',
    square,
    size = 'size_m',
    disabled,
    ...otherProps
  }: ButtonProps) => {
    const mods: Mods = {
      [cls.square]: square,
      [cls.disabled]: disabled
    }

    return (
      <button
        className={classNames(cls.Button, mods, [
          className,
          cls[theme],
          cls[size]
        ])}
        {...otherProps}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
