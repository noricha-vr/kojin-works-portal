import { loadProjects } from "../../lib/utils/projectLoader";
import { Project } from "../../lib/types";

// プロジェクトカードの背景色を決定する関数
function getProjectColor(index: number): string {
  const colors = [
    "bg-blue-400", // 青（タスク管理アプリ）
    "bg-cyan-400", // シアン（SNS）
    "bg-amber-400", // 黄色（レシピ検索）
    "bg-emerald-400", // 緑（学習プラットフォーム）
    "bg-pink-400", // ピンク（ユーティリティ）
    "bg-purple-400", // 紫（ブログ）
  ];
  return colors[index % colors.length];
}

/**
 * プロジェクトカード用のコンポーネント
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  // プロジェクトタグの表示色をカスタマイズ
  const tagColorClass = "inline-block px-2 py-1 text-xs text-white rounded-full";
  
  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* カバー画像エリア */}
      <div className={`relative ${getProjectColor(index)} h-60`}>
        {/* タグ表示エリア */}
        <div className="absolute top-0 left-0 right-0 p-3 flex flex-wrap gap-2 z-10">
          {project.tags && project.tags.map((tag) => (
            <span 
              key={tag} 
              className={`${tagColorClass} bg-opacity-30 backdrop-blur-sm`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* プロジェクト番号表示 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-8xl font-bold opacity-70 flex items-center justify-center">
            <span className="border-4 border-white border-opacity-40 w-32 h-32 flex items-center justify-center">
              {index + 1}
            </span>
          </div>
        </div>
      </div>
      
      {/* プロジェクト情報エリア */}
      <div className="bg-white p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
        
        {/* 外部リンク */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          アプリを見る
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  // サーバーサイドでプロジェクト情報を読み込む
  const projects = loadProjects();

  return (
    <div>
      <div className="bg-white">
        {/* ヒーローセクション - ミニマルデザイン */}
        <div className="flex flex-col items-center justify-center py-36 px-4">
          <h1 className="text-7xl font-bold text-gray-900 mb-6 text-center">
            個人開発
          </h1>
          <p className="text-orange-500 text-xl">
            {projects.length}件のプロジェクトを公開中
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          {/* セクションヘッダー */}
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            アプリ一覧
          </h2>

          {projects.length === 0 ? (
            // プロジェクトがない場合
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow text-center">
              <p className="text-gray-600 mb-4">
                プロジェクトデータが見つかりませんでした。
              </p>
              <p className="text-sm text-gray-500">
                data/apps.yaml ファイルを確認してください。
              </p>
            </div>
          ) : (
            // プロジェクト一覧を表示
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
        
        <footer className="mt-20 py-6 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Kojin Works. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
