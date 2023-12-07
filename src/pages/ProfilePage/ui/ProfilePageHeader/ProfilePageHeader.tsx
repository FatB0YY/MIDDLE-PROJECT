import React, { useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { classNames } from 'shared/lib/classNames/classNames'

import { Button, ThemeButton } from 'shared/ui/Button'
import { Text } from 'shared/ui/Text'

import {
  getProfileState,
  profileActions,
  updateProfileDataThunk
} from 'essence/profile'
import { useActionCreatorsTyped } from 'shared/lib/store/hook'

import { getUserAuthData } from 'essence/user'

import cls from './ProfilePageHeader.module.scss'

interface ProfilePageHeaderProps {
  className?: string
  error: string | null
  isLoading: boolean
}

const actions = {
  ...profileActions,
  updateProfile: updateProfileDataThunk
}

export const ProfilePageHeader = ({
  className,
  error,
  isLoading
}: ProfilePageHeaderProps) => {
  const { t } = useTranslation('profile')
  const { readonly } = useSelector(getProfileState)
  const { authData } = useSelector(getUserAuthData)
  const { data } = useSelector(getProfileState)

  const actionsProfile = useActionCreatorsTyped(actions)

  const canEdit = authData?.id === data?.id

  /* eslint-disable */
  const onEdit = useCallback(() => {
    actionsProfile.setReadonly(false)
  }, [actionsProfile.setReadonly])

  const onCancelEdit = useCallback(() => {
    actionsProfile.cancelEdit()
  }, [actionsProfile.cancelEdit])

  const onSave = useCallback(() => {
    actionsProfile.updateProfile().finally(() => {
      actionsProfile.setReadonly(true)
    })
  }, [actionsProfile.setReadonly])
  /* eslint-enable */

  const renderButtons = () => {
    if (error || isLoading) {
      return null
    }

    if (canEdit) {
      if (readonly) {
        return (
          <Button
            onClick={onEdit}
            theme={ThemeButton.OUTLINE}
          >
            {t('entities.profile.profilecard.edit')}
          </Button>
        )
      }

      if (!readonly && !error && !isLoading) {
        return (
          <>
            <Button
              className={cls.cancelBtn}
              onClick={onCancelEdit}
              theme={ThemeButton.OUTLINE_RED}
            >
              {t('entities.profile.profilecard.cancel')}
            </Button>
            <Button
              onClick={onSave}
              theme={ThemeButton.ACCENT}
            >
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
      <Text
        className={cls.title}
        title={t('entities.profile.profilecard.title')}
      />
      <div className={cls.btnsWrapper}>{renderButtons()}</div>
    </div>
  )
}
