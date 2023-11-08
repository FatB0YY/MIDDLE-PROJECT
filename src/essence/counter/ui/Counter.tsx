import React from 'react'
import { Button } from 'shared/ui/Button'
import { counterActions } from '../model/slice/counterSlice'
import { getCounterValue } from '../model/selectors/getCounterValue'
import { useActionCreators } from 'shared/lib/store'
import { useSelector } from 'react-redux'

const Counter = () => {
  const actionsCounter = useActionCreators(counterActions)
  const counterValue = useSelector(getCounterValue)

  const inc = () => {
    actionsCounter.increment()
  }

  const dec = () => {
    actionsCounter.decrement()
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
