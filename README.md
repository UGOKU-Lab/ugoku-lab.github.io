# ugoku-lab.github.io
UGOKU-Labのホームぺージ

## 編集ガイド (Editing Guide)

このプロジェクトは、初心者でも編集しやすいようにCSSの設計ルールを定めています。
新しいページを作成したり、既存のページを編集したりする際は、以下のルールに従ってください。

### 1. CSSユーティリティクラスの活用
レイアウトや余白の調整には、`styles/main.css` に定義されているユーティリティクラスを使用してください。
インラインスタイル（`style="..."`）の使用は極力避けてください。

**よく使うクラス:**
- **レイアウト**:
  - `.display-flex`: Flexboxを有効化
  - `.flex-center`: 中央揃え (上下左右)
  - `.flex-between`: 両端揃え
  - `.flex-start`: 上端揃え (Flexboxのアイテムを上に寄せる)
  - `.text-center`: テキスト中央揃え
- **余白 (Spacing)**:
  - `.gap-small` (10px), `.gap-medium` (20px), `.gap-large` (50px): 要素間の隙間
  - `.margin-bottom-small`, `.margin-bottom-medium`: 下方向の余白
- **コンポーネント**:
  - `.btn`, `.orange-button`: オレンジ色のボタン
  - `.btn-outline`, `.doc-button`: 白背景・黒枠のボタン
  - `.alert-box`: お知らせ用のアラートボックス
- **画像**:
  - `.img-responsive`: 親要素に合わせてリサイズ
  - `.width-full`: 幅を100%にする

### 2. 色の指定
色は直接カラーコード（`#f0641e`など）を書かず、CSS変数を使用してください。
- `var(--primary-color)`: ブランドカラー (オレンジ)
- `var(--text-main)`: 基本テキスト色
- `var(--bg-light)`: 薄い背景色

### 3. 新しいスタイルの追加
新しいスタイルが必要な場合は、`styles/main.css` に追記してください。
その際、既存の変数やユーティリティクラスで代用できないか検討してください。

---
## 開発環境
- 推奨エディタ: VS Code
- プレビュー: Live Server拡張機能などを使用すると便利です。
