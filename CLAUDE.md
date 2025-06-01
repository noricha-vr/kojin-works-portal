# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要
個人開発プロジェクトを一覧表示するポータルサイト（kojin.worksドメインのトップページ）。
GitHubリポジトリ: https://github.com/noricha-vr/kojin-works-portal

## 開発コマンド
```bash
npm run dev      # 開発サーバー起動（Turbopack使用）
npm run build    # 静的サイトのビルド
npm run start    # ビルド済みサイトのプレビュー
npm run lint     # ESLintによるコード品質チェック
```

## アーキテクチャ
- **フレームワーク**: Next.js 15.3.2（静的サイト生成モード）
- **スタイリング**: Tailwind CSS v4
- **データ管理**: YAML形式（`data/apps.yaml`）

### データフロー
1. `data/apps.yaml` にプロジェクト情報を記載
2. `lib/utils/projectLoader.ts` でYAMLをパースしてTypeScript型に変換
3. `src/app/page.tsx` でサーバーサイドでデータを読み込み
4. 静的HTMLとして出力（`output: 'export'`設定により）

### プロジェクトデータ構造
```yaml
- title: "プロジェクト名"（必須）
  link: "https://example.com"（必須）
  description: "プロジェクトの説明"（必須）
  cover: "/cover/image.png"（必須）  # publicディレクトリからの相対パスまたは外部URL
  tags:  # オプション
    - "タグ1"
    - "タグ2"
```

### 主要コンポーネント
- `page.tsx`: メインページ（Hero + ProjectsList + Footer）
- `ProjectCard.tsx`: 個別プロジェクトの表示カード
- `ProjectsList.tsx`: プロジェクト一覧のコンテナ
- `Hero.tsx`: ヒーローセクション
- `Footer.tsx`: フッター

## デプロイプロセス
1. `data/apps.yaml` を編集してプロジェクト情報を追加/更新
2. 必要に応じて画像を `/public/cover/` に配置
3. GitHubのmainブランチにプッシュ → Cloudflare Pagesが自動デプロイ

## 注意事項
- 画像最適化は無効（`images.unoptimized: true`）なので、適切なサイズで画像を用意すること
- テストコマンドは未実装
- Node.js 20.0.0以上が必要