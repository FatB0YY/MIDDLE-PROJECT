import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/Modal'
import { Text } from '@/shared/ui/Text'
import { useAppDispatch } from '@/shared/lib/store'
import { getUserJsonSettings, saveJsonSettings } from '@/essence/user'

import cls from './ArticlePageGreeting.module.scss'

interface ArticlePageGreetingProps {
  className?: string
}

export const ArticlePageGreeting = ({
  className
}: ArticlePageGreetingProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { isArticlesPageHasOpen } = useSelector(getUserJsonSettings)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isArticlesPageHasOpen) {
      setIsOpen(true)
      dispatch(saveJsonSettings({ isArticlesPageHasOpen: true }))
    }
  }, [dispatch, isArticlesPageHasOpen])

  const onClose = () => setIsOpen(false)

  return (
    <Modal
      lazy
      onClose={onClose}
      isOpen={isOpen}
      className={classNames(cls.ArticlePageGreeting, {}, [className])}
    >
      <Text
        title={t('features.articlepagegreeting.title')}
        text={t('features.articlepagegreeting.text')}
      />
    </Modal>
  )
}
