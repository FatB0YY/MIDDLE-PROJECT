import React, {
  FC,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange'
>

interface InputProps extends HTMLInputProps {
  className?: string
  type?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  autofocus?: boolean
}

export const Input: FC<InputProps> = memo(
  ({
    className,
    value,
    onChange,
    type = 'text',
    placeholder = '>',
    autofocus,
    ...otherProps
  }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0)

    const ref = useRef<HTMLInputElement>()

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

    const onSelect = (e: any) => {
      setCaretPosition(e?.target?.selectionStart || 0)
    }

    useEffect(() => {
      if (autofocus) {
        setIsFocused(true)
        ref.current.focus()
      }
    }, [autofocus])

    return (
      <div className={classNames(cls.InputWrapper, {}, [className])}>
        {placeholder && (
          <div className={cls.placeholder}>{`${placeholder}>`}</div>
        )}

        <div className={cls.caretWrapper}>
          <input
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
            onSelect={onSelect}
            className={cls.input}
            type={type}
            value={value}
            onChange={onChangeHandler}
            // {...otherProps}
          />
          {isFocused && (
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
