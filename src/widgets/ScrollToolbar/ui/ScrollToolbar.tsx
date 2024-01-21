import React from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { ScrollToTopButton } from '@/features/ScrollToTopButton'
import { VStack } from '@/shared/ui/Stack'

import cls from './ScrollToolbar.module.scss'

interface ScrollToolbarProps {
  className?: string
}

export const ScrollToolbar = ({ className }: ScrollToolbarProps) => {
  return (
    <VStack
      justify='center'
      align='center'
      max
      className={classNames(cls.ScrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  )
}
