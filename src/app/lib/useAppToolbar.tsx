import React, { ReactElement } from 'react'

import { AppRoutes } from '@/shared/const/router'
import { ScrollToolbar } from '@/widgets/ScrollToolbar'
import { useRouteChange } from '@/shared/lib/hooks/useRouteChange/useRouteChange'

export function useAppToolbar() {
  const appRoute = useRouteChange()

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLES_DETAILS]: <ScrollToolbar />
  }

  return toolbarByAppRoute[appRoute]
}
