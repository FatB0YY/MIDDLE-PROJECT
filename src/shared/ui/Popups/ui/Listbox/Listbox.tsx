import React, { Fragment, ReactNode, useMemo } from 'react'
import { Listbox as HListBox } from '@headlessui/react'

import { Button } from '../../../../ui/Button'
import { VStack } from '../../../../ui/Stack'
import { classNames } from '../../../../lib/classNames/classNames'
import SelectIcon from '../../../../assets/icons/select.svg'
import { DropdownDirection } from '../../../../types/ui'
import { Icon } from '../../../Icon/Icon'
import cls from '../../styles/popup.module.scss'
import { mapDirectionClass } from '../../styles/const'

export interface ListBoxItem<T extends string> {
  value: T
  content: ReactNode
}

interface ListboxProps<T extends string> {
  items?: ListBoxItem<T>[]
  className?: string
  value?: T
  defaultValue?: string
  onChange: (value: T) => void
  readonly?: boolean
  direction?: DropdownDirection
}

export const Listbox = <T extends string>(props: ListboxProps<T>) => {
  const {
    onChange,
    className,
    defaultValue,
    direction = 'bottom right',
    items = [],
    readonly,
    value
  } = props

  const optionsClasses = [mapDirectionClass[direction]]

  const selectedItem = useMemo(() => {
    return items.find((item) => item.value === value)
  }, [items, value])

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
      <HListBox.Button
        as={Button}
        className={cls.trigger}
      >
        {selectedItem?.content ?? defaultValue}
        <Icon
          className={cls.icon}
          Svg={SelectIcon}
        />
      </HListBox.Button>
      <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
        <VStack
          gap='8'
          max
        >
          {items.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.item,
                    {
                      [cls.active]: active,
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
        </VStack>
      </HListBox.Options>
    </HListBox>
  )
}
