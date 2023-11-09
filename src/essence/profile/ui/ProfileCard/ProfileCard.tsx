import React, { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import { useSelector } from 'react-redux'
import { getProfileState } from 'essence/profile/model/selectors/getProfileState'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'

interface ProfileCardProps {
  className?: string
}

export const ProfileCard: FC<ProfileCardProps> = ({ className }) => {
  const { t } = useTranslation('profile')
  const { data, error, isLoading, readonly } = useSelector(getProfileState)

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('entities.profile.profilecard.title')} />
        <Button theme={ThemeButton.OUTLINE}>{t('entities.profile.profilecard.edit')}</Button>
      </div>
      <div className={cls.data}>
        <Input value={data?.first} placeholder={t('entities.profile.profilecard.first')} className={cls.input} />
        <Input value={data?.lastname} placeholder={t('entities.profile.profilecard.lastname')} className={cls.input} />
      </div>
    </div>
  )
}
