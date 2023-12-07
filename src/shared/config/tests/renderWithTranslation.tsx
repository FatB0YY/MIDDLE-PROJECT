import React, { ReactNode } from 'react'

import { I18nextProvider } from 'react-i18next'

/* eslint-disable */
import i18nForTests from 'shared/config/i18n/i18nForTests'
/* eslint-enable */

export function renderWithTranslation(component: ReactNode) {
  return <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
}
