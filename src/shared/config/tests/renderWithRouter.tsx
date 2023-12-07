import React, { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

export function renderWithRouter(component: ReactNode) {
  return <MemoryRouter initialEntries={['/']}>{component}</MemoryRouter>
}
