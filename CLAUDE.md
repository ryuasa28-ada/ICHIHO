# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

株式会社ICHIHO のコーポレートサイト（静岡・EC販売／リユース／EC販売支援）。全ページ日本語。ビルドツール・パッケージマネージャ・テストは一切なく、ブラウザ内で Babel が `.jsx` をトランスパイルする静的サイト。GitHub Pages（`.nojekyll`、リポジトリルート配信）にデプロイされる。

## Running locally

ビルドコマンドはない。ただし `file://` では動かない — Babel standalone が `<script type="text/babel" src="...">` を XHR で取得するため CORS で失敗する。必ず HTTP サーバ経由で開くこと。

```bash
python3 -m http.server 8000    # → http://localhost:8000/index.html
```

動作確認はブラウザのコンソール（JSX の構文エラーや未定義グローバルはそこにしか出ない）で行う。

**`.jsx` を直したのに反映されないときはブラウザキャッシュを疑う。** `http.server` は
`Cache-Control` を送らないため、ブラウザが `Last-Modified` からヒューリスティックに
キャッシュし、再検証せずに古い `.jsx` を使うことがある（Babel は XHR で取りに行くので
通常のリロードでは取り直されない）。スーパーリロード（Cmd+Shift+R）で解消するが、
繰り返し確認するならキャッシュを無効化したサーバを立てるほうが早い。

## Architecture

### スクリプトのロード方式とグローバル名前空間

各 HTML が unpkg から React 18 UMD + `@babel/standalone` を **SRI 付き** で読み込み、続けて `.jsx` を `type="text/babel"` で列挙する。重要な帰結：

- `.jsx` は ES モジュールではない。ファイル間の共有はすべて末尾の `window.X = X` と、利用側先頭の `/* global ... */` コメントで行う。**HTML 内のスクリプト順序が依存順序**（`shared.jsx` → ページ固有 jsx）。
- 同一ページに読まれる全 jsx がひとつのグローバルスコープを共有するため、トップレベルの `const` 名は衝突する。`useSharedState` / `useContactState` / `useStateContact` のような別名は意図的なもの（新規ファイルでも同じ回避をすること）。
- CDN の `<script>` を触る場合、URL とバージョンを変えたら `integrity` ハッシュも更新が必要。ハッシュは全 HTML に重複して書かれているので、変更時は 8 ファイル全部を揃える。

### ページ構成

| ページ | 読み込む jsx | 構造 |
|---|---|---|
| `index.html` | `tweaks-panel.jsx` → `site.jsx` → `site-featured.jsx` → `site-tail.jsx` + インライン `App` | トップ。ルート `App` は HTML 内にインラインで定義 |
| `business-ec.html` | `shared.jsx` → `detail.jsx` | HTML 内の `window.PAGE_DATA` オブジェクトが全文言・構成を駆動するデータ駆動型 |
| `business-reuse.html` | `shared.jsx` → `reuse-lp.jsx` | 専用 LP（BtoC 買取） |
| `business-support.html` | `shared.jsx` → `ec-support-lp.jsx` | 専用 LP（BtoB） |
| `contact.html` / `contact-eco.html` | `shared.jsx` → `contact.jsx` | **同一 jsx を 2 ページで共用**。`#root` の `data-variant="eco"` で `contact.jsx` の `VARIANTS` を切り替える |
| `sell-tips.html` | `shared.jsx` → `sell-tips.jsx` | 記事ページ |
| `thanks.html` | `shared.jsx` → `thanks.jsx` | 送信完了ページ。Formspree の `_next` からここへ戻る |

`business-ec.html` のようにコンテンツを増やす場合は `PAGE_DATA` 方式に乗せられるが、reuse / support は独自レイアウトのため専用 jsx を持つ。

### ヘッダ／フッタが 2 系統ある

これが最も引っかかりやすい点。

- `site.jsx` の `Header` / `site-tail.jsx` の `Footer` — **トップページ専用**。同一ページ内アンカーへの `onJump` スムーススクロール前提。
- `shared.jsx` の `SiteHeader` / `SiteFooter` — **下層ページ全部**。`index.html#anchor` への通常リンク。`current` prop でアクティブ表示、`headerCta={{ tel }}` で電話 CTA を出す。

ナビ項目・事業一覧・お問い合わせ導線を変更するときは **両方**を直す必要がある。リンク先は `shared.jsx` の `HOME` / `CONTACT` / `CONTACT_ECO` / `BUSINESS_PAGES` / `CONTACT_PAGES` に集約されているが、`site.jsx` 側は同等の配列（`BIZ` / `CONTACTS`）をローカルに持っており重複している。

なお `site.jsx` の `EcoSection`、`site-featured.jsx` の `FeaturedSection` / `ProductGlyph` は定義・エクスポートされているが現在のトップページからは呼ばれていない。

### カードのアイコンイラスト（`shared.jsx` の `FEATURE_ICONS`）

事業ページのカード類に載せるフラットアイコンは、`shared.jsx` に `FEATURE_ICONS`
（キー → JSX フラグメントの辞書）としてまとめ、`window.FeatureIcon` で公開している。
下層ページはすべて `shared.jsx` を先に読むので、どのページからでも呼べる。

```jsx
<FeatureIcon name="channels" />                            /* 既定 class は feat__icon */
<FeatureIcon name="contact" className="rp-flow__icon" />   /* 置き場所ごとにサイズ用の class を渡す */
```

- 描画ルールは全アイコン共通：**viewBox 96×96 / 線幅 3 / 角丸ジョイント**、色は
  `ICON_INK` `#1F3D6B`（駿河湾の藍・線）、`ICON_FILL` `#C9D9EA`（ベタ塗り）、
  `ICON_ACC` `#D17A3F`（富士朝焼け・差し色を少量）の **3 色だけ**。`ICON_MID` `#8CA6C6`
  はステップ矢印などの控えめな要素用。
- 意味が同じカードでは**同じキーを使い回す**（例：`productpage` は SERVICES 01 と
  FLOW STEP04 の両方、`contact` / `checklist` はリユースと EC販売支援の両 FLOW）。
- 追加するときは `FEATURE_ICONS` に 1 エントリ足し、呼び出し側のデータ配列
  （`PAGE_DATA.features.items` / `SERVICES` / `EC_FLOW` / `FLOW`）に `icon:` キーを書く。
  `icon` が無い項目はアイコンなしで描画されるので、既存ページを壊さない。

### ステップ間の矢印

リユース（`.rp-flow`）と EC販売支援（`.sp-flow`）の FLOW セクションは、カードの間に
矢印を出す。矢印は**カードの外側へ絶対配置**していてグリッドの列幅を食わない。
デスクトップは右向き、SP は `rotate(90deg)` で下向きに切り替わる。矢印の実体は
データ URI の SVG シェブロンで、`reuse-page.css` / `support-page.css` にそれぞれ持つ。
`.sp-flow` は 3 列 × 2 行なので、03→04 の折り返しだけ行間を左へ戻る線で表現している
（`.sp-flow__wrap`）。この都合で両ページとも中間の 2 列ブレークポイントは廃止し、
**SP 1 列 → デスクトップで一気に横一列**にしている。

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

- **お問い合わせフォームは Formspree へ通常の form POST で送信される。** `contact.jsx` の
  `submit` は `preventDefault` せず、ボタンを「送信中…」にするだけ。エンドポイントは
  `FORMSPREE_ENDPOINT`（総合 / eco で 1 本を共用）で、hidden の `_subject` が件名を
  振り分け、`_next` の URL（`THANKS_URL`）へ戻ってくる。`_gotcha` はハニーポット。
  - `_next` は**絶対 URL**でないと Formspree が受け付けない。既定は GitHub Pages の
    `thanks.html` を指しているので、localhost で送信すると公開版の完了ページに飛ぶ。
  - 現在のエンドポイントは開発・検証用。本番では `info@tokai-onlineshop.jp` で発行した
    ものに差し替える（`contact.jsx` 冒頭のコメント参照）。
  - `name` 属性は Formspree のメール本文のラベルになる。`inquiry_type` / `company` /
    `name` / `tel` / `email` / `message` / `items`（eco のみ）で固定。
- リユース事業ページの GALLERY は `reuse-lp.jsx` 冒頭の `PHOTOS.slides` だけを見ている。
  実写は `assets/photos/gallery-NN.jpg`（1280×720 / JPEG 品質 82）。マーキーは
  `--rp-gallery-items` にコマ数を渡してスクロール時間を算出するので、**枚数を増減しても
  速度は変わらない**。差し替え手順は `assets/photos/README.md` にある。同フォルダの
  `slide-*.svg` / `scene-*.svg` / `fv-01.svg` は現在どこからも参照されていない仮素材。
- 全リンク・アセット参照が相対パス（`assets/...`、`business-ec.html`）なので、ファイルはリポジトリルート直下のフラット構成を維持する。サブディレクトリへ移すと Pages 上で壊れる。
- 「プライバシーポリシー」「特定商取引法に基づく表記」は `href="#"` のままの未実装リンク。フッタ（`shared.jsx` / `site-tail.jsx`）と、お問い合わせフォームの注意書き横（`contact.jsx` の `.cpage__privacy-link`）にある。
