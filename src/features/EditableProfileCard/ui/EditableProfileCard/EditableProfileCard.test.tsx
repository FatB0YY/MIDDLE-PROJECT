import React from 'react'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'

import { componentRender } from 'shared/config/tests/componentRender'
import { IProfile } from 'essence/profile'
import { Country } from 'shared/const/other'
import { ECurrency } from 'essence/currency'
import { $api } from 'shared/api/api'

import { profileReducer } from '../../model/slice/profileSlice'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'

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
      form: profile,
      isLoading: false,
      error: undefined
    },
    user: {
      authData: {
        id: '1',
        username: 'admin'
      }
    }
  },
  asyncReducers: { profile: profileReducer }
}

describe('featires/EditableProfileCardHeader.test', () => {
  test('Переключение ридонли режима false', async () => {
    componentRender(<EditableProfileCardHeader />, options)

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.Edit'))

    expect(
      screen.getByTestId('EditableProfileCardHeader.Save')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('EditableProfileCardHeader.Cancel')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('EditableProfileCardHeader.Edit')
    ).not.toBeInTheDocument()
  })

  test('Изменение', async () => {
    componentRender(<EditableProfileCard id='1' />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCard.Header.Edit'))

    const firstInput = screen.getByTestId('EditableProfileCard.Card.first')
    const lastInput = screen.getByTestId('EditableProfileCard.Card.last')
    await userEvent.clear(firstInput)
    await userEvent.type(firstInput, 'name')
    await userEvent.clear(lastInput)
    await userEvent.type(lastInput, 'name')

    expect(firstInput).toHaveValue('name')
    expect(lastInput).toHaveValue('name')
  })

  test('cancel button', async () => {
    componentRender(<EditableProfileCard id='1' />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCard.Header.Edit'))

    await userEvent.clear(screen.getByTestId('EditableProfileCard.Card.first'))
    await userEvent.type(
      screen.getByTestId('EditableProfileCard.Card.last'),
      'type'
    )

    await userEvent.click(
      screen.getByTestId('EditableProfileCard.Header.Cancel')
    )

    expect(
      screen.queryByTestId('EditableProfileCard.Header.Save')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('EditableProfileCard.Header.Cancel')
    ).not.toBeInTheDocument()

    expect(screen.getByTestId('EditableProfileCard.Card.first')).toHaveValue(
      'admin'
    )
    expect(screen.getByTestId('EditableProfileCard.Card.last')).toHaveValue(
      'admin'
    )
  })

  test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
    const mockPutReq = jest.spyOn($api, 'put')
    componentRender(<EditableProfileCard id='1' />, options)
    await userEvent.click(screen.getByTestId('EditableProfileCard.Header.Edit'))

    await userEvent.type(
      screen.getByTestId('EditableProfileCard.Card.first'),
      'user'
    )

    await userEvent.click(screen.getByTestId('EditableProfileCard.Header.Save'))

    expect(mockPutReq).toHaveBeenCalled()
  })
})
