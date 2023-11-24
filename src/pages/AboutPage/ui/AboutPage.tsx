import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page/ui/Page'

const AboutPage = () => {
  const { t } = useTranslation('about')

  return <Page>{t('pages.aboutpage')}</Page>
}

export default AboutPage
