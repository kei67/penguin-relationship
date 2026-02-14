# 実装方針Step

## アーキテクチャ

### ディレクトリ構成

```
src/
├── main.tsx                    # エントリポイント（MantineProvider等のプロバイダ設定）
├── App.tsx                     # ルーティング / 画面切り替え
├── data/
│   ├── penguins.ts             # ペンギン個体データ
│   └── relationships.ts       # 関係性データ
├── types/
│   └── index.ts                # 型定義（Penguin, Relationship, BandColor 等）
├── lib/
│   └── filter.ts               # フィルタリングのコアロジック（純粋関数）
├── hooks/
│   └── useFilter.ts            # フィルタ状態の管理フック（Context消費 + ロジック呼び出し）
├── contexts/
│   └── FilterContext.tsx        # フィルタ条件の状態管理（Context + useReducer）
├── components/
│   ├── FilterPanel/
│   │   ├── FilterPanel.tsx      # フィルタ操作UI全体
│   │   ├── ColorSelector.tsx    # 色選択UI
│   │   └── FilterChips.tsx      # 適用中の条件チップ表示（色エリア / 属性エリア）
│   ├── PenguinList/
│   │   ├── PenguinList.tsx      # フィルタ結果のペンギンリスト
│   │   └── PenguinListItem.tsx  # リスト内の個体表示（名前 + バンド色）
│   └── PenguinDetail/
│       └── PenguinDetail.tsx    # 個体詳細 + 関係性グラフ（Cytoscape）
├── styles/
│   └── global.css
```

### 設計原則

- **UIコンポーネントにビジネスロジックを持ち込まない**
  - `lib/` に純粋関数としてコアロジックを配置（フィルタリング等）
  - `hooks/` でContextの消費とlib関数の呼び出しを橋渡し
  - コンポーネントはhooksから受け取ったデータと操作関数を表示・呼び出すだけ
- **データストアパターン（React標準機能）**
  - `contexts/FilterContext.tsx` で `useReducer` + `createContext` を使用
  - ユーザー操作 → dispatch → 状態変化 → 表示更新の単方向フロー
  - Reduxは使わない
- **データ層の分離**
  - `data/` に静的データを配置。将来的にAPI化する場合もここを差し替えるだけ
- **パスエイリアス**
  - `@/` → `src/` （設定済み）

### FilterContext の状態設計

```typescript
type FilterState = {
  selectedColors: BandColor[]   // 選択中のバンド色（AND条件）
  selectedAttributes: Attribute[] // 選択中の属性
}

type FilterAction =
  | { type: 'ADD_COLOR'; color: BandColor }
  | { type: 'REMOVE_COLOR'; color: BandColor }
  | { type: 'ADD_ATTRIBUTE'; attribute: Attribute }
  | { type: 'REMOVE_ATTRIBUTE'; attribute: Attribute }
  | { type: 'RESET' }
```

---

## 実装ステップ

### Step 1: 型定義 + データ層

**作業内容:**
1. `src/types/index.ts` を作成
   - `BandColor`, `Sex`, `Attribute`, `Penguin`, `RelationType`, `RelationDirection`, `Relationship` の型定義
   - `BAND_COLORS` 定数（色名→カラーコードのマッピング）
2. `src/data/penguins.ts` を作成
   - 仮データとして3〜5体のペンギンを定義（色の組み合わせが異なるもの）
3. `src/data/relationships.ts` を作成
   - 仮データとして2〜3件の関係性を定義
4. `pnpm format` を実行

**完了条件:** 型エラーなくビルドが通ること（`pnpm build`）

---

### Step 2: FilterContext + フィルタロジック

**作業内容:**
1. `src/contexts/FilterContext.tsx` を作成
   - `FilterState`, `FilterAction` の型定義
   - `filterReducer` を実装
   - `FilterProvider` と `useFilterContext` を export
2. `src/lib/filter.ts` を作成
   - `filterPenguins(penguins: Penguin[], state: FilterState): Penguin[]`
   - 色はAND条件：選択した色を全て持つ個体のみ返す
   - 属性も同様にAND条件（複数選択時）
   - 条件が空の場合は全件返す
3. `src/hooks/useFilter.ts` を作成
   - `useFilterContext` からstateとdispatchを取得
   - `filteredPenguins` を `useMemo` で算出
   - 操作関数（`addColor`, `removeColor`, `addAttribute`, `removeAttribute`, `reset`）を返す
4. `src/main.tsx` に `FilterProvider` を追加
5. `pnpm format` を実行

**完了条件:** ビルドが通ること（`pnpm build`）

---

### Step 3: 絞り込み画面（色の絞り込み + リスト表示）

**作業内容:**
1. `src/components/FilterPanel/ColorSelector.tsx` を作成
   - 10色のボタンを表示（`BAND_COLORS` から生成）
   - タップで `addColor` を呼び出し
   - 選択済みの色はハイライト表示
2. `src/components/FilterPanel/FilterChips.tsx` を作成
   - 色チップエリア：選択中の色をチップで表示、×ボタンで `removeColor`
   - 属性チップエリア：選択中の属性をチップで表示、×ボタンで `removeAttribute`
   - MantineのChipまたはBadgeコンポーネントを活用
3. `src/components/FilterPanel/FilterPanel.tsx` を作成
   - `ColorSelector` と `FilterChips` を組み合わせたパネル
4. `src/components/PenguinList/PenguinListItem.tsx` を作成
   - ペンギンの名前とバンド色を表示
5. `src/components/PenguinList/PenguinList.tsx` を作成
   - `useFilter` から `filteredPenguins` を取得して一覧表示
6. `src/App.tsx` を更新
   - 上部: `PenguinList`、下部: `FilterPanel` のレイアウト
7. `pnpm format` を実行

**🔍 確認ポイント: `pnpm dev` で動作確認**
- 色ボタンをタップ → チップに表示される
- チップの×で条件解除できる
- フィルタ結果がリストに反映される（AND条件）
- 条件なし → 全件表示

---

### Step 4: ペンギン詳細画面（Cytoscape.jsでグラフ表示）

**作業内容:**
1. `@types/cytoscape` をインストール（必要であれば）
2. `src/components/PenguinDetail/PenguinDetail.tsx` を作成
   - 選択されたペンギンの名前・性別・バンド色を表示
   - Cytoscape.jsで関係性グラフを描画
     - 主役ノード: 太い丸
     - 関係者ノード: 細めの丸
     - エッジ: 関係性の種類に応じたスタイル
   - `data/relationships.ts` から対象の関係性を抽出
3. `src/App.tsx` を更新
   - リストのペンギンをタップ → 詳細画面に遷移（useState で画面切り替え）
   - 詳細画面から戻るボタン
4. `pnpm format` を実行

**🔍 確認ポイント: `pnpm dev` で動作確認**
- リストからペンギンをタップ → 詳細画面に遷移
- グラフが表示され、関係性が線で繋がっている
- 戻るボタンで絞り込み画面に戻れる（フィルタ条件が保持されている）

---

## 注意事項

- 各ステップ完了時に `pnpm format` を実行すること
- コンポーネント内にフィルタリングや状態管理のロジックを直接書かないこと
- データは `src/data/` に集約し、コンポーネントから直接importしない（hooks経由で取得）
- 画面遷移はSPAなので `useState` でのシンプルな切り替えで十分（ルーターは不要）
