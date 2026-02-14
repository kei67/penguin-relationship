import type { Penguin } from '@/types'

export const penguins: Penguin[] = [
  {
    id: 'p1',
    name: 'こうめ',
    sex: 'メス',
    bands: ['黄色', '青'],
    description:
      'おっとりした性格で、人懐っこい。餌の時間になると一番前に来る。',
    attributes: ['白ポチ族', 'グルメ'],
  },
  {
    id: 'p2',
    name: 'そら',
    sex: 'オス',
    bands: ['青', '紫'],
    description: 'アクティブで好奇心旺盛。水中を勢いよく泳ぎ回る。',
    attributes: ['バインバイン族', 'おしゃべり'],
  },
  {
    id: 'p3',
    name: 'もも',
    sex: 'メス',
    bands: ['ピンク', '黄色'],
    description: '甘えんぼで餌が大好き。飼育員さんにすり寄るのが得意。',
    attributes: ['グルメ', 'カメラ付き'],
  },
  {
    id: 'p4',
    name: 'ゆき',
    sex: 'オス',
    bands: ['白', '緑'],
    description: '温泉好きで半身浴をよくしている。のんびり屋さん。',
    attributes: ['半身浴族'],
  },
  {
    id: 'p5',
    name: 'たいよう',
    sex: 'オス',
    bands: ['赤', '黄色', '青'],
    description: 'パワフルで群れのリーダー的存在。声も大きい。',
    attributes: ['バインバイン族', 'おしゃべり'],
  },
]
