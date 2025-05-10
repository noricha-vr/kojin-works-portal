/**
 * プロジェクト情報の型定義
 * data/apps.yamlから読み込まれるデータの型を定義
 */
export interface Project {
  /**
   * プロジェクト名称
   */
  title: string;
  
  /**
   * プロジェクトへのリンクURL
   */
  link: string;
  
  /**
   * プロジェクトの説明文
   */
  description: string;
  
  /**
   * プロジェクトのアイコン画像パス
   * publicディレクトリからの絶対パス
   */
  icon: string;
  
  /**
   * プロジェクトに関連するタグ（任意）
   */
  tags?: string[];
} 
