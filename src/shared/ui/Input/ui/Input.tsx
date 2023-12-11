import React, {
  InputHTMLAttributes,
  memo,
  useLayoutEffect,
  useRef
} from 'react'

import { Mods, classNames } from 'shared/lib/classNames/classNames'
// eslint-disable-next-line fatboyy-plugin1/path-checker
import { VStack } from 'shared/ui/Stack'

import cls from './Input.module.scss'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange' | 'readOnly'
>

interface InputProps extends HTMLInputProps {
  className?: string
  type?: string
  value?: string | number
  onChange?: (value: string) => void
  placeholder?: string
  autofocus?: boolean
  readonly?: boolean
}

export const Input = memo(
  ({
    className,
    value,
    onChange,
    type = 'text',
    placeholder = '>',
    autofocus,
    readonly
  }: InputProps) => {
    const ref = useRef<HTMLInputElement>(null)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    useLayoutEffect(() => {
      if (autofocus && ref.current) {
        ref.current.focus()
      }
    }, [autofocus])

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
        />
      </VStack>
    )
  }
)

Input.displayName = 'Input'
