import React from 'react'
import { render, screen } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  test('Проверка рендера кнопки', () => {
    render(<Button>Test</Button>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  test('Проверка кнопки с темой clear', () => {
    render(<Button theme='clear'>Test</Button>)
    expect(screen.getByText('Test')).toHaveClass('clear')
  })
})
