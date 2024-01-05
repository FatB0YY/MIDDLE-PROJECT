import React from 'react'

import { Page } from '@/widgets/Page'

const ForbiddenPage = () => {
  const text = 'у вас нет прав'

  return <Page data-testid='ForbiddenPage'>{text}</Page>
}

export default ForbiddenPage
