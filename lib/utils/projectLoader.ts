import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { Project } from '../types';

// javascript: 等の危険スキームが <a href> / <img src> に流れるのを防ぐ防御層
function isHttpUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

// カバー画像は public 配下の絶対パスまたは https URL のみ許可
function isSafeCover(cover: string): boolean {
  return cover.startsWith('/') || isHttpUrl(cover);
}

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
    
    // 必須フィールドの存在チェック + URLスキーム検証
    return projects.filter(project => {
      const isValid =
        project.title &&
        project.link &&
        isHttpUrl(project.link) &&
        project.description &&
        project.cover &&
        isSafeCover(project.cover);
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
