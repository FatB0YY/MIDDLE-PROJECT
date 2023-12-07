import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  // то
  children: ReactNode
  // куда
  element?: HTMLElement
}

export const Portal = ({ children, element = document.body }: PortalProps) => {
  return createPortal(children, element)
}
