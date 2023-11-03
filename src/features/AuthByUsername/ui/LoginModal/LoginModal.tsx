import React, { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginModal.module.scss'
import { Modal } from 'shared/ui/Modal'
import { LoginForm } from '../LoginForm/LoginForm'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = ({
  className,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      lazy
      isOpen={isOpen}
      onClose={onClose}
      className={classNames(cls.LoginModal, {}, [className])}
    >
      <LoginForm />
    </Modal>
  )
}
