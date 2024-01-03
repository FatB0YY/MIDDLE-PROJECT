import React, { Fragment, ReactNode } from 'react'
import { Menu } from '@headlessui/react'
import { Link } from 'react-router-dom'

import { Button, ThemeButton } from '../../../../ui/Button'
import { classNames } from '../../../../lib/classNames/classNames'
import SelectIcon from '../../../../assets/icons/select.svg'
import { DropdownDirection } from '../../../../types/ui'
import { VStack } from '../../../Stack'
import { Icon } from '../../../../ui/Icon/index'
import cls from '../../styles/popup.module.scss'
import { mapDirectionClass } from '../../styles/const'

export interface DropdownItem {
  disabled?: boolean
  content: ReactNode
  onClick: () => void
  href?: string
  buttonTheme: ThemeButton
}

export interface DropdownProps {
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  visibleIcon: boolean
  direction?: DropdownDirection
}

// повторы из файла Listbox, потом будет рефакторинг

export const Dropdown = ({
  className,
  items,
  trigger,
  visibleIcon,
  direction = 'bottom right'
}: DropdownProps) => {
  const optionsClasses = [mapDirectionClass[direction]]

  return (
    <Menu
      as='div'
      className={classNames(cls.Dropdown, {}, [className])}
    >
      <Menu.Button className={cls.trigger}>
        {trigger}
        {visibleIcon && (
          <Icon
            className={cls.icon}
            Svg={SelectIcon}
          />
        )}
      </Menu.Button>
      <Menu.Items className={classNames(cls.items, {}, optionsClasses)}>
        <VStack
          max
          gap='8'
        >
          {items.map((item, index) => {
            const content = ({ active }: { active: boolean }) => (
              <Button
                theme={item.buttonTheme}
                type='button'
                disabled={item.disabled}
                onClick={item.onClick}
                className={classNames(
                  cls.item,
                  {
                    [cls.active]: active
                  },
                  []
                )}
              >
                {item.content}
              </Button>
            )

            if (item.href || typeof item.href === 'string') {
              return (
                <Menu.Item
                  to={item.href}
                  key={index}
                  as={Link}
                  disabled={item.disabled}
                  className={cls.link}
                >
                  {content}
                </Menu.Item>
              )
            }

            return (
              <Menu.Item
                key={index}
                as={Fragment}
                disabled={item.disabled}
              >
                {content}
              </Menu.Item>
            )
          })}
        </VStack>
      </Menu.Items>
    </Menu>
  )
}
