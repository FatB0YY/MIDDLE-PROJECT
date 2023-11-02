import { renderWithTranslation } from 'shared/config/tests/renderWithTranslation'
import { renderWirhRouter } from 'shared/config/tests/renderWithRouter'

import { Counter } from '../index'
import { StoreProvider } from 'app/providers/StoreProvider'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Counter test component', () => {
  test('Проверка рендера', () => {
    const initialStateMock = { counter: { value: 10 } }
    render(
      <StoreProvider initialState={initialStateMock}>
        {renderWirhRouter(renderWithTranslation(<Counter />))}
      </StoreProvider>
    )

    expect(screen.getByTestId('value-title')).toBeInTheDocument()
    expect(screen.getByTestId('value-title')).toHaveTextContent('10')
  })

  test('Проверка inc', () => {
    const initialStateMock = { counter: { value: 10 } }
    render(
      <StoreProvider initialState={initialStateMock}>
        {renderWirhRouter(renderWithTranslation(<Counter />))}
      </StoreProvider>
    )

    userEvent.click(screen.getByTestId('inc-btn'))

    expect(screen.getByTestId('value-title')).toHaveTextContent('11')
  })

  test('Проверка dec', () => {
    const initialStateMock = { counter: { value: 10 } }
    render(
      <StoreProvider initialState={initialStateMock}>
        {renderWirhRouter(renderWithTranslation(<Counter />))}
      </StoreProvider>
    )

    userEvent.click(screen.getByTestId('dec-btn'))

    expect(screen.getByTestId('value-title')).toHaveTextContent('9')
  })
})
