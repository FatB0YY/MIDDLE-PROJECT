import React, { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Icon.module.scss'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg, ...otherProps } = props

  return (
    <Svg
      width={15}
      height={15}
      className={classNames(cls.Icon, {}, [className])}
      {...otherProps}
    />
  )
})

Icon.displayName = 'Icon'
