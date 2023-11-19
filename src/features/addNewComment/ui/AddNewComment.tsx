import React, { FC, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AddNewComment.module.scss'
import { Input } from 'shared/ui/Input'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import {
  getAddNewCommentError,
  getAddNewCommentIsLoading,
  getAddNewCommentText,
} from '../model/selectors/addNewCommentSelectors'
import { addNewCommentActions, addNewCommentReducer } from '../model/slice/addNewCommentSlice'
import { useActionCreatorsTyped } from 'shared/lib/store'

export interface AddNewCommentProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addNewComment: addNewCommentReducer,
}

const allActions = {
  ...addNewCommentActions,
}

const AddNewComment: FC<AddNewCommentProps> = ({ className, onSendComment }) => {
  const { t } = useTranslation()
  const actionsAddNewComment = useActionCreatorsTyped(allActions)

  const text = useSelector(getAddNewCommentText)
  const isLoading = useSelector(getAddNewCommentIsLoading)
  const error = useSelector(getAddNewCommentError)

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

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
      <div className={classNames(cls.AddNewComment, {}, [className])}>
        <Input
          placeholderClassName={cls.input}
          classNameInput={cls.placeholder}
          value={text}
          onChange={onCommentTextChange}
          placeholder={t('features.addnewcomment.placeholder')}
        />
        <Button onClick={onSendHandler} theme={ThemeButton.ACCENT}>
          {t('features.addnewcomment.submit')}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
}

export default AddNewComment
