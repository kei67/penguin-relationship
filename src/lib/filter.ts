import type { Attribute, BandColor, Penguin } from '@/types'

type FilterState = {
  selectedColors: BandColor[]
  selectedAttributes: Attribute[]
}

export function filterPenguins(
  penguins: Penguin[],
  state: FilterState
): Penguin[] {
  return penguins.filter((penguin) => {
    if (state.selectedColors.length > 0) {
      const hasAllColors = state.selectedColors.every((color) =>
        penguin.bands.includes(color)
      )
      if (!hasAllColors) return false
    }
    if (state.selectedAttributes.length > 0) {
      const hasAllAttributes = state.selectedAttributes.every((attr) =>
        penguin.attributes.includes(attr)
      )
      if (!hasAllAttributes) return false
    }
    return true
  })
}
