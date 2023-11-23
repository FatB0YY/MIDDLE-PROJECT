import React, { FC, MutableRefObject, ReactNode, memo, useRef } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll/useInfinityScroll'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page: FC<PageProps> = memo(({ className, children, onScrollEnd }) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  useInfinityScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  })

  return (
    <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
      {children}
      <div ref={triggerRef}></div>
    </section>
  )
})
