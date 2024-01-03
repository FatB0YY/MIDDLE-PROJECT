import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react'

import { Mods, classNames } from '../../../lib/classNames/classNames'

import cls from './Button.module.scss'

export enum ThemeButton {
  // для иконок
  ICON_OUTLINE = 'icon_outline',
  // success удача (зеленая)
  SUCCESS = 'success',
  // Только border
  OUTLINE = 'outline',
  // Пустая полностью
  CLEAR = 'clear',
  // другое
  ACCENT = 'accent',
  // red
  RED = 'red',
  // OUTLINE_RED
  OUTLINE_RED = 'outline_red'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  children?: ReactNode
}

// не рекомендуется использовать memo когда компонент
// использует пропс children.
// НО в кнопке нет сложной древовидной структуры, поэтому можно :) хранить дешево, а сравнивать легко

export const Button = memo(
  ({
    className,
    children,
    theme = ThemeButton.OUTLINE,
    square,
    size = ButtonSize.M,
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
