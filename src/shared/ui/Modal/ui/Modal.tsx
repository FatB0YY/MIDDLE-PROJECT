import React, { ReactNode } from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
/* eslint-disable */
import { Portal } from '@/shared/ui/Portal/index'
import { useTheme } from '@/app/providers/ThemeProvider'
import { Overlay } from '@/shared/ui/Overlay/Overlay'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

/* eslint-enable */

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
  const { theme } = useTheme()
  const { closeHandler, isMounted } = useModal({ isOpen, onClose })

  const mods: Mods = {
    [cls.opened]: isOpen
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div
        {...otherProps}
        className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}
      >
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
}

// useRef<ReturnType<typeof setTimeout>>() получить тип
