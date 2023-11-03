import React, { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './User.module.scss'

interface UserProps {
  className?: string
}

export const User: FC<UserProps> = ({ className }) => {
  return <div className={classNames(cls.User, {}, [className])}></div>
}
