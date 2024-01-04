import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { Button, ThemeButton } from '@/shared/ui/Button'

import { Text } from '@/shared/ui/Text'

import { HStack } from '@/shared/ui/Stack'

import { classNames } from '@/shared/lib/classNames/classNames'

import { useActionCreatorsTyped } from '@/shared/lib/store/hook'
import { getUserAuthData } from '@/essence/user'

import { ValidateProfileError } from '@/essence/profile'

import { profileActions } from '../../model/slice/profileSlice'
import { updateProfileDataThunk } from '../../model/services/updateProfileDataThunk'
import { getProfileState } from '../../model/selectors/getProfileState'

interface EditableProfileCardHeaderProps {
  className?: string
}

const actions = {
  ...profileActions,
  updateProfile: updateProfileDataThunk
}

export const EditableProfileCardHeader = ({
  className
}: EditableProfileCardHeaderProps) => {
  const { error, isLoading } = useSelector(getProfileState)
  const { t } = useTranslation('profile')
  const { readonly } = useSelector(getProfileState)
  const { authData } = useSelector(getUserAuthData)
  const { data } = useSelector(getProfileState)

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
    [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileError.INCORRECT_CURRENCY]: t('Некорректная валюта')
  }

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
    actionsProfile
      .updateProfile()
      .unwrap()
      .then((result) => {
        toast.success('Удачно')
      })
      .catch((errors: ValidateProfileError[]) => {
        if (errors.length) {
          errors.forEach((error: ValidateProfileError) => {
            toast.error(validateErrorTranslates[error])
          })
        }
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
            data-testid='EPCH.Edit'
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
              data-testid='EPCH.Cancel'
            >
              {t('entities.profile.profilecard.cancel')}
            </Button>
            <Button
              onClick={onSave}
              theme={ThemeButton.SUCCESS}
              data-testid='EPCH.Save'
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
