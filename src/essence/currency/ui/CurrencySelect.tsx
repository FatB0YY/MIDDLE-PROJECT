import React, { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { Select } from 'shared/ui/Select'

import { ECurrency } from '../model/types/currency'

interface CurrencySelectProps {
  className?: string
  value?: ECurrency
  onChange?: (value: ECurrency) => void
  readonly?: boolean
}

const options = [
  { value: ECurrency.RUB, content: ECurrency.RUB },
  { value: ECurrency.USD, content: ECurrency.USD },
  { value: ECurrency.EUR, content: ECurrency.EUR }
]

export const CurrencySelect = memo(
  ({ value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation()

    const onChangeHandler = useCallback(
      (value?: string) => {
        onChange?.(value as ECurrency)
      },
      [onChange]
    )

    return (
      <Select
        readonly={readonly}
        label={t('entities.CurrencySelect.label')}
        options={options}
        onChange={onChangeHandler}
        value={value}
      />
    )
  }
)

CurrencySelect.displayName = 'CurrencySelect'
