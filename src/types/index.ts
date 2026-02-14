// リストバンドの色（位置情報は持たない）
export const BAND_COLORS = {
  黄色: '#FFD700',
  ピンク: '#FF69B4',
  紫: '#8A2BE2',
  黄緑: '#ADFF2F',
  青: '#1E90FF',
  赤: '#FF4444',
  白: '#F5F5F5',
  緑: '#228B22',
  茶色: '#8B4513',
  薄茶色: '#D2B48C',
} as const

export type BandColor = keyof typeof BAND_COLORS

export type Sex = 'オス' | 'メス'

export type Attribute =
  | '白ポチ族'
  | 'バインバイン族'
  | '半身浴族'
  | 'カメラ付き'
  | 'グルメ'
  | 'おしゃべり'

export type Penguin = {
  id: string
  name: string
  sex: Sex
  bands: BandColor[] // 最大4本
  description: string
  attributes: Attribute[]
}

export type RelationType =
  | '夫婦orカップル'
  | '破局or失恋'
  | '浮気or友達以上'
  | '友達'
  | '元友達or不仲'
  | '親子'

export type RelationDirection = 'one' | 'both' | 'none'

export type Relationship = {
  source: string // ペンギンID
  target: string // ペンギンID
  type: RelationType
  direction: RelationDirection
  description?: string
}
