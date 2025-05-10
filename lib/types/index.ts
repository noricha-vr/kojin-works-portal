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
   * プロジェクトのカバー画像パス
   * publicディレクトリからの絶対パス
   */
  cover: string;
  
  /**
   * プロジェクトに関連するタグ（任意）
   */
  tags?: string[];
} 
