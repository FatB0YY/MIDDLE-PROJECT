import React, { ReactNode } from 'react'

import { Popover as HPopover } from '@headlessui/react'

import { DropdownDirection } from 'shared/types/ui'
import { classNames } from 'shared/lib/classNames/classNames'

import cls from '../../styles/popup.module.scss'
import { mapDirectionClass } from '../../styles/const'

interface PopoverProps {
  className?: string
  trigger: ReactNode
  direction?: DropdownDirection
  children: ReactNode
}

export const Popover = ({
  trigger,
  className,
  direction = 'bottom right',
  children
}: PopoverProps) => {
  const optionsClasses = [mapDirectionClass[direction]]

  return (
    <HPopover className={classNames(cls.Popover, {}, [className])}>
      <HPopover.Button className={cls.trigger}>{trigger}</HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, optionsClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  )
}
