import React, { FC, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePageHeader.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Text } from 'shared/ui/Text'
import { useSelector } from 'react-redux'
import { getProfileState, profileActions } from 'essence/profile'
import { useActionCreatorsTyped } from 'shared/lib/store/hook'
import { updateProfileDataThunk } from 'essence/profile'

interface ProfilePageHeaderProps {
  className?: string
}

const actions = {
  ...profileActions,
  updateProfile: updateProfileDataThunk,
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({ className }) => {
  const { t } = useTranslation('profile')
  const { readonly } = useSelector(getProfileState)
  const actionsProfile = useActionCreatorsTyped(actions)

  const onEdit = useCallback(() => {
    actionsProfile.setReadonly(false)
  }, [actionsProfile])

  const onCancelEdit = useCallback(() => {
    actionsProfile.canselEdit()
  }, [actionsProfile])

  const onSave = useCallback(() => {
    actionsProfile.updateProfile().finally(() => {
      actionsProfile.setReadonly(true)
    })
  }, [actionsProfile])

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text className={cls.title} title={t('entities.profile.profilecard.title')} />
      {readonly ? (
        <Button onClick={onEdit} theme={ThemeButton.OUTLINE}>
          {t('entities.profile.profilecard.edit')}
        </Button>
      ) : (
        <>
          <Button className={cls.cancelBtn} onClick={onCancelEdit} theme={ThemeButton.OUTLINE_RED}>
            {t('entities.profile.profilecard.cancel')}
          </Button>
          <Button onClick={onSave} theme={ThemeButton.ACCENT}>
            {t('entities.profile.profilecard.save')}
          </Button>
        </>
      )}
    </div>
  )
}
