import React from 'react'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'

import { componentRender } from '@/shared/config/tests/componentRender'
import { IProfile } from '@/essence/profile'
import { Country } from '@/shared/const/other'
import { ECurrency } from '@/essence/currency'
import { $api } from '@/shared/api/api'

import { profileReducer } from '../../model/slice/profileSlice'

import { EditableProfileCard } from './EditableProfileCard'

const profile: IProfile = {
  age: 45,
  lastname: 'admin',
  username: 'admin',
  avatar: '',
  first: 'admin',
  city: 'eded',
  country: Country.ARMENIA,
  currency: ECurrency.EUR,
  id: '1'
}

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile
    },
    user: {
      authData: { id: '1', username: 'admin' }
    }
  },
  asyncReducers: {
    profile: profileReducer
  }
}

describe('features/EditableProfileCard', () => {
  test('Режим рид онли должен переключиться', async () => {
    componentRender(<EditableProfileCard id='1' />, options)

    await userEvent.click(screen.getByTestId('EPCH.Edit'))

    expect(screen.getByTestId('EPCH.Save')).toBeInTheDocument()
    expect(screen.getByTestId('EPCH.Cancel')).toBeInTheDocument()
    expect(screen.queryByTestId('EPCH.Edit')).not.toBeInTheDocument()
  })

  test('Изменение', async () => {
    componentRender(<EditableProfileCard id='1' />, options)
    await userEvent.click(screen.getByTestId('EPCH.Edit'))

    const firstInput = screen.getByTestId('PC.first')
    const lastInput = screen.getByTestId('PC.last')
    await userEvent.clear(firstInput)
    await userEvent.type(firstInput, 'name')
    await userEvent.clear(lastInput)
    await userEvent.type(lastInput, 'name')

    expect(firstInput).toHaveValue('name')
    expect(lastInput).toHaveValue('name')
  })

  test('При отмене значения должны обнуляться', async () => {
    componentRender(<EditableProfileCard id='1' />, options)

    await userEvent.click(screen.getByTestId('EPCH.Edit'))

    await userEvent.clear(screen.getByTestId('PC.first'))
    await userEvent.clear(screen.getByTestId('PC.last'))

    await userEvent.type(screen.getByTestId('PC.first'), 'user')
    await userEvent.type(screen.getByTestId('PC.last'), 'user')

    expect(screen.getByTestId('PC.first')).toHaveValue('user')
    expect(screen.getByTestId('PC.last')).toHaveValue('user')

    await userEvent.click(screen.getByTestId('EPCH.Cancel'))

    expect(screen.getByTestId('PC.first')).toHaveValue('admin')
    expect(screen.getByTestId('PC.last')).toHaveValue('admin')
  })

  test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
    const mockPutReq = jest.spyOn($api, 'put')
    componentRender(<EditableProfileCard id='1' />, options)
    await userEvent.click(screen.getByTestId('EPCH.Edit'))

    await userEvent.type(screen.getByTestId('PC.first'), 'user')

    await userEvent.click(screen.getByTestId('EPCH.Save'))

    expect(mockPutReq).toHaveBeenCalled()
  })
})
