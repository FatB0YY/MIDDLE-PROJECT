import React, { FC, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { ProfileCard, profileActions, profileReducer } from 'essence/profile'
import { fetchProfileDataThunk } from 'features/AuthByUsername'
import { useActionCreators, useActionCreatorsTyped, useAppDispatch } from 'shared/lib/store/hook'

interface ProfilePageProps {
  className?: string
}

const initialReducers: ReducersList = {
  profile: profileReducer,
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
  const actionsProfile = useActionCreatorsTyped(profileActions)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfileDataThunk())
  }, [actionsProfile])

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        <ProfileCard />
      </div>
    </DynamicModuleLoader>
  )
}

export default ProfilePage
