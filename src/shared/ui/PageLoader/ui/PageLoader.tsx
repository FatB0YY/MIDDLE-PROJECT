import React from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
/* eslint-disable */
import { Loader } from '@/shared/ui/Loader/index'
/* eslint-enable */

import cls from './PageLoader.module.scss'

interface PageLoaderProps {
  className?: string
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={classNames(cls.PageLoader, {}, [className])}>
    <Loader />
  </div>
)
