import { Divider, Stack, Text } from '@mantine/core'
import { ColorSelector } from './ColorSelector'
import { FilterChips } from './FilterChips'

export function FilterPanel() {
  return (
    <Stack gap="sm" p="md">
      <FilterChips />
      <Divider />
      <Text size="sm" fw={600}>
        色で絞り込み
      </Text>
      <ColorSelector />
    </Stack>
  )
}
