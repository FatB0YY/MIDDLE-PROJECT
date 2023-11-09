import React, { ButtonHTMLAttributes, FC, ReactNode, memo } from 'react'
import { Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
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

export const Button: FC<ButtonProps> = memo(
  ({ className, children, theme = ThemeButton.OUTLINE, square, size = ButtonSize.M, disabled, ...otherProps }) => {
    const mods: Mods = {
      [cls.square]: square,
      [cls.disabled]: disabled,
    }

    return (
      <button className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])} {...otherProps}>
        {children}
      </button>
    )
  }
)
