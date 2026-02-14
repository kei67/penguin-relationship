import type { Relationship } from '@/types'

export const relationships: Relationship[] = [
  {
    source: 'p1',
    target: 'p2',
    type: '夫婦orカップル',
    direction: 'both',
    description: '仲良しのカップル。いつも一緒にいる。',
  },
  {
    source: 'p2',
    target: 'p5',
    type: '親子',
    direction: 'none',
  },
  {
    source: 'p3',
    target: 'p4',
    type: '友達',
    direction: 'both',
    description: 'よく一緒に日向ぼっこしている。',
  },
]
