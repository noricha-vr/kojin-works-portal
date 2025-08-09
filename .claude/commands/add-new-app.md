# 新規アプリ追加プロンプト

このプロンプトをClaude Codeに渡すことで、新しいアプリを`kojin-works-portal`に簡単に追加することが目的です。

## プロンプトテンプレート

```
/Users/main/project/kojin-works-portal に新しいアプリを追加してください。

[ここにアプリのURL、GitHubリポジトリURL、またはローカルディレクトリパスを入力]

以下の手順で作業してください：

1. 提供された情報から以下を特定・取得：
   - アプリのURL（https://xxx.kojin.works/ など）
   - プロジェクトのタイトル
   - プロジェクトの説明文
   - サムネイル画像の場所

2. 情報の収集方法：
   - URLが提供された場合：WebFetchでOGタグ情報を取得
   - GitHubリポジトリの場合：READMEやpackage.jsonから情報を取得
   - ローカルディレクトリの場合：README、package.json、public/内の画像を確認
   - サムネイル候補：
     - /images/thumbnail.png
     - /images/og-image.png
     - /public/og-image.png
     - /public/images/thumbnail.png
     - GitHubリポジトリのソーシャルプレビュー画像

3. 登録内容の確認：
   以下の形式でユーザーに確認を求める：
   ```
   以下の内容でアプリを登録します：
   
   タイトル: [取得したタイトル]
   URL: [アプリのURL]
   説明: [取得した説明文]
   サムネイル: [画像のURL]
   
   この内容でよろしいですか？（はい/いいえ）
   ```

4. ユーザーが承認したら：
   - サムネイル画像を /public/cover/[app-name].png にダウンロード
   - /data/apps.yaml に新しいエントリを追加
   - git add, commit, push を実行
   
   コミットメッセージ：
   ```
   feat(apps): [アプリ名]を追加
   
   - [アプリのURL]
   - [簡単な説明]
   ```

5. 完了報告：
   「[アプリ名]をポータルサイトに追加し、GitHubにプッシュしました。」

注意事項：
- 説明文は日本語で、100文字程度にまとめる
- 画像が見つからない場合はユーザーに確認
- yamlの追加は既存のフォーマットに従う
- 必ずユーザーの承認を得てからコミット・プッシュする
```

---

## 使用例

### 例1: URLのみ提供
```
https://example.kojin.works/ を追加してください
```

### 例2: GitHubリポジトリ
```
https://github.com/noricha-vr/my-new-app を追加してください
```

### 例3: ローカルディレクトリと追加情報
```
/Users/main/project/my-app を開発しました。
サムネイルは public/images/hero.png を使ってください。
```

### 例4: 複数の情報
```
新しいアプリを追加：
- URL: https://myapp.kojin.works/
- GitHub: https://github.com/noricha-vr/myapp
- 説明: AIを活用した革新的なツール
```

## トラブルシューティング

- **画像が取得できない場合**: ユーザーに画像URLまたはファイルパスを確認
- **説明文が長すぎる場合**: 要約して100文字程度に調整
- **タイトルが不明な場合**: URLやディレクトリ名から推測してユーザーに確認
- **プッシュエラー**: git pullしてから再度プッシュ
