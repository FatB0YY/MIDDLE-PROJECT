import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

export function renderWirhRouter(component: ReactNode) {
  return <MemoryRouter initialEntries={['/']}>{component}</MemoryRouter>
}
