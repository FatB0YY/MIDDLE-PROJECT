import { useCallback, useEffect, useState } from 'react'

interface UseModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export function useModal({ isOpen, onClose }: UseModalProps) {
  const [isMounted, setIsMounted] = useState(false)

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

  // на каждый перерендер комп., эти функции будут создаваться заново, новые ссылки!!!
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === 'Escape' || e.key === 'Esc') && onClose) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  return { isMounted, closeHandler }
}
