import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'shared/ui/Button'
import { counterActions } from '../model/slice/counterSlice'
import { getCounterValue } from '../model/selectors/getCounterValue'

const Counter = () => {
  const dispatch = useDispatch()
  const counterValue = useSelector(getCounterValue)

  const inc = () => {
    dispatch(counterActions.increment())
  }

  const dec = () => {
    dispatch(counterActions.decrement())
  }
  return (
    <div data-testid='value-title'>
      <h1>{counterValue}</h1>
      <Button data-testid='inc-btn' onClick={inc}>
        +
      </Button>
      <Button data-testid='dec-btn' onClick={dec}>
        -
      </Button>
    </div>
  )
}

export default Counter
