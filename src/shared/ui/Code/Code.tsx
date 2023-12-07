import React, { memo, useCallback } from 'react'

import { classNames } from 'shared/lib/classNames/classNames'
/* eslint-disable */
import { Button, ThemeButton } from 'shared/ui/Button/index'
/* eslint-enable */

import CopyIcon from 'shared/assets/icons/copy-20-20.svg'

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
        theme={ThemeButton.CLEAR}
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  )
})

Code.displayName = 'Code'
