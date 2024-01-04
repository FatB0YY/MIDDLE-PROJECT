import React, {
  ImgHTMLAttributes,
  ReactElement,
  useLayoutEffect,
  useState
} from 'react'

import { classNames } from '../../lib/classNames/classNames'

import cls from './AppImage.module.scss'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  fallback?: ReactElement
  errorFallback?: ReactElement
}

export const AppImage = ({
  className,
  src,
  alt,
  errorFallback,
  fallback,
  ...otherProps
}: AppImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useLayoutEffect(() => {
    const img = new Image()

    img.src = src ?? ''

    img.onload = () => {
      setIsLoading(false)
    }

    img.onerror = () => {
      setIsLoading(false)
      setHasError(true)
    }
  }, [src])

  if (isLoading && fallback) {
    return fallback
  }

  if (hasError && errorFallback) {
    return errorFallback
  }

  return (
    <img
      src={src}
      alt={alt}
      className={classNames(cls.AppImage, {}, [className])}
      {...otherProps}
    />
  )
}
