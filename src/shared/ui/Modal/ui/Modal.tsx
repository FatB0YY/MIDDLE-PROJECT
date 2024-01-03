import React, { ReactNode } from 'react'

import { Portal } from '../../../ui/Portal'
import { Overlay } from '../../../ui/Overlay'
import { useModal } from '../../../lib/hooks/useModal/useModal'
import { useTheme } from '../../../lib/hooks/useTheme/useTheme'
import { Mods, classNames } from '../../../lib/classNames/classNames'

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
