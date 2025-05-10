import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Project } from '../types';

/**
 * YAMLファイルからプロジェクト情報を読み込む
 * @returns プロジェクト情報の配列
 */
export function loadProjects(): Project[] {
  try {
    // プロジェクトルートからのパス
    const yamlPath = path.join(process.cwd(), 'data', 'apps.yaml');
    
    // ファイルが存在しない場合は空配列を返す
    if (!fs.existsSync(yamlPath)) {
      console.warn('プロジェクトデータファイルが見つかりません:', yamlPath);
      return [];
    }
    
    // YAMLファイルを読み込む
    const fileContents = fs.readFileSync(yamlPath, 'utf8');
    const projects = yaml.load(fileContents) as Project[];
    
    // 必須フィールドの存在チェック
    return projects.filter(project => {
      const isValid = project.title && project.link && project.description && project.icon;
      if (!isValid) {
        console.warn('無効なプロジェクトデータ:', project);
      }
      return isValid;
    });
  } catch (error) {
    console.error('プロジェクトデータの読み込みエラー:', error);
    return [];
  }
} 
