import React, { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { Text } from '@/shared/ui/Text'

import { VStack } from '@/shared/ui/Stack'
import { Icon } from '@/shared/ui/Icon'

import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useActionCreatorsTyped } from '@/shared/lib/store'
import { classNames } from '@/shared/lib/classNames/classNames'
import CloseIcon from '@/shared/assets/icons/close.svg'

import { loginByUsernameThunk } from '../../model/services/loginByUsernameThunk'
import { getLoginState } from '../../model/selectors/getLoginState'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'

import cls from './LoginForm.module.scss'

export interface LoginFormProps {
  className?: string
  onClose: () => void
}

// чтобы не было на каждый рендер создание новой ссылки
const initialReducers: ReducersList = {
  loginForm: loginReducer
}

const actions = {
  ...loginActions,
  loginByUsername: loginByUsernameThunk
}

const LoginForm = memo(({ className, onClose }: LoginFormProps) => {
  // i18n
  const { t } = useTranslation()
  const actionsLogin = useActionCreatorsTyped(actions)
  // state redux
  const { password, username, error, isLoading } = useSelector(getLoginState)

  const onChangeUsername = useCallback(
    (value: string) => {
      actionsLogin.setUsername(value)
    },
    [actionsLogin.setUsername] // eslint-disable-line
  )

  const onChangePassword = useCallback(
    (value: string) => {
      actionsLogin.setPassword(value)
    },
    [actionsLogin.setPassword] // eslint-disable-line
  )

  const onLoginClick = useCallback(async () => {
    actionsLogin
      .loginByUsername({ username: username, password: password })
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          onClose()
        }
      })
  }, [actionsLogin.loginByUsername, username, password, onClose]) // eslint-disable-line

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <VStack
        gap='16'
        className={classNames(cls.LoginForm, {}, [className])}
      >
        <Button
          onClick={onClose}
          className={cls.closebtn}
          theme='icon_outline'
        >
          <Icon Svg={CloseIcon} />
        </Button>

        <Text
          size='m'
          title={t('features.authbyusername.loginform.title')}
        />
        {error && (
          <Text
            theme='error'
            text={'Вы ввели неверный логин или пароль'}
          />
        )}
        <Input
          isAutoFocus={true}
          type='text'
          placeholder={t('features.authbyusername.loginform.placeholderEmail')}
          onChange={onChangeUsername}
          value={username}
        />
        <Input
          type='password'
          placeholder={t(
            'features.authbyusername.loginform.placeholderPassword'
          )}
          onChange={onChangePassword}
          value={password}
        />

        <Button
          disabled={isLoading}
          onClick={onLoginClick}
          theme='success'
        >
          {t('features.authbyusername.loginform.login')}
        </Button>
      </VStack>
    </DynamicModuleLoader>
  )
})

LoginForm.displayName = 'LoginForm'
export default LoginForm
