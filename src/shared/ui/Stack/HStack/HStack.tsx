import React from 'react'

import { Flex, FlexProps } from '../Flex/Flex'

// исключаем direction
type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = (props: HStackProps) => {
  return (
    <Flex
      direction='row'
      {...props}
    />
  )
}
