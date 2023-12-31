import React from 'react'

import { useParams } from 'react-router-dom'

import { VStack } from '@/shared/ui/Stack'

import { classNames } from '@/shared/lib/classNames/classNames'
import { PageError } from '@/widgets/PageError'
import { Page } from '@/widgets/Page'
import { EditableProfileCard } from '@/features/EditableProfileCard'

import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
  className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <Page className={classNames(cls.ProfilePage, {}, [className])}>
        <PageError />
      </Page>
    )
  }

  return (
    <Page
      data-testid='ProfilePage'
      className={classNames(cls.ProfilePage, {}, [className])}
    >
      <VStack gap='16'>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  )
}

export default ProfilePage
