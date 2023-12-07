import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import { Mods, classNames } from 'shared/lib/classNames/classNames'
/* eslint-disable */
import { Portal } from 'shared/ui/Portal/index'
/* eslint-enable */
import { useTheme } from 'app/providers/ThemeProvider'

import cls from './Modal.module.scss'

interface ModalProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

export const Modal = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
  ...otherProps
}: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

  const closeHandler = () => {
    if (onClose) {
      onClose()
    }
  }

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // на каждый перерендер комп., эти функции будут создаваться заново, новые ссылки!!!
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === 'Escape' || e.key === 'Esc') && onClose) {
        onClose()
      }
    },
    /* eslint-disable */
    [closeHandler, onClose]
    /* eslint-enable */
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  if (lazy && !isMounted) {
    return null
  }

  const mods: Mods = {
    [cls.opened]: isOpen
  }

  return (
    <Portal>
      <div
        {...otherProps}
        className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}
      >
        <div
          onClick={closeHandler}
          className={cls.overlay}
        >
          <div
            onClick={onContentClick}
            className={cls.content}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

// useRef<ReturnType<typeof setTimeout>>() получить тип
