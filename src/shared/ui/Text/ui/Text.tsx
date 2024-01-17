import React from 'react'

import { classNames } from '../../../lib/classNames/classNames'

import cls from './Text.module.scss'

type TextVariant = 'primary' | 'error' | 'accent'

type TextAlign = 'right' | 'left' | 'center'

type TextSize = 's' | 'm' | 'l'

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextVariant
  align?: TextAlign
  size?: TextSize

  'data-testid'?: string
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToClass: Record<TextSize, string> = {
  s: 'size_s',
  m: 'size_m',
  l: 'size_l'
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1'
}

export const Text = (props: TextProps) => {
  const {
    className,
    text,
    title,
    theme = 'primary',
    align = 'left',
    size = 'm',
    'data-testid': dataTestId = 'Text'
  } = props

  const HeaderTag = mapSizeToHeaderTag[size]
  const sizeClass = mapSizeToClass[size]

  const additionalClasses = [className, cls[theme], cls[align], sizeClass]

  return (
    <div className={classNames(cls.Text, {}, additionalClasses)}>
      {title && (
        <HeaderTag
          className={cls.title}
          data-testid={`${dataTestId}.Header`}
        >
          {title}
        </HeaderTag>
      )}
      {text && (
        <p
          className={cls.text}
          data-testid={`${dataTestId}.Paragraph`}
        >
          {text}
        </p>
      )}
    </div>
  )
}
