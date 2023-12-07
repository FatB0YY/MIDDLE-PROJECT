import React, { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { classNames } from 'shared/lib/classNames/classNames'

import { Button, ThemeButton } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'

import { useActionCreatorsTyped } from 'shared/lib/store'
import { Text, TextTheme } from 'shared/ui/Text'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'

import { loginByUsernameThunk } from '../../model/services/loginByUsernameThunk'
import { getLoginState } from '../../model/selectors/getLoginState'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'

import cls from './LoginForm.module.scss'

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

// чтобы не было на каждый рендер создание новой ссылки
const initialReducers: ReducersList = {
  loginForm: loginReducer
}

const actions = {
  ...loginActions,
  loginByUsername: loginByUsernameThunk
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  // i18n
  const { t } = useTranslation()
  const actionsLogin = useActionCreatorsTyped(actions)
  // state redux
  const { password, username, error, isLoading } = useSelector(getLoginState)

  const onChangeUsername = useCallback(
    (value) => {
      actionsLogin.setUsername(value)
    },
    [actionsLogin.setUsername] // eslint-disable-line
  )

  const onChangePassword = useCallback(
    (value) => {
      actionsLogin.setPassword(value)
    },
    [actionsLogin.setPassword] // eslint-disable-line
  )

  const onLoginClick = useCallback(async () => {
    actionsLogin
      .loginByUsername({ username: username, password: password })
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          onSuccess()
        }
      })
  }, [actionsLogin.loginByUsername, username, password, onSuccess]) // eslint-disable-line

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('features.authbyusername.loginform.title')} />
        {error && (
          <Text
            theme={TextTheme.ERROR}
            text={'Вы ввели неверный логин или пароль'}
          />
        )}
        <Input
          autofocus={true}
          type='text'
          classNameInput={cls.inputModalAuth}
          placeholder={t('features.authbyusername.loginform.placeholderEmail')}
          onChange={onChangeUsername}
          value={username}
          placeholderClassName={cls.placeholderModalAuth}
        />
        <Input
          type='password'
          classNameInput={cls.inputModalAuth}
          placeholder={t(
            'features.authbyusername.loginform.placeholderPassword'
          )}
          onChange={onChangePassword}
          value={password}
          placeholderClassName={cls.placeholderModalAuth}
        />

        <Button
          disabled={isLoading}
          onClick={onLoginClick}
          theme={ThemeButton.ACCENT}
        >
          {t('features.authbyusername.loginform.login')}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
})

LoginForm.displayName = 'LoginForm'
export default LoginForm
