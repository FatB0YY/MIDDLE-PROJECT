import React, { useCallback, KeyboardEvent } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Input } from '@/shared/ui/Input'

import { Button } from '@/shared/ui/Button'

import { HStack } from '@/shared/ui/Stack'

import { classNames } from '@/shared/lib/classNames/classNames'

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useActionCreatorsTyped } from '@/shared/lib/store'

import {
  // getAddNewCommentError,
  // getAddNewCommentIsLoading,
  getAddNewCommentText
} from '../model/selectors/addNewCommentSelectors'
import {
  addNewCommentActions,
  addNewCommentReducer
} from '../model/slice/addNewCommentSlice'

import cls from './AddNewComment.module.scss'

export interface AddNewCommentProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addNewComment: addNewCommentReducer
}

const allActions = {
  ...addNewCommentActions
}

const AddNewComment = ({ className, onSendComment }: AddNewCommentProps) => {
  const { t } = useTranslation()
  const actionsAddNewComment = useActionCreatorsTyped(allActions)

  const text = useSelector(getAddNewCommentText)
  // const isLoading = useSelector(getAddNewCommentIsLoading)
  // const error = useSelector(getAddNewCommentError)

  const onCommentTextChange = useCallback(
    (value: string) => {
      actionsAddNewComment.setText(value)
    },
    [actionsAddNewComment.setText]
  )

  const onSendHandler = useCallback(() => {
    onSendComment(text || '')
    onCommentTextChange('')
  }, [text, onSendComment, onCommentTextChange])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!event.repeat) {
        if (event.key === 'Enter') {
          onSendHandler()
        }
      }
    },
    [onSendHandler]
  )

  return (
    <DynamicModuleLoader
      reducers={reducers}
      removeAfterUnmount={true}
    >
      <HStack
        gap='8'
        max
        justify='between'
        align='end'
        className={classNames(cls.AddNewComment, {}, [className])}
      >
        <Input
          value={text}
          onChange={onCommentTextChange}
          onKeyDown={handleKeyPress}
          placeholder={t('features.addnewcomment.placeholder')}
        />
        <Button
          onClick={onSendHandler}
          theme='success'
          className={cls.btn}
        >
          {t('features.addnewcomment.submit')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  )
}

export default AddNewComment
