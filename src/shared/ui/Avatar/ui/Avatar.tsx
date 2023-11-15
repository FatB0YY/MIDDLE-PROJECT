import React, { CSSProperties, FC, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  src?: string
  alt?: string
  size?: number
}

export const Avatar: FC<AvatarProps> = ({ className, src, alt, size = 25 }) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    }
  }, [size])

  return <img src={src} alt={alt} style={styles} className={classNames(cls.Avatar, {}, [className])} />
}