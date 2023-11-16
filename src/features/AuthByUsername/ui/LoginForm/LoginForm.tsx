import React, { FC, memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { getLoginState } from '../../model/selectors/getLoginState'
import { loginByUsernameThunk } from '../../model/services/loginByUsernameThunk'
import { useActionCreatorsTyped } from 'shared/lib/store'
import { Text, TextTheme } from 'shared/ui/Text'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

// чтобы не было на каждый рендер создание новой ссылки
const initialReducers: ReducersList = {
  loginForm: loginReducer,
}

const actions = {
  ...loginActions,
  loginByUsername: loginByUsernameThunk,
}

const LoginForm: FC<LoginFormProps> = memo(({ className, onSuccess }) => {
  // i18n
  const { t } = useTranslation()
  const actionsLogin = useActionCreatorsTyped(actions)
  // state redux
  const { password, username, error, isLoading } = useSelector(getLoginState)

  const onChangeUsername = useCallback(
    (value) => {
      actionsLogin.setUsername(value)
    },
    [actionsLogin]
  )

  const onChangePassword = useCallback(
    (value) => {
      actionsLogin.setPassword(value)
    },
    [actionsLogin]
  )

  const onLoginClick = useCallback(async () => {
    actionsLogin.loginByUsername({ username: username, password: password }).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess()
      }
    })
  }, [actionsLogin, onSuccess, username, password])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t('features.authbyusername.loginform.title')} />
        {error && <Text theme={TextTheme.ERROR} text={'Вы ввели неверный логин или пароль'} />}
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
          placeholder={t('features.authbyusername.loginform.placeholderPassword')}
          onChange={onChangePassword}
          value={password}
          placeholderClassName={cls.placeholderModalAuth}
        />

        <Button disabled={isLoading} onClick={onLoginClick} theme={ThemeButton.ACCENT}>
          {t('features.authbyusername.loginform.login')}
        </Button>
      </div>
    </DynamicModuleLoader>
  )
})

export default LoginForm
