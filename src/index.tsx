import React from 'react'

import '@/shared/config/i18n/i18n'

import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

import App from '@/app/App'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { ErrorBoundary } from '@/app/providers/ErrorBoundary'
import { StoreProvider } from '@/shared/lib/store/StateProvider'

import 'react-toastify/scss/main.scss'
import '@/app/styles/index.scss'

// import reportWebVitals from "../config/jest/jestEmptyComponent";

const container = document.getElementById('root')

if (!container) {
  throw new Error(
    'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение'
  )
}

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
            <ToastContainer
              position='top-right'
              autoClose={1000}
            />
          </ThemeProvider>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// reportWebVitals();

// const pagesMap = {
//   basic: "Basic",
//   formatting: "Formatting",
//   full: "Full",
// };

// type PageType = keyof typeof pagesMap;

export { Theme } from '@/shared/const/theme'
