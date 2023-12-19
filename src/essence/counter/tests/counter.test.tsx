// import React from 'react'

// import { render, screen } from '@testing-library/react'

// import userEvent from '@testing-library/user-event'

// import { renderWithTranslation } from 'shared/config/tests/renderWithTranslation'
// import { renderWithRouter } from 'shared/config/tests/componentRender'

// import { StateSchema } from 'shared/lib/store/index'

// import { StoreProvider } from 'shared/lib/store/StateProvider'

// import Counter from '../ui/Counter'

// describe('Counter test component', () => {
//   test('Проверка рендера', () => {
//     const initialStateMock: DeepPartial<StateSchema> = {
//       counter: { value: 10 }
//     }

//     render(
//       renderWithRouter(
//         <StoreProvider initialState={initialStateMock as StateSchema}>
//           {renderWithTranslation(<Counter />)}
//         </StoreProvider>
//       )
//     )

//     expect(screen.getByTestId('value-title')).toBeInTheDocument()
//     expect(screen.getByTestId('value-title')).toHaveTextContent('10')
//   })

//   test('Проверка inc', () => {
//     const initialStateMock: DeepPartial<StateSchema> = {
//       counter: { value: 10 }
//     }

//     render(
//       renderWithRouter(
//         <StoreProvider initialState={initialStateMock as StateSchema}>
//           {renderWithTranslation(<Counter />)}
//         </StoreProvider>
//       )
//     )

//     userEvent.click(screen.getByTestId('inc-btn'))

//     expect(screen.getByTestId('value-title')).toHaveTextContent('11')
//   })

//   test('Проверка dec', () => {
//     const initialStateMock: DeepPartial<StateSchema> = {
//       counter: { value: 10 }
//     }

//     render(
//       renderWithRouter(
//         <StoreProvider initialState={initialStateMock as StateSchema}>
//           {renderWithTranslation(<Counter />)}
//         </StoreProvider>
//       )
//     )

//     userEvent.click(screen.getByTestId('dec-btn'))

//     expect(screen.getByTestId('value-title')).toHaveTextContent('9')
//   })
// })
