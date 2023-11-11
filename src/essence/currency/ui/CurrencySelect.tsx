import React, { FC, memo, useCallback, useMemo } from 'react'

import { Select } from 'shared/ui/Select'
import { ECurrency } from '../model/types/currency'
import { useTranslation } from 'react-i18next'

interface CurrencySelectProps {
  className?: string
  value?: ECurrency
  onChange?: (value: ECurrency) => void
  readonly?: boolean
}

const options = [
  { value: ECurrency.RUB, content: ECurrency.RUB },
  { value: ECurrency.USD, content: ECurrency.USD },
  { value: ECurrency.EUR, content: ECurrency.EUR },
]

export const CurrencySelect: FC<CurrencySelectProps> = memo(({ className, value, onChange, readonly }) => {
  const { t } = useTranslation()

  const onChangeHandler = useCallback((value?: string) => {
    onChange?.(value as ECurrency)
  }, [])

  return (
    <Select
      readonly={readonly}
      label={t('entities.CurrencySelect.label')}
      options={options}
      onChange={onChangeHandler}
      value={value}
    />
  )
})
