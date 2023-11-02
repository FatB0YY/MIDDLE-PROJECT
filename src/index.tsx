import App from 'app/App'
import 'shared/config/i18n/i18n'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { StoreProvider } from 'app/providers/StoreProvider'
import 'app/styles/index.scss'

render(
  <StoreProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StoreProvider>,

  document.getElementById('root')
)

// const pagesMap = {
//   basic: "Basic",
//   formatting: "Formatting",
//   full: "Full",
// };

// type PageType = keyof typeof pagesMap;
