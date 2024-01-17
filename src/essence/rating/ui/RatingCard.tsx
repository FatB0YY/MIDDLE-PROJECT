import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserView, MobileView } from 'react-device-detect'

import { Card } from '@/shared/ui/Card'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Modal } from '@/shared/ui/Modal'
import { Input } from '@/shared/ui/Input'
import { StarRating } from '@/shared/ui/StarRating'
import { Text } from '@/shared/ui/Text'
import { Button } from '@/shared/ui/Button'
import { Drawer } from '@/shared/ui/Drawer'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './RatingCard.module.scss'

interface RatingCardProps {
  className?: string
  // заголовок
  title?: string
  // фидбэк заголовок (внутри модалки)
  feedbackTitle?: string
  // только выбрать звезды или еще и написать отзыв
  hasFeedback?: boolean
  // отменить отзыв
  onCancel?: (starsCount: number) => void
  // Отправить отзыв
  onAccept?: (starsCount: number, feedback?: string) => void
  // кол звезд, который выбрал пользователь
  rate?: number
}

export const RatingCard = ({
  className,
  feedbackTitle,
  hasFeedback,
  onAccept,
  onCancel,
  title,
  rate = 0
}: RatingCardProps) => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(rate)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = (selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)

    if (hasFeedback) {
      setIsModalOpen(true)
    } else {
      onAccept?.(selectedStarsCount)
    }

    setIsModalOpen(true)
  }

  const acceptHandle = () => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }

  const cancelHandle = () => {
    setIsModalOpen(false)
    onCancel?.(starsCount)
  }

  const modalContent = (
    <VStack
      gap='16'
      max
    >
      <Text title={feedbackTitle} />
      <Input
        value={feedback}
        onChange={setFeedback}
        placeholder={t('essence.rating.feedbackplaceholder')}
      />
      <HStack gap='16'>
        <Button
          onClick={cancelHandle}
          theme='red'
        >
          {t('essence.rating.cancel')}
        </Button>
        <Button
          onClick={acceptHandle}
          theme='success'
        >
          {t('essence.rating.success')}
        </Button>
      </HStack>
    </VStack>
  )

  return (
    <Card className={classNames(cls.RatingCard, {}, [className])}>
      <VStack
        align='center'
        gap='8'
      >
        <Text title={starsCount ? 'Спасибо за оценку!' : title} />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>

      <BrowserView>
        <Modal
          isOpen={isModalOpen}
          onClose={cancelHandle}
          lazy
        >
          {modalContent}
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer
          isOpen={isModalOpen}
          onClose={cancelHandle}
          lazy
        >
          {modalContent}
        </Drawer>
      </MobileView>
    </Card>
  )
}
