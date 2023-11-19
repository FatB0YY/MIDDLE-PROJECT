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
import { getUserAuthData } from 'essence/user'

interface ProfilePageHeaderProps {
  className?: string
  error: string | null
  isLoading: boolean
}

const actions = {
  ...profileActions,
  updateProfile: updateProfileDataThunk,
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({ className, error, isLoading }) => {
  const { t } = useTranslation('profile')
  const { readonly } = useSelector(getProfileState)
  const { authData } = useSelector(getUserAuthData)
  const { data } = useSelector(getProfileState)

  const actionsProfile = useActionCreatorsTyped(actions)

  const canEdit = authData?.id === data?.id

  const onEdit = useCallback(() => {
    actionsProfile.setReadonly(false)
  }, [actionsProfile.setReadonly])

  const onCancelEdit = useCallback(() => {
    actionsProfile.canselEdit()
  }, [actionsProfile.canselEdit])

  const onSave = useCallback(() => {
    actionsProfile.updateProfile().finally(() => {
      actionsProfile.setReadonly(true)
    })
  }, [actionsProfile.setReadonly])

  const renderButtons = () => {
    if (error || isLoading) {
      return null
    }

    if (canEdit) {
      if (readonly) {
        return (
          <Button onClick={onEdit} theme={ThemeButton.OUTLINE}>
            {t('entities.profile.profilecard.edit')}
          </Button>
        )
      }

      if (!readonly && !error && !isLoading) {
        return (
          <>
            <Button className={cls.cancelBtn} onClick={onCancelEdit} theme={ThemeButton.OUTLINE_RED}>
              {t('entities.profile.profilecard.cancel')}
            </Button>
            <Button onClick={onSave} theme={ThemeButton.ACCENT}>
              {t('entities.profile.profilecard.save')}
            </Button>
          </>
        )
      }
    }

    return null
  }

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text className={cls.title} title={t('entities.profile.profilecard.title')} />
      <div className={cls.btnsWrapper}>{renderButtons()}</div>
    </div>
  )
}
