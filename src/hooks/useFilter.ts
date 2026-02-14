import { useMemo } from 'react'
import { useFilterContext } from '@/contexts/FilterContext'
import { penguins } from '@/data/penguins'
import { filterPenguins } from '@/lib/filter'
import type { Attribute, BandColor } from '@/types'

export function useFilter() {
  const { state, dispatch } = useFilterContext()

  const filteredPenguins = useMemo(
    () => filterPenguins(penguins, state),
    [state]
  )

  const addColor = (color: BandColor) => dispatch({ type: 'ADD_COLOR', color })
  const removeColor = (color: BandColor) =>
    dispatch({ type: 'REMOVE_COLOR', color })
  const addAttribute = (attribute: Attribute) =>
    dispatch({ type: 'ADD_ATTRIBUTE', attribute })
  const removeAttribute = (attribute: Attribute) =>
    dispatch({ type: 'REMOVE_ATTRIBUTE', attribute })
  const reset = () => dispatch({ type: 'RESET' })

  return {
    state,
    filteredPenguins,
    addColor,
    removeColor,
    addAttribute,
    removeAttribute,
    reset,
  }
}
