# Kojin Works ポータル

個人開発プロジェクトを一覧で紹介するポータルサイトです。`kojin.works` ドメインのトップページとして機能し、開発者の各プロジェクトへのリンクを提供します。

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
   npm install
   ```

3. 開発サーバーを起動:
   ```bash
   npm run dev
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
