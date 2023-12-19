import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ProfileCard } from 'essence/profile'
import { classNames } from 'shared/lib/classNames/classNames'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { ECurrency } from 'essence/currency'

import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'

import { profileActions, profileReducer } from '../../model/slice/profileSlice'
import { fetchProfileDataThunk } from '../../model/services/fetchProfileDataThunk'
import { getProfileState } from '../../model/selectors/getProfileState'

import cls from './EditableProfileCard.module.scss'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'

interface EditableProfileCardProps {
  className?: string
  id: string
}

const actions = {
  ...profileActions,
  fetchProfile: fetchProfileDataThunk
}

const initialReducers: ReducersList = {
  profile: profileReducer
}

export const EditableProfileCard = ({
  className,
  id
}: EditableProfileCardProps) => {
  const actionsProfile = useActionCreatorsTyped(actions)
  const { error, isLoading, readonly, form } = useSelector(getProfileState)

  useEffect(() => {
    if (__PROJECT__ !== 'sb' && __PROJECT__ !== 'jest') {
      if (id) {
        actionsProfile.fetchProfile(id)
      }
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
      actionsProfile.updateProfile({ age: Number(value || 0) })
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
    <DynamicModuleLoader
      reducers={initialReducers}
      removeAfterUnmount={true}
    >
      <div className={classNames(cls.EditableProfileCard, {}, [className])}>
        <EditableProfileCardHeader data-testid='EditableProfileCard.Header' />
        <ProfileCard
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCurrency={onChangeCurrency}
          data={form}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          data-testid='EditableProfileCard.Card'
        />
      </div>
    </DynamicModuleLoader>
  )
}
