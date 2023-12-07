import React, {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState
} from 'react'

import { Mods, classNames } from 'shared/lib/classNames/classNames'

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
  placeholderClassName?: string
  classNameInput?: string
}

export const Input = memo(
  ({
    className,
    value,
    onChange,
    type = 'text',
    placeholder = '>',
    autofocus,
    readonly,
    placeholderClassName,
    classNameInput
  }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0)

    const ref = useRef<HTMLInputElement>(null)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
      setCaretPosition(e.target.value.length)
    }

    const onBlur = () => {
      setIsFocused(false)
    }

    const onFocus = () => {
      setIsFocused(true)
    }

    const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
      setCaretPosition(e?.target?.selectionStart || 0)
    }

    useEffect(() => {
      if (autofocus && ref.current) {
        setIsFocused(true)
        ref.current.focus()
      }
    }, [autofocus])

    const mods: Mods = {
      [cls.readonly]: readonly
    }

    const isCaretVisible = isFocused && !readonly

    return (
      <div className={classNames(cls.InputWrapper, mods, [className])}>
        {placeholder && (
          <div
            className={classNames(cls.placeholder, {}, [placeholderClassName])}
          >{`${placeholder}>`}</div>
        )}

        <div className={cls.caretWrapper}>
          <input
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            onSelect={onSelect}
            className={classNames(cls.input, {}, [classNameInput])}
            type={type}
            value={value}
            onChange={onChangeHandler}
            readOnly={readonly}
          />
          {isCaretVisible && (
            <span
              style={{ left: `${caretPosition * 9}px` }}
              className={cls.caret}
            />
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'
