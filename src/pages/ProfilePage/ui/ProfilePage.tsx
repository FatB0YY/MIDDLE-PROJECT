import React, { FC, useCallback, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { ProfileCard, profileActions, profileReducer, getProfileState } from 'essence/profile'
import { fetchProfileDataThunk } from 'features/AuthByUsername'
import { useActionCreatorsTyped } from 'shared/lib/store/hook'
import { useSelector } from 'react-redux'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { ECurrency } from 'essence/currency'

interface ProfilePageProps {
  className?: string
}

const initialReducers: ReducersList = {
  profile: profileReducer,
}

const actions = {
  ...profileActions,
  fetchProfile: fetchProfileDataThunk,
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const actionsProfile = useActionCreatorsTyped(actions)
  const { error, isLoading, readonly, form } = useSelector(getProfileState)

  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      actionsProfile.fetchProfile()
    }
  }, [actionsProfile.fetchProfile])

  // для каждого поля формы своя ф-ция, тк может быть доп логика, валидация итд
  const onChangeFirstname = useCallback(
    (value?: string) => {
      actionsProfile.updateProfile({ first: value || '' })
    },
    [actionsProfile.updateProfile]
  )

  const onChangeLastname = useCallback(
    (value?: string) => {
      actionsProfile.updateProfile({ lastname: value || '' })
    },
    [actionsProfile.updateProfile]
  )

  const onChangeAge = useCallback(
    (value?: string) => {
      if (/^\d+$/.test(value!)) {
        actionsProfile.updateProfile({ age: Number(value || 0) })
      }
    },
    [actionsProfile.updateProfile]
  )

  const onChangeCurrency = useCallback(
    (currency?: ECurrency) => {
      actionsProfile.updateProfile({ currency: currency || ECurrency.RUB })
    },
    [actionsProfile.updateProfile]
  )

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        <ProfilePageHeader error={error} isLoading={isLoading} />
        <ProfileCard
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCurrency={onChangeCurrency}
          data={form}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
