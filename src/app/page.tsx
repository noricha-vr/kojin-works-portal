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
    <div className={`flex flex-col rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${getProjectColor(index)}`}>
      {/* タグ表示エリア */}
      <div className="p-3 flex flex-wrap gap-2">
        {project.tags && project.tags.map((tag) => (
          <span 
            key={tag} 
            className={`${tagColorClass} bg-opacity-30 backdrop-blur-sm`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* メインアイコン表示エリア */}
      <div className="flex justify-center items-center p-8">
        <div className="w-24 h-24 relative rounded-full bg-white bg-opacity-30 flex items-center justify-center">
          <img 
            src={project.icon} 
            alt={`${project.title}のアイコン`} 
            className="w-16 h-16 object-contain"
          />
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* メインヘッダー */}
        <header className="mb-20 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            個人開発
          </h1>
          <p className="text-xl text-red-500 mb-2">
            これまでに作成したアプリを紹介します
          </p>
          <p className="text-sm text-gray-600">
            {/* サブタイトル */}
          </p>
        </header>

        {/* セクションヘッダー */}
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          公開中のアプリ一覧
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
  );
}
