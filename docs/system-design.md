## 個人開発プロジェクトまとめサイト 仕様書

**発行日:** 2025年5月10日
**ドメイン:** `kojin.works` (トップページとして使用)

### 1. 概要と目的

本システムは、`kojin.works` ドメインのトップページとして機能し、開発者（あなた）が個人で開発したアプリケーションやプロジェクト（以下、プロジェクト）を一覧で紹介し、それぞれのプロジェクトへ簡単にアクセスできるポータルサイトを構築することを目的とします。

掲載するプロジェクトは、`kojin.works` のサブドメインで公開されているものに限らず、外部のURL（GitHub Pages、外部サービス上のアプリ、アプリストアのページなど）で公開されているものも対象とします。

### 2. システム構成と技術スタック

| 項目          | 技術・サービス                                   | 備考                                                                 |
| :------------ | :----------------------------------------------- | :------------------------------------------------------------------- |
| フロントエンド  | Next.js (Reactベース)                            | 静的サイト生成 (SSG) 機能を利用 (`output: 'export'`)                   |
| データ管理     | YAMLファイル (`data/apps.yaml`)                  | プロジェクト情報を一元管理                                                 |
| ホスティング    | Cloudflare Pages                                 | 静的サイトホスティング、CDN配信                                            |
| CI/CD        | GitHub と Cloudflare Pages の連携                  | GitHubリポジトリへのプッシュをトリガーに自動ビルド＆デプロイ                 |
| 画像取り扱い   | Next.js `<Image>` または `<img>` タグ            | `next.config.js`にて`images: { unoptimized: true }` を設定し、最適化は行わない |
| スタイリング   | Tailwind CSS                                    | ユーティリティファーストCSSフレームワーク。デザイン実装を効率化                 |

### 3. ページ構成

本サイトは、以下の単一ページで構成されます。

* **トップページ (`/`)**:
    * 登録された全プロジェクトを一覧表示します。
    * 各プロジェクトには、プロジェクト名、アイコン、短い説明、関連タグ、そしてプロジェクト本体への外部リンクが含まれます。
    * 個別のプロジェクト詳細ページは作成しません。

### 4. データ構造 (YAML)

プロジェクトの情報は、プロジェクトルートに配置する `data/apps.yaml` ファイルに、以下のキーを持つオブジェクトの配列として記述します。

| キー          | 型                | 必須 | 説明                                                                                               | 例                                        |
| :------------ | :---------------- | :--- | :------------------------------------------------------------------------------------------------- | :---------------------------------------- |
| `title`       | `string`          | ✓    | プロジェクトの名称                                                                                       | `"すごいお絵描きアプリ"`                      |
| `link`        | `string`          | ✓    | プロジェクトへアクセスするための完全なURL (例: `https://~`, `http://~`)                                    | `"https://draw.kojin.works"`              |
| `description` | `string`          | ✓    | プロジェクトの短い説明文                                                                                   | `"直感的な操作で誰でも簡単にお絵描きが楽しめます。"` |
| `icon`        | `string`          | ✓    | プロジェクトのアイコン画像のパス (`public`ディレクトリからの絶対パス)                                              | `"/icons/draw_app_icon.png"`              |
| `tags`        | `string[]` (配列) |      | プロジェクトに関連するタグのリスト (任意項目)                                                                  | `["ツール", "デザイン", "Webアプリ"]`        |

**`data/apps.yaml` の記述例:**
```yaml
- title: "すごいお絵描きアプリ"
  link: "https://draw.kojin.works"
  description: "直感的な操作で誰でも簡単にお絵描きが楽しめます。"
  icon: "/icons/draw_app_icon.png"
  tags:
    - "ツール"
    - "デザイン"
    - "Webアプリ"
- title: "タスク管理ツール「TodoMaster」"
  link: "https://your-username.github.io/todomaster/"
  description: "GitHub Pagesで公開しているシンプルなタスク管理ツールです。"
  icon: "/icons/todomaster_icon.svg"
  tags:
    - "生産性"
    - "静的サイト"
# ...他のプロジェクト情報を続ける
```

### 5. 機能要件

* **プロジェクト一覧表示機能:**
    * `data/apps.yaml` から全プロジェクト情報を読み込み、トップページに一覧表示します。
    * 各プロジェクトについて、`title`, `icon`, `description`, `tags` を表示します。
* **外部リンク機能:**
    * 各プロジェクトの `link` に指定されたURLへのハイパーリンクを設置し、ユーザーがプロジェクト本体へ遷移できるようにします。リンクは新しいタブで開く (`target="_blank"`) ようにします。
* **画像表示機能:**
    * `icon` に指定されたパスの画像を、最適化処理なしで表示します。

### 6. Next.js 設定 (`next.config.js` または `next.config.mjs`)

以下の設定を適用します。

```javascript
// next.config.mjs (または next.config.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // 静的HTMLとしてエクスポート
  images: {
    unoptimized: true, // 全ての next/image で画像最適化を無効化
  },
};

export default nextConfig;
```

### 7. ディレクトリ構成（主要なもの）

```
kojin-works-portal/
├── docs/
│   └── system-design.md
├── node_modules/
│   └── ...（省略）
├── public/
│   ├── next.svg
│   ├── window.svg
│   ├── file.svg
│   ├── globe.svg
│   └── vercel.svg
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

### 8. 開発・運用フロー

1.  **プロジェクト情報の追加・更新:**
    * 新しいプロジェクトを追加する場合や既存の情報を更新する場合は、`data/apps.yaml` ファイルを直接編集します。
    * アイコン画像は `public/icons/` ディレクトリに追加・配置します。
2.  **ローカルでの開発・確認:**
    * `npm run dev` (または `yarn dev`) コマンドでローカル開発サーバーを起動し、変更内容を確認します。
3.  **デプロイ:**
    * 変更内容をGitでコミットし、連携しているGitHubリポジトリの指定ブランチ（例: `main`）にプッシュします。
    * Cloudflare Pagesがプッシュを検知し、自動的にビルドプロセス（`next build`）を実行し、生成された静的ファイル (`out` ディレクトリ）をデプロイします。

### 9. その他

* 本仕様書は、これまでの会話で合意された内容に基づいています。
* デザイン（CSSスタイリングなど）については、本仕様書では詳細を規定しません。開発者の裁量で、シンプルかつ見やすいデザインを適用してください。Tailwind CSS や CSS Modules などの利用が考えられます。
* TypeScriptの型定義 (`lib/types.ts` など) を適切に行うことで、開発効率とコードの堅牢性を高めることを推奨します。
