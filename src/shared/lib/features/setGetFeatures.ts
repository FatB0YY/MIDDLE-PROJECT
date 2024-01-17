import { FeatureFlags } from '../../types/featureFlags'

// ФИЧИ В ХОДЕ СЕССИИ НЕ МЕНЯЮТСЯ!!!
let featureFlags: FeatureFlags = {}

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags[flag]
}
