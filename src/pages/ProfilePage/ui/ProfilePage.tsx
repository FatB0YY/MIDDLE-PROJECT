import React, { useCallback, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import { classNames } from 'shared/lib/classNames/classNames'

import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import {
  ProfileCard,
  profileActions,
  profileReducer,
  getProfileState
} from 'essence/profile'
import { fetchProfileDataThunk } from 'features/AuthByUsername'
import { useActionCreatorsTyped } from 'shared/lib/store/hook'
import { ECurrency } from 'essence/currency'
import { VStack } from 'shared/ui/Stack/VStack/VStack'
import { PageError } from 'widgets/PageError'
import { Page } from 'widgets/Page/Page'

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
  className?: string
}

const initialReducers: ReducersList = {
  profile: profileReducer
}

const actions = {
  ...profileActions,
  fetchProfile: fetchProfileDataThunk
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const actionsProfile = useActionCreatorsTyped(actions)
  const { error, isLoading, readonly, form } = useSelector(getProfileState)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id && __PROJECT__ !== 'sb') {
      actionsProfile.fetchProfile(id)
    }
  }, [actionsProfile.fetchProfile, id])

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

  if (!id) {
    return (
      <Page className={classNames(cls.ProfilePage, {}, [className])}>
        <PageError />
      </Page>
    )
  }

  return (
    <DynamicModuleLoader
      reducers={initialReducers}
      removeAfterUnmount={true}
    >
      <Page className={classNames(cls.ProfilePage, {}, [className])}>
        <VStack gap='16'>
          <ProfilePageHeader
            error={error}
            isLoading={isLoading}
          />

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
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
