import React, {
  InputHTMLAttributes,
  // memo,
  useLayoutEffect,
  useRef
} from 'react'

import { VStack } from '../../../ui/Stack'
import { Mods, classNames } from '../../../lib/classNames/classNames'
// eslint-disable-next-line fatboyy-plugin1/path-checker

import cls from './Input.module.scss'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  placeholder?: string
  isAutoFocus?: boolean
  readonly?: boolean
  onChange?: (value: string) => void
}

export const Input = ({
  className,
  value,
  onChange,
  type,
  placeholder,
  isAutoFocus,
  readonly,
  ...otherProps
}: InputProps) => {
  const ref = useRef<HTMLInputElement>(null)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  useLayoutEffect(() => {
    if (isAutoFocus && ref.current) {
      ref.current.focus()
    }
  }, [isAutoFocus])

  const mods: Mods = {
    [cls.readonly]: readonly
  }

  return (
    <VStack
      max
      className={classNames(cls.InputWrapper, mods, [className])}
    >
      {placeholder && <span className={cls.placeholder}>{placeholder}</span>}

      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChangeHandler}
        readOnly={readonly}
        className={cls.customInput}
        {...otherProps}
      />
    </VStack>
  )
}

Input.displayName = 'Input'
