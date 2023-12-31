import React, { Suspense } from 'react'

import { Modal } from '@/shared/ui/Modal'

import { Loader } from '@/shared/ui/Loader'

import { classNames } from '@/shared/lib/classNames/classNames'

import { LoginFormAsync } from '../LoginForm/LoginForm.async'

import cls from './LoginModal.module.scss'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  return (
    <Modal
      lazy
      isOpen={isOpen}
      onClose={onClose}
      className={classNames(cls.LoginModal, {}, [className])}
    >
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onClose={onClose} />
      </Suspense>
    </Modal>
  )
}
