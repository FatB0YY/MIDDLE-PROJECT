import React from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import IconArrow from '@/shared/assets/icons/circle-up.svg'

import cls from './ScrollToTopButton.module.scss'

interface ScrollToTopButtonProps {
  className?: string
}

export const ScrollToTopButton = ({ className }: ScrollToTopButtonProps) => {
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <Button
      onClick={onClick}
      className={classNames(cls.ScrollToTopButton, {}, [className])}
    >
      <Icon
        width={32}
        height={32}
        Svg={IconArrow}
      />
    </Button>
  )
}
