# Kojin Works ポータル

個人開発プロジェクトを一覧で紹介するポータルサイトです。`kojin.works` ドメインのトップページとして機能し、開発者の各プロジェクトへのリンクを提供します。

## リポジトリ

https://github.com/noricha-vr/kojin-works-portal

## デプロイ先

https://kojin.works/

## 機能

- 個人開発プロジェクトの一覧表示
- プロジェクト名、アイコン、説明文、タグの表示
- 外部プロジェクトへのリンク提供

## 技術スタック

- **フロントエンド**: Next.js (React)
- **スタイリング**: Tailwind CSS
- **データ管理**: YAMLファイル
- **ホスティング**: Cloudflare Pages

## セットアップ手順

1. リポジトリをクローン:
   ```bash
   git clone [リポジトリURL]
   cd kojin-works-portal
   ```

2. 依存パッケージをインストール:
   ```bash
   bun install
   ```

3. 開発サーバーを起動:
   ```bash
   bun run dev
   ```

4. ブラウザで `http://localhost:3000` にアクセスして確認

## プロジェクト情報の追加・更新方法

プロジェクト情報は `data/apps.yaml` ファイルで管理されています。
新しいプロジェクトを追加する場合は、以下の形式で記述してください:

```yaml
- title: "プロジェクト名"
  link: "https://example.com"
  description: "プロジェクトの説明文"
  icon: "/icons/icon_name.png"
  tags:
    - "タグ1"
    - "タグ2"
```

アイコン画像は `public/icons/` ディレクトリに配置してください。

## デプロイ

GitHubリポジトリにプッシュすると、Cloudflare Pagesが自動的にビルドしてデプロイします。

## ライセンス

[ライセンス情報]

## 開発依存の互換性

`bun run typecheck` は TypeScript 7.0.2 を明示して実行します。Next.js 15 と ESLint が利用するコンパイラAPIは6.0.3に固定し、ネイティブコンパイラとは分けています。`bun run lint` は旧 next lint と同じ src / lib、および設定ファイルをESLint CLIで検査します。Next.js本体と公開データはこの更新で変更していません。

Node.js は ESLint 10 の要件（20.19以上の20系、22.13以上の22系、または24以上）を使用します。`.node-version` は対応済みの20.20.2です。本番ビルドの先頭で型検査も実行します。
