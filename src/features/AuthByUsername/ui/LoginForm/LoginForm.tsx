import React, { FC, memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'
import { loginActions } from '../../model/slice/loginSlice'
import { getLoginState } from '../../model/selectors/getLoginState'
import { loginByUsernameThunk } from '../../model/services/loginByUsernameThunk'
import { useActionCreators, useAppDispatch, useStateSelector } from 'shared/lib/store'
import { Text, TextTheme } from 'shared/ui/Text'

interface LoginFormProps {
  className?: string
}

export const LoginForm: FC<LoginFormProps> = memo(({ className }) => {
  // i18n
  const { t } = useTranslation()
  // dispatch
  let actionsLogin = useActionCreators({ ...loginActions, loginByUsernameThunk })
  // state redux
  const { password, username, error, isLoading } = useStateSelector(getLoginState)

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

  const onLoginClick = useCallback(() => {
    actionsLogin.loginByUsernameThunk({ username: username, password: password })
  }, [actionsLogin, username, password])

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('features.authbyusername.loginform.title')} />
      {error && <Text theme={TextTheme.ERROR} text={'Вы ввели неверный логин или пароль'} />}
      <Input
        autofocus={true}
        type='text'
        className={cls.input}
        placeholder={t('features.authbyusername.loginform.placeholderEmail')}
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        type='password'
        className={cls.input}
        placeholder={t('features.authbyusername.loginform.placeholderPassword')}
        onChange={onChangePassword}
        value={password}
      />

      <Button disabled={isLoading} onClick={onLoginClick} theme={ThemeButton.OUTLINE}>
        {t('features.authbyusername.loginform.login')}
      </Button>
    </div>
  )
})
