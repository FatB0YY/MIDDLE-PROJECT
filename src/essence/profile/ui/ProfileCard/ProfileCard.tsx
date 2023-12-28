import React from 'react'

import { useTranslation } from 'react-i18next'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextTheme, TextAlign, TextSize } from '@/shared/ui/Text'
import { Input } from '@/shared/ui/Input'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { Avatar } from '@/shared/ui/Avatar'
import { CurrencySelect, ECurrency } from '@/essence/currency'
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher'
import { LangSwitcher } from '@/widgets/LangSwitcher'

import { IProfile } from '../../model/types/profile'

import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
  className?: string
  data: IProfile | null
  error: string | null
  isLoading?: boolean
  readonly?: boolean
  'data-testid'?: string
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
  'data-testid': dataTestId = 'ProfileCard',
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
        >
          <VStack
            max
            gap='8'
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
            gap='8'
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
            gap='8'
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
        data-testid={`${dataTestId}.first`}
      />
      <Input
        onChange={onChangeLastname}
        readonly={readonly}
        value={data?.lastname}
        placeholder={t('entities.profile.profilecard.lastname')}
        className={cls.input}
        data-testid={`${dataTestId}.last`}
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
          size={TextSize.S}
        />

        <CurrencySelect
          readonly={readonly}
          onChange={onChangeCurrency}
          value={data?.currency}
        />
      </HStack>

      <div className={cls.line}></div>

      <HStack
        max
        gap='8'
      >
        <Text
          title={t('entities.profile.profilecard.theme')}
          size={TextSize.S}
        />
        <ThemeSwitcher />
      </HStack>

      <HStack
        max
        gap='8'
      >
        <Text
          title={t('entities.profile.profilecard.selectedlang')}
          size={TextSize.S}
        />
        <LangSwitcher className={cls.lang} />
      </HStack>
    </VStack>
  )
}
