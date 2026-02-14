import { Box, Group, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import cytoscape from 'cytoscape'
import { useEffect, useRef } from 'react'
import { penguins } from '@/data/penguins'
import { relationships } from '@/data/relationships'
import { BAND_COLORS } from '@/types'
import type { Penguin } from '@/types'

type Props = {
  penguin: Penguin
  onBack: () => void
}

export function PenguinDetail({ penguin, onBack }: Props) {
  const cyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cyRef.current) return

    const relatedRels = relationships.filter(
      (r) => r.source === penguin.id || r.target === penguin.id
    )

    const relatedPenguinIds = new Set<string>()
    for (const r of relatedRels) {
      if (r.source !== penguin.id) relatedPenguinIds.add(r.source)
      if (r.target !== penguin.id) relatedPenguinIds.add(r.target)
    }

    const relatedPenguins = penguins.filter((p) => relatedPenguinIds.has(p.id))

    const elements: cytoscape.ElementDefinition[] = [
      { data: { id: penguin.id, label: penguin.name, isMain: 1 } },
      ...relatedPenguins.map((p) => ({
        data: { id: p.id, label: p.name, isMain: 0 },
      })),
      ...relatedRels.map((r) => ({
        data: {
          id: `${r.source}-${r.target}`,
          source: r.source,
          target: r.target,
          label: r.type,
        },
      })),
    ]

    const cy = cytoscape({
      container: cyRef.current,
      elements,
      style: [
        {
          selector: 'node[isMain > 0]',
          style: {
            'background-color': '#4CAF50',
            'border-width': 4,
            'border-color': '#2E7D32',
            label: 'data(label)',
            'text-valign': 'bottom',
            'text-margin-y': 8,
            'font-size': '14px',
            width: 60,
            height: 60,
          },
        },
        {
          selector: 'node[isMain < 1]',
          style: {
            'background-color': '#90CAF9',
            'border-width': 2,
            'border-color': '#1565C0',
            label: 'data(label)',
            'text-valign': 'bottom',
            'text-margin-y': 8,
            'font-size': '12px',
            width: 40,
            height: 40,
          },
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': '#9E9E9E',
            label: 'data(label)',
            'font-size': '10px',
            'text-rotation': 'autorotate',
            'text-background-color': '#fff',
            'text-background-opacity': 0.8,
            'text-background-padding': '2px',
          },
        },
      ],
      layout: { name: 'cose' },
    })

    return () => {
      cy.destroy()
    }
  }, [penguin.id])

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
      {/* ヘッダー */}
      <Group p="sm" style={{ borderBottom: '1px solid #eee' }}>
        <UnstyledButton onClick={onBack} style={{ fontSize: 20 }}>
          ←
        </UnstyledButton>
        <Title order={3}>{penguin.name}</Title>
      </Group>

      {/* グラフ */}
      <Box ref={cyRef} style={{ flex: 1 }} />

      {/* ペンギン情報 */}
      <Stack
        gap="xs"
        p="md"
        style={{ borderTop: '1px solid #eee', backgroundColor: '#fafafa' }}
      >
        <Group gap="xs">
          <Text size="sm" c="dimmed">
            性別:
          </Text>
          <Text size="sm">{penguin.sex}</Text>
        </Group>
        <Group gap="xs">
          <Text size="sm" c="dimmed">
            バンド色:
          </Text>
          <Group gap={4}>
            {penguin.bands.map((color) => (
              <Group key={color} gap={4}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: BAND_COLORS[color],
                    border: '1px solid rgba(0,0,0,0.15)',
                  }}
                />
                <Text size="sm">{color}</Text>
              </Group>
            ))}
          </Group>
        </Group>
      </Stack>
    </Box>
  )
}
