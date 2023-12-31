import React from 'react'
import { render, screen } from '@testing-library/react'

import { Button, ThemeButton } from './Button'

describe('Button', () => {
  test('Проверка рендера кнопки', () => {
    render(<Button>Test</Button>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  test('Проверка кнопки с темой clear', () => {
    render(<Button theme={ThemeButton.CLEAR}>Test</Button>)
    expect(screen.getByText('Test')).toHaveClass('clear')
  })
})
