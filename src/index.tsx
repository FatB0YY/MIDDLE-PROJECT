import { render } from 'react-dom'
import App from 'app/App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import 'shared/config/i18n/i18n'

render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

// const pagesMap = {
//   basic: "Basic",
//   formatting: "Formatting",
//   full: "Full",
// };

// type PageType = keyof typeof pagesMap;
