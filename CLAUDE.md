# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

株式会社ICHIHO のコーポレートサイト（静岡・EC販売／リユース／EC販売支援）。全ページ日本語。ビルドツール・パッケージマネージャ・テストは一切なく、ブラウザ内で Babel が `.jsx` をトランスパイルする静的サイト。GitHub Pages（`.nojekyll`、リポジトリルート配信）にデプロイされる。

## Running locally

ビルドコマンドはない。ただし `file://` では動かない — Babel standalone が `<script type="text/babel" src="...">` を XHR で取得するため CORS で失敗する。必ず HTTP サーバ経由で開くこと。

```bash
python3 -m http.server 8000    # → http://localhost:8000/index.html
```

変更はリロードのみで反映される。動作確認はブラウザのコンソール（JSX の構文エラーや未定義グローバルはそこにしか出ない）で行う。

## Architecture

### スクリプトのロード方式とグローバル名前空間

各 HTML が unpkg から React 18 UMD + `@babel/standalone` を **SRI 付き** で読み込み、続けて `.jsx` を `type="text/babel"` で列挙する。重要な帰結：

- `.jsx` は ES モジュールではない。ファイル間の共有はすべて末尾の `window.X = X` と、利用側先頭の `/* global ... */` コメントで行う。**HTML 内のスクリプト順序が依存順序**（`shared.jsx` → ページ固有 jsx）。
- 同一ページに読まれる全 jsx がひとつのグローバルスコープを共有するため、トップレベルの `const` 名は衝突する。`useSharedState` / `useContactState` / `useStateContact` のような別名は意図的なもの（新規ファイルでも同じ回避をすること）。
- CDN の `<script>` を触る場合、URL とバージョンを変えたら `integrity` ハッシュも更新が必要。ハッシュは全 HTML に重複して書かれているので、変更時は 7 ファイル全部を揃える。

### ページ構成

| ページ | 読み込む jsx | 構造 |
|---|---|---|
| `index.html` | `tweaks-panel.jsx` → `site.jsx` → `site-featured.jsx` → `site-tail.jsx` + インライン `App` | トップ。ルート `App` は HTML 内にインラインで定義 |
| `business-ec.html` | `shared.jsx` → `detail.jsx` | HTML 内の `window.PAGE_DATA` オブジェクトが全文言・構成を駆動するデータ駆動型 |
| `business-reuse.html` | `shared.jsx` → `reuse-lp.jsx` | 専用 LP（BtoC 買取） |
| `business-support.html` | `shared.jsx` → `ec-support-lp.jsx` | 専用 LP（BtoB） |
| `contact.html` / `contact-eco.html` | `shared.jsx` → `contact.jsx` | **同一 jsx を 2 ページで共用**。`#root` の `data-variant="eco"` で `contact.jsx` の `VARIANTS` を切り替える |
| `sell-tips.html` | `shared.jsx` → `sell-tips.jsx` | 記事ページ |

`business-ec.html` のようにコンテンツを増やす場合は `PAGE_DATA` 方式に乗せられるが、reuse / support は独自レイアウトのため専用 jsx を持つ。

### ヘッダ／フッタが 2 系統ある

これが最も引っかかりやすい点。

- `site.jsx` の `Header` / `site-tail.jsx` の `Footer` — **トップページ専用**。同一ページ内アンカーへの `onJump` スムーススクロール前提。
- `shared.jsx` の `SiteHeader` / `SiteFooter` — **下層ページ全部**。`index.html#anchor` への通常リンク。`current` prop でアクティブ表示、`headerCta={{ tel }}` で電話 CTA を出す。

ナビ項目・事業一覧・お問い合わせ導線を変更するときは **両方**を直す必要がある。リンク先は `shared.jsx` の `HOME` / `CONTACT` / `CONTACT_ECO` / `BUSINESS_PAGES` / `CONTACT_PAGES` に集約されているが、`site.jsx` 側は同等の配列（`BIZ` / `CONTACTS`）をローカルに持っており重複している。

なお `site.jsx` の `EcoSection`、`site-featured.jsx` の `FeaturedSection` / `ProductGlyph` は定義・エクスポートされているが現在のトップページからは呼ばれていない。

### CSS のレイヤ

読み込み順にカスケードで重ねる設計。後段は前段のトークン前提。

1. `colors_and_type.css` — 全ページ必須。デザイントークン（`--indigo` 駿河湾 / `--sunrise` 富士朝焼け / `--tea` 茶畑 の和名パレット、`--font-jp` / `--font-serif` / `--font-en`、間隔 `--s-*`、角丸 `--r-*`、`--ease` / `--dur-*`）とベース要素・`.container` / `.anchor` / `.btn` などのユーティリティ。
2. `pages.css` — 下層ページ共通（共有ヘッダ／フッタ、detail hero、CTA band、contact フォーム）。
3. `reuse-lp.css` — LP 用 `lp-*` クラス群。`business-reuse.html` だけでなく `business-support.html` / `sell-tips.html` も土台として読み込む。
4. `ec-support-lp.css` — `lp-*` の上に BtoB 藍基調の差分だけを載せる。

`<body>` の `page--ec` / `page--reuse` / `page--support` がページごとのアクセント（reuse は茶畑グリーン強調など）を切り替え、`lp-body` が LP レイアウトを有効化する。`index.html` は例外的にページ固有 CSS を `<style>` でインラインに持つ。

### tweaks-panel.jsx

トップページのみに載るプロトタイピング用ツール（アクセント色・和柄モチーフ濃度のライブ切替）。`useTweaks` + `TweaksPanel` を提供し、ホストとの edit-mode プロトコルを内包する。既定値は `index.html` 内の `/*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/` マーカーで囲まれた JSON — このマーカーは外部ツールが書き換える前提なので壊さないこと。制作物の一部ではないので、本番向けの改修時に一般ユーザ向け機能と混同しない。

## 注意点

- **お問い合わせフォームは送信されない。** `contact.jsx` の `submit` は `preventDefault` してクライアント側で完了画面を出すだけで、送信先エンドポイントは存在しない。実際に問い合わせを受ける手段は画面に出ている電話番号のみ。
- 全リンク・アセット参照が相対パス（`assets/...`、`business-ec.html`）なので、ファイルはリポジトリルート直下のフラット構成を維持する。サブディレクトリへ移すと Pages 上で壊れる。
- フッタの「プライバシーポリシー」「特定商取引法に基づく表記」は `href="#"` のままの未実装リンク。
