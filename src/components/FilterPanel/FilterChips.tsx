import { Group, Stack, Text, UnstyledButton } from '@mantine/core'
import { useFilter } from '@/hooks/useFilter'
import { BAND_COLORS } from '@/types'
import type { Attribute, BandColor } from '@/types'

function Chip({
  label,
  color,
  onRemove,
}: {
  label: string
  color: string
  onRemove: () => void
}) {
  return (
    <Group
      gap={4}
      style={{
        padding: '2px 8px',
        borderRadius: 12,
        backgroundColor: color,
        fontSize: 12,
      }}
    >
      <Text size="xs">{label}</Text>
      <UnstyledButton
        onClick={onRemove}
        style={{
          fontSize: 12,
          lineHeight: 1,
          color: 'rgba(0,0,0,0.5)',
          fontWeight: 700,
        }}
      >
        ×
      </UnstyledButton>
    </Group>
  )
}

export function FilterChips() {
  const { state, removeColor, removeAttribute } = useFilter()

  if (
    state.selectedColors.length === 0 &&
    state.selectedAttributes.length === 0
  ) {
    return null
  }

  return (
    <Stack gap={4}>
      {state.selectedColors.length > 0 && (
        <Group gap="xs" align="center">
          <Text size="xs" c="dimmed" style={{ flexShrink: 0 }}>
            色:
          </Text>
          {state.selectedColors.map((color: BandColor) => (
            <Chip
              key={color}
              label={color}
              color={BAND_COLORS[color]}
              onRemove={() => removeColor(color)}
            />
          ))}
        </Group>
      )}
      {state.selectedAttributes.length > 0 && (
        <Group gap="xs" align="center">
          <Text size="xs" c="dimmed" style={{ flexShrink: 0 }}>
            属性:
          </Text>
          {state.selectedAttributes.map((attr: Attribute) => (
            <Chip
              key={attr}
              label={attr}
              color="#DBEAFE"
              onRemove={() => removeAttribute(attr)}
            />
          ))}
        </Group>
      )}
    </Stack>
  )
}
