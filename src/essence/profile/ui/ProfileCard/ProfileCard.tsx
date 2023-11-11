import React, { FC } from 'react'
import { Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import { useTranslation } from 'react-i18next'
import { Text, TextTheme } from 'shared/ui/Text'
import { Input } from 'shared/ui/Input'
import { IProfile } from '../../model/types/profile'
import { Loader } from 'shared/ui/Loader'
import { TextAlign } from 'shared/ui/Text'
import { Avatar } from 'shared/ui/Avatar'
import { CurrencySelect, ECurrency } from 'essence/currency'

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

export const ProfileCard: FC<ProfileCardProps> = ({
  className,
  data,
  error,
  isLoading,
  readonly,
  onChangeFirstname,
  onChangeLastname,
  onChangeAge,
  onChangeCurrency,
}) => {
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text title='Произошла ошибка' theme={TextTheme.ERROR} align={TextAlign.CENTER} />
      </div>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  }

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data?.avatar} alt={data?.username} />
          </div>
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

        <CurrencySelect readonly={readonly} onChange={onChangeCurrency} value={data?.currency} />
      </div>
    </div>
  )
}
