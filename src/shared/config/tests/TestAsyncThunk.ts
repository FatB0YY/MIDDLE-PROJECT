import { StateSchema } from 'shared/lib/store'
import { AsyncThunkAction } from '@reduxjs/toolkit'
import axios, { AxiosStatic } from 'axios'

type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

jest.mock('axios')

// для ts, глубокий мок
const mockedAxios = jest.mocked(axios, { shallow: false })

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>[]
  getState: () => StateSchema
  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>
  api: jest.MockedFunctionDeep<AxiosStatic>
  navigate: jest.MockedFn<any>

  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>, state?: DeepPartial<StateSchema>) {
    this.actionCreator = actionCreator
    this.dispatch = []
    this.getState = jest.fn(() => state as StateSchema)
    this.api = mockedAxios
    this.navigate = jest.fn()
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg)
    await action(this.dispatchMock, this.getState, { api: this.api, navigate: this.navigate })

    return this.dispatch
  }

  // Вместо того, чтобы напрямую использовать jest.fn(), мы используем отдельную функцию dispatchMock,
  // чтобы добавлять каждый вызов в массив this.dispatch
  // я это сделал, чтобы мы могли более подробно тестировать каждый вызов dispatch внутри теста
  private dispatchMock = jest.fn((action: any) => {
    this.dispatch.push(action)
    return action
  })
}

// чтобы получать массива типа такого:
// [
//   {
//     type: 'profile/fetchProfileDataThunk/pending',
//     payload: undefined,
//     meta: {
//       arg: '1',
//       requestId: 'y57qcnQScdeM0IFiZ6baa',
//       requestStatus: 'pending',
//     },
//   },
//   {
//     type: 'profile/fetchProfileDataThunk/fulfilled',
//     payload: {
//       first: 'r5fft',
//       lastname: 'Smith',
//       age: 244,
//       currency: 'USD',
//       country: 'Armenia',
//       city: 'Moscow',
//       username: 'admin213',
//       avatar: 'https://yt3.ggpht.com/ytc/AAUvwngFzM_Rf6MNwOnFcuphoj93k7VFjlIrj-kSMxbh=s900-c-k-c0x00ffffff-no-rj',
//       id: '1',
//     },
//     meta: {
//       arg: '1',
//       requestId: 'y57qcnQScdeM0IFiZ6baa',
//       requestStatus: 'fulfilled',
//     },
//   },
// ]
