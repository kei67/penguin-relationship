import { MantineProvider } from '@mantine/core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { FilterProvider } from '@/contexts/FilterContext'
import '@mantine/core/styles.css'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </MantineProvider>
  </StrictMode>
)
