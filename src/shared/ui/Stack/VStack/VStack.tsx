import React from 'react'

import { Flex, FlexProps } from '../Flex/Flex'

// исключаем direction
type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = (props: VStackProps) => {
  const { align = 'start' } = props

  return (
    <Flex
      direction='column'
      align={align}
      {...props}
    />
  )
}
