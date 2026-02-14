import { Box } from '@mantine/core'
import { useState } from 'react'
import { PenguinDetail } from '@/components/PenguinDetail/PenguinDetail'
import { FilterPanel } from '@/components/FilterPanel/FilterPanel'
import { PenguinList } from '@/components/PenguinList/PenguinList'
import type { Penguin } from '@/types'

function App() {
  const [selectedPenguin, setSelectedPenguin] = useState<Penguin | null>(null)

  if (selectedPenguin) {
    return (
      <PenguinDetail
        penguin={selectedPenguin}
        onBack={() => setSelectedPenguin(null)}
      />
    )
  }

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      {/* リストエリア（スクロール可能） */}
      <Box style={{ flex: 1, overflowY: 'auto' }}>
        <PenguinList onSelect={setSelectedPenguin} />
      </Box>
      {/* フィルタパネル（固定下部） */}
      <Box
        style={{
          borderTop: '1px solid #eee',
          backgroundColor: '#fafafa',
          flexShrink: 0,
        }}
      >
        <FilterPanel />
      </Box>
    </Box>
  )
}

export default App
