import React, { CSSProperties, useMemo } from 'react'

import { classNames } from '../../../lib/classNames/classNames'
import { AppImage } from '../../AppImage'
import AvatarIcon from '../../../assets/icons/user-filled.svg'
import { Icon } from '../../Icon'
import { Skeleton } from '../../Skeleton'

import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  src?: string
  alt?: string
  size?: number
}

export const Avatar = ({ className, src, alt, size = 25 }: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size
    }
  }, [size])

  const fallback = (
    <Skeleton
      width={size}
      height={size}
      border='50%'
    />
  )

  const errorFallback = (
    <Icon
      width={size}
      height={size}
      Svg={AvatarIcon}
    />
  )

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
    />
  )
}
