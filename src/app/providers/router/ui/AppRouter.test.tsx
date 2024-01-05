import React from 'react'
import { screen } from '@testing-library/react'

import { componentRender } from '@/shared/config/tests/componentRender'
import {
  getRouteAdminpanel,
  getRouteMain,
  getRouteProfile
} from '@/shared/const/router'
import { UserRole } from '@/essence/user'

import AppRouter from './AppRouter'

describe('app/router/AppRouter', () => {
  test('Страница должна отрендериться', async () => {
    componentRender(<AppRouter />, {
      route: getRouteMain()
    })

    const page = await screen.findByTestId('MainPage')
    expect(page).toBeInTheDocument()
  })

  test('Страница не найдена', async () => {
    componentRender(<AppRouter />, {
      route: '/helloworld'
    })

    const page = await screen.findByTestId('NotFoundPage')
    expect(page).toBeInTheDocument()
  })

  test('Пользователь не авторизован. Проверка редиректа на главную', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1')
    })

    const page = await screen.findByTestId('MainPage')
    expect(page).toBeInTheDocument()
  })

  test('Пользователь авторизован. Проверка доступа к закрытой странице', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: {
          _initiated: true,
          authData: {
            id: '1'
          }
        }
      }
    })

    const page = await screen.findByTestId('ProfilePage')
    expect(page).toBeInTheDocument()
  })

  test('У пользователя отсутствует нужная роль для доступа к странице', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdminpanel(),
      initialState: {
        user: {
          _initiated: true,
          authData: {
            id: '1'
          }
        }
      }
    })

    const page = await screen.findByTestId('ForbiddenPage')
    expect(page).toBeInTheDocument()
  })

  test('У пользователя присутствует нужная роль для доступа к странице', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdminpanel(),
      initialState: {
        user: {
          _initiated: true,
          authData: {
            id: '1',
            roles: [UserRole.ADMIN]
          }
        }
      }
    })

    const page = await screen.findByTestId('AdminPanelPage')
    expect(page).toBeInTheDocument()
  })
})
