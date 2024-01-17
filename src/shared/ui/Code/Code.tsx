import React, { memo, useCallback } from 'react'

import { Button } from '../../ui/Button/index'
import CopyIcon from '../../assets/icons/copy-20-20.svg'
import { classNames } from '../../lib/classNames/classNames'

import cls from './Code.module.scss'

interface CodeProps {
  className?: string
  text: string
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props

  // копирование в буфер
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={cls.copyBtn}
        theme='clear'
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  )
})

Code.displayName = 'Code'
