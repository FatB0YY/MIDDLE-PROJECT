import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import { Portal } from 'shared/ui/Portal/index'
import { useTheme } from 'app/providers/ThemeProvider'

interface ModalProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

export const Modal: FC<ModalProps> = ({ className, children, isOpen, onClose, lazy, ...otherProps }) => {
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

  // на каждый перерендер комп., эти функции будут создаваться заного, новые ссылки!!!
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === 'Escape' || e.key === 'Esc') && onClose) {
        onClose()
      }
    },
    [closeHandler]
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
    [cls.opened]: isOpen,
  }

  return (
    <Portal>
      <div {...otherProps} className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
        <div onClick={closeHandler} className={cls.overlay}>
          <div onClick={onContentClick} className={cls.content}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

// useRef<ReturnType<typeof setTimeout>>() получить тип
