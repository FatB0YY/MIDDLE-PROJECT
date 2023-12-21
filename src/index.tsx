import React from 'react'

import 'shared/config/i18n/i18n'

import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

import App from 'app/App'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { StoreProvider } from 'shared/lib/store/StateProvider'

import 'react-toastify/scss/main.scss'
import 'app/styles/index.scss'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container не найден!')
}
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
          <ToastContainer
            position='top-right'
            autoClose={2000}
          />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
)

// const pagesMap = {
//   basic: "Basic",
//   formatting: "Formatting",
//   full: "Full",
// };

// type PageType = keyof typeof pagesMap;
