import React, { FC, MutableRefObject, ReactNode, memo, useRef, UIEvent, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll/useInfinityScroll'
import { StateSchema, useActionCreatorsTyped } from 'shared/lib/store'
import { getSaveScrollByPath, saveScrollActions } from 'features/ScrollSave'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useThrottle } from 'shared/lib/hooks/useTrottle/useThrottle'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

// shared -> widgets
export const Page: FC<PageProps> = memo(({ className, children, onScrollEnd }) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const actionsSaveScroll = useActionCreatorsTyped(saveScrollActions)
  const location = useLocation()
  const scrollPosition = useSelector((state: StateSchema) => getSaveScrollByPath(state, location.pathname))

  useInfinityScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  })

  useEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  }, [])

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    actionsSaveScroll.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: location.pathname,
    })
  }, 500)

  return (
    <section onScroll={onScroll} ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
      {children}
      <div ref={triggerRef}></div>
    </section>
  )
})
