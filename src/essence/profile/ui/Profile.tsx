import React, { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Profile.module.scss'

interface ProfileProps {
  className?: string
}

export const Profile: FC<ProfileProps> = ({ className }) => {
  return <div className={classNames(cls.Profile, {}, [className])}></div>
}
