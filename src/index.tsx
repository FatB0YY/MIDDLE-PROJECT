import React from 'react'

import 'shared/config/i18n/i18n'
/* eslint-disable */
import { render } from 'react-dom'
/* eslint-enable */

import { BrowserRouter } from 'react-router-dom'

import App from 'app/App'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { StoreProvider } from 'shared/lib/store/StateProvider'
import 'app/styles/index.scss'

render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// const pagesMap = {
//   basic: "Basic",
//   formatting: "Formatting",
//   full: "Full",
// };

// type PageType = keyof typeof pagesMap;
