import React, { memo, useCallback } from 'react'

// import { useTranslation } from 'react-i18next'

// import { Select } from 'shared/ui/Select'
import { Listbox } from 'shared/ui/Listbox/Listbox'

import { ECurrency } from '../model/types/currency'

interface CurrencySelectProps {
  className?: string
  value?: ECurrency
  onChange?: (value: ECurrency) => void
  readonly?: boolean
}

const options = [
  { value: ECurrency.RUB, content: ECurrency.RUB, unavailable: false },
  { value: ECurrency.USD, content: ECurrency.USD, unavailable: false },
  { value: ECurrency.EUR, content: ECurrency.EUR, unavailable: false }
]

export const CurrencySelect = memo(
  ({ value, onChange, readonly }: CurrencySelectProps) => {
    // const { t } = useTranslation()

    const onChangeHandler = useCallback(
      (value?: string) => {
        onChange?.(value as ECurrency)
      },
      [onChange]
    )

    return (
      <Listbox
        readonly={readonly}
        // label={t('entities.CurrencySelect.label')}
        onChange={onChangeHandler}
        value={value}
        items={options}
      />
    )
  }
)

CurrencySelect.displayName = 'CurrencySelect'
