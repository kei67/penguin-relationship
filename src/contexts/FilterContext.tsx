import { createContext, useContext, useReducer } from 'react'
import type { Attribute, BandColor } from '@/types'

export type FilterState = {
  selectedColors: BandColor[]
  selectedAttributes: Attribute[]
}

export type FilterAction =
  | { type: 'ADD_COLOR'; color: BandColor }
  | { type: 'REMOVE_COLOR'; color: BandColor }
  | { type: 'ADD_ATTRIBUTE'; attribute: Attribute }
  | { type: 'REMOVE_ATTRIBUTE'; attribute: Attribute }
  | { type: 'RESET' }

const initialState: FilterState = {
  selectedColors: [],
  selectedAttributes: [],
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'ADD_COLOR':
      if (state.selectedColors.includes(action.color)) return state
      return {
        ...state,
        selectedColors: [...state.selectedColors, action.color],
      }
    case 'REMOVE_COLOR':
      return {
        ...state,
        selectedColors: state.selectedColors.filter((c) => c !== action.color),
      }
    case 'ADD_ATTRIBUTE':
      if (state.selectedAttributes.includes(action.attribute)) return state
      return {
        ...state,
        selectedAttributes: [...state.selectedAttributes, action.attribute],
      }
    case 'REMOVE_ATTRIBUTE':
      return {
        ...state,
        selectedAttributes: state.selectedAttributes.filter(
          (a) => a !== action.attribute
        ),
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

type FilterContextType = {
  state: FilterState
  dispatch: React.Dispatch<FilterAction>
}

const FilterContext = createContext<FilterContextType | null>(null)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(filterReducer, initialState)
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilterContext() {
  const ctx = useContext(FilterContext)
  if (!ctx)
    throw new Error('useFilterContext must be used within FilterProvider')
  return ctx
}
