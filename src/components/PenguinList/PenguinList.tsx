import { Stack, Text } from '@mantine/core'
import { useFilter } from '@/hooks/useFilter'
import type { Penguin } from '@/types'
import { PenguinListItem } from './PenguinListItem'

type Props = {
  onSelect: (penguin: Penguin) => void
}

export function PenguinList({ onSelect }: Props) {
  const { filteredPenguins } = useFilter()

  if (filteredPenguins.length === 0) {
    return (
      <Text c="dimmed" ta="center" p="md" size="sm">
        条件に該当するペンギンがいません
      </Text>
    )
  }

  return (
    <Stack gap={0}>
      {filteredPenguins.map((penguin) => (
        <PenguinListItem
          key={penguin.id}
          penguin={penguin}
          onClick={onSelect}
        />
      ))}
    </Stack>
  )
}
