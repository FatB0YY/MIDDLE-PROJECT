import React, {
  MutableRefObject,
  ReactNode,
  memo,
  useRef,
  UIEvent,
  useEffect
} from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useInfinityScroll } from '@/shared/lib/hooks/useInfinityScroll/useInfinityScroll'
import { StateSchema, useActionCreatorsTyped } from '@/shared/lib/store'
import { getSaveScrollByPath, saveScrollActions } from '@/features/ScrollSave'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import { MyTestProps } from '@/shared/types/tests'

import cls from './Page.module.scss'

interface PageProps extends MyTestProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

// shared -> widgets
export const Page = memo((props: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const actionsSaveScroll = useActionCreatorsTyped(saveScrollActions)
  const location = useLocation()
  const scrollPosition = useSelector((state: StateSchema) =>
    getSaveScrollByPath(state, location.pathname)
  )

  useInfinityScroll({
    triggerRef,
    wrapperRef,
    callback: props.onScrollEnd
  })

  useEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  }, [scrollPosition, wrapperRef])

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    actionsSaveScroll.setScrollPosition({
      position: e.currentTarget.scrollTop,
      path: location.pathname
    })
  }, 500)

  return (
    <main
      data-testid={props['data-testid'] ?? 'Page'}
      onScroll={onScroll}
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [props.className])}
    >
      {props.children}
      {props.onScrollEnd ? (
        <div
          className={cls.trigger}
          ref={triggerRef}
        ></div>
      ) : null}
    </main>
  )
})

Page.displayName = 'Page'
