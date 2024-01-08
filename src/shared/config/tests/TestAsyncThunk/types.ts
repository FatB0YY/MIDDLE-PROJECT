/* eslint-disable */

interface Interceptor {
  use: jest.Mock<
    (
      onFulfilled?: (value: any) => any | Promise<any>,
      onRejected?: (error: any) => any
    ) => number
  >
  eject: jest.Mock<(index: number) => void>
  clear: jest.Mock<() => void>
}

export interface Interceptors {
  request: Interceptor
  response: Interceptor
}

export interface InterceptorsStack {
  onFulfilled?(value: any): any | Promise<any>
  onRejected?(error: any): any
}
