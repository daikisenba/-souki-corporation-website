# このディレクトリは自動生成です（直接編集しないでください）

コラム記事（`*.md`）は **souki-company リポジトリ（private）が唯一の正** であり、
このディレクトリはそこから同期された**生成物**です。

## 記事を修正・追加したいとき

**ここのファイルを直接編集しないでください。** 次のデプロイ時に上書きされ、変更は失われます。

正しい手順:

1. `souki-company` の `marketing/articles/<slug>.md` を修正する
2. PRを作成し、**main へマージする（＝公開承認）**
3. GitHub Actions が自動で変換し、このディレクトリへ反映 → サイトが自動デプロイされる

## 公開までの流れ

```
souki-company (private)              -souki-corporation-website (public)
marketing/articles/<slug>.md
   │
   │  main へマージ ＝ ★唯一の人間による公開承認★
   ▼
 GitHub Actions（scripts/publish_columns.py で変換）
   │  一方向・自動
   ▼
                                     content/columns/<slug>.md  ← ここ（生成物）
                                        ▼ 自動デプロイ
```

## 変換で行っていること

- 本文先頭の `# H1` を除去（サイトは front matter の `title` を `<h1>` として描画するため、重複防止）
- JSON-LD を front matter の `jsonLd` へ移動（本文に残すとページ上にコードブロックとして表示され、構造化データとしても機能しないため）
- 編集用メモ「タイトル案」を除去
- `keywords` を配列からカンマ区切り文字列へ、`slug` / `status` は除去、`author` を付与

## 例外

`zensyocho-shikaku-annai.md` は、この同期の仕組みを作る前にこのリポジトリで直接
作成された記事です。souki-company 側に原稿がないため、当面はこのディレクトリで
管理します（将来 souki-company へ移管予定）。

## リダイレクト履歴

- `njss-takai-erabikata`（2026-07-11公開）は `njss-alternative-pricing`
  （2026-07-18公開、一次情報で裏取り済み）と検索意図が重複していたため、
  2026-07-23 に統合。記事は削除し、`next.config.js` の `redirects()` で
  301リダイレクトを設定してURLの評価を引き継いでいる。
