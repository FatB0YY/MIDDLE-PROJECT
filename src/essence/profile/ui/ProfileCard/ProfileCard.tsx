import React from 'react'

import { useTranslation } from 'react-i18next'

import { Text } from '@/shared/ui/Text'
import { Input } from '@/shared/ui/Input'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Avatar } from '@/shared/ui/Avatar'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { CurrencySelect, ECurrency } from '@/essence/currency'

import { IProfile } from '../../model/types/profile'

import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
  className?: string
  data: IProfile | null
  error: string | null
  isLoading?: boolean
  readonly?: boolean
  onChangeFirstname?: (value?: string) => void
  onChangeLastname?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeCurrency?: (currency?: ECurrency) => void
}

export const ProfileCard = ({
  className,
  data,
  error,
  isLoading,
  readonly = false,
  onChangeFirstname,
  onChangeLastname,
  onChangeAge,
  onChangeCurrency
}: ProfileCardProps) => {
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
      >
        <VStack
          gap='32'
          max
          align='center'
        >
          <Skeleton
            className={cls.skeleton}
            width={'64px'}
            height={64}
            border='100%'
          />
          <VStack
            max
            gap='16'
          >
            <Skeleton
              className={cls.skeleton}
              width={'120px'}
              height={24}
              border='5px'
            />
            <Skeleton
              className={cls.skeleton}
              width={'100%'}
              height={24}
              border='5px'
            />
          </VStack>
          <VStack
            max
            gap='16'
          >
            <Skeleton
              className={cls.skeleton}
              width={'120px'}
              height={24}
              border='5px'
            />
            <Skeleton
              className={cls.skeleton}
              width={'100%'}
              height={24}
              border='5px'
            />
          </VStack>
          <VStack
            max
            gap='16'
          >
            <Skeleton
              className={cls.skeleton}
              width={'120px'}
              height={24}
              border='5px'
            />
            <Skeleton
              className={cls.skeleton}
              width={'100%'}
              height={24}
              border='5px'
            />
          </VStack>
        </VStack>
      </div>
    )
  }

  if (error) {
    return (
      <HStack
        justify='center'
        max
        className={classNames(cls.ProfileCard, {}, [className, cls.error])}
      >
        <Text
          theme='error'
          title={'Произошла ошибка при загрузке профиля'}
          text={'Попробуйте обновить страницу'}
          align='center'
        />
      </HStack>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly
  }

  return (
    <VStack
      gap='16'
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack
          justify='center'
          max
          className={cls.avatarWrapper}
        >
          <Avatar
            size={64}
            src={data?.avatar}
            alt={data?.username}
          />
        </HStack>
      )}

      <Input
        onChange={onChangeFirstname}
        readonly={readonly}
        value={data?.first}
        placeholder={t('entities.profile.profilecard.first')}
        className={cls.input}
        data-testid='PC.first'
      />
      <Input
        onChange={onChangeLastname}
        readonly={readonly}
        value={data?.lastname}
        placeholder={t('entities.profile.profilecard.lastname')}
        className={cls.input}
        data-testid='PC.last'
      />
      <Input
        onChange={onChangeAge}
        readonly={readonly}
        value={data?.age}
        placeholder={t('entities.profile.profilecard.age')}
        className={cls.input}
      />

      <HStack
        max
        gap='8'
      >
        <Text
          title={t('entities.profile.profilecard.selectedcurrency')}
          size='s'
        />

        <CurrencySelect
          readonly={readonly}
          onChange={onChangeCurrency}
          value={data?.currency}
        />
      </HStack>
    </VStack>
  )
}
