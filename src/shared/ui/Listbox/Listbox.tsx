import React, { Fragment, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'

import { classNames } from 'shared/lib/classNames/classNames'
import SelectIcon from 'shared/assets/icons/select.svg'
import { DropdownDirection } from 'shared/types/ui'

import { Icon } from '../Icon/Icon'

// import { Button } from '../Button'

import cls from './Listbox.module.scss'

export interface ListBoxItem {
  value: string
  content: ReactNode
  unavailable: boolean
}

interface ListboxProps {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void
  readonly?: boolean
  direction?: DropdownDirection
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top right': cls.optionsTopRight,
  'top left': cls.optionsTopLeft
}

export const Listbox = ({
  items = [],
  className,
  defaultValue,
  onChange,
  value,
  readonly,
  direction = 'bottom right'
}: ListboxProps) => {
  const optionsClasses = [mapDirectionClass[direction]]

  return (
    <HListBox
      disabled={readonly}
      as={'div'}
      className={classNames(cls.Listbox, { [cls.disabled]: readonly }, [
        className
      ])}
      value={value}
      onChange={onChange}
    >
      <HListBox.Button className={cls.trigger}>
        {value ?? defaultValue}
        <Icon
          className={cls.icon}
          Svg={SelectIcon}
        />
      </HListBox.Button>
      <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
        {items.map((item) => (
          <HListBox.Option
            key={item.value}
            value={item.value}
            disabled={item.unavailable}
            as={Fragment}
          >
            {({ active, selected }) => (
              <li
                className={classNames(
                  cls.item,
                  {
                    [cls.active]: active,
                    [cls.unavailable]: item.unavailable,
                    [cls.selected]: selected
                  },
                  []
                )}
              >
                {item.content}
              </li>
            )}
          </HListBox.Option>
        ))}
      </HListBox.Options>
    </HListBox>
  )
}
