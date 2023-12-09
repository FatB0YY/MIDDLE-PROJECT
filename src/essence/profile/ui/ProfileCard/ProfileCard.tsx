import React from 'react'

import { useTranslation } from 'react-i18next'

import { Mods, classNames } from 'shared/lib/classNames/classNames'
import { Text, TextTheme, TextAlign } from 'shared/ui/Text'
import { Input } from 'shared/ui/Input'
import { HStack, VStack } from 'shared/ui/Stack'
import { Loader } from 'shared/ui/Loader'
import { Avatar } from 'shared/ui/Avatar'
import { CurrencySelect, ECurrency } from 'essence/currency'

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
  readonly,
  onChangeFirstname,
  onChangeLastname,
  onChangeAge,
  onChangeCurrency
}: ProfileCardProps) => {
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <HStack
        justify='center'
        max
        className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
      >
        <Loader />
      </HStack>
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
          theme={TextTheme.ERROR}
          title={'Произошла ошибка при загрузке профиля'}
          text={'Попробуйте обновить страницу'}
          align={TextAlign.CENTER}
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
      />
      <Input
        onChange={onChangeLastname}
        readonly={readonly}
        value={data?.lastname}
        placeholder={t('entities.profile.profilecard.lastname')}
        className={cls.input}
      />
      <Input
        onChange={onChangeAge}
        readonly={readonly}
        value={data?.age}
        placeholder={t('entities.profile.profilecard.age')}
        className={cls.input}
      />

      <CurrencySelect
        readonly={readonly}
        onChange={onChangeCurrency}
        value={data?.currency}
      />
    </VStack>
  )
}
