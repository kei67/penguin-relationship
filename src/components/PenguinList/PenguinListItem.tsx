import { Group, Stack, Text, UnstyledButton } from '@mantine/core'
import { BAND_COLORS } from '@/types'
import type { Penguin } from '@/types'

type Props = {
  penguin: Penguin
  onClick: (penguin: Penguin) => void
}

export function PenguinListItem({ penguin, onClick }: Props) {
  return (
    <UnstyledButton
      onClick={() => onClick(penguin)}
      p="sm"
      style={{
        borderBottom: '1px solid #eee',
        width: '100%',
        textAlign: 'left',
      }}
    >
      <Stack gap={4}>
        <Group gap="xs">
          <Text fw={600}>{penguin.name}</Text>
          <Text size="xs" c="dimmed">
            {penguin.sex}
          </Text>
        </Group>
        <Group gap={4}>
          {penguin.bands.map((color) => (
            <span
              key={color}
              style={{
                display: 'inline-block',
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: BAND_COLORS[color],
                border: '1px solid rgba(0,0,0,0.15)',
              }}
              title={color}
            />
          ))}
        </Group>
      </Stack>
    </UnstyledButton>
  )
}
