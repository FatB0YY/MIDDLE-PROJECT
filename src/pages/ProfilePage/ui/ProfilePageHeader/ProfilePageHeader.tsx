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
import { HStack } from 'shared/ui/Stack/HStack/HStack'

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
          <HStack gap='8'>
            <Button
              onClick={onCancelEdit}
              theme={ThemeButton.RED}
            >
              {t('entities.profile.profilecard.cancel')}
            </Button>
            <Button
              onClick={onSave}
              theme={ThemeButton.SUCCESS}
            >
              {t('entities.profile.profilecard.save')}
            </Button>
          </HStack>
        )
      }
    }

    return null
  }

  return (
    <HStack
      max={true}
      justify='between'
      className={classNames('', {}, [className])}
    >
      <Text title={t('entities.profile.profilecard.title')} />
      <div>{renderButtons()}</div>
    </HStack>
  )
}
