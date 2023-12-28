import React, { Suspense } from 'react'

import { PageError } from '@/widgets/PageError'

import type { ErrorInfo } from 'react'

interface IErrorBoundaryProps {
  children: React.ReactNode
}

interface IErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    const { hasError } = this.state
    // const { children } = this.props

    if (hasError) {
      return (
        <Suspense fallback={''}>
          <PageError />
        </Suspense>
      )
    }

    return this.props.children
  }
}

// export default withTranslation()(ErrorBoundary) языки в классовом компоненте
export default ErrorBoundary
