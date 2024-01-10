import React from 'react'

import { Page } from '@/widgets/Page'

import { classNames } from '../../../lib/classNames/classNames'
import { Loader } from '../../../ui/Loader'

import cls from './PageLoader.module.scss'

interface PageLoaderProps {
  className?: string
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <Page className={classNames(cls.PageLoader, {}, [className])}>
    <Loader />
  </Page>
)
