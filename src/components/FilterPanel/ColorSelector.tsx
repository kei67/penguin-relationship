import { Group, UnstyledButton } from '@mantine/core'
import { useFilter } from '@/hooks/useFilter'
import { BAND_COLORS } from '@/types'
import type { BandColor } from '@/types'

export function ColorSelector() {
  const { state, addColor, removeColor } = useFilter()

  const handleClick = (color: BandColor) => {
    if (state.selectedColors.includes(color)) {
      removeColor(color)
    } else {
      addColor(color)
    }
  }

  return (
    <Group gap="xs" wrap="wrap">
      {(Object.entries(BAND_COLORS) as [BandColor, string][]).map(
        ([color, hex]) => {
          const isSelected = state.selectedColors.includes(color)
          return (
            <UnstyledButton
              key={color}
              onClick={() => handleClick(color)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 20,
                border: `2px solid ${hex}`,
                backgroundColor: isSelected ? hex : 'transparent',
                color: isSelected ? '#fff' : 'inherit',
                fontSize: 13,
                fontWeight: isSelected ? 700 : 400,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: hex,
                  border: '1px solid rgba(0,0,0,0.15)',
                  flexShrink: 0,
                }}
              />
              {color}
            </UnstyledButton>
          )
        }
      )}
    </Group>
  )
}
