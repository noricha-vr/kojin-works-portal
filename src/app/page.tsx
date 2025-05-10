import { loadProjects } from "../../lib/utils/projectLoader";
import { Project } from "../../lib/types";

/**
 * プロジェクトカード用のコンポーネント
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 mr-4 relative overflow-hidden rounded">
            {/* アイコン表示 - 最適化無効で表示 */}
            <img 
              src={project.icon} 
              alt={`${project.title}のアイコン`} 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
        
        {/* タグ一覧 */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* 外部リンク */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          プロジェクトを見る
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Kojin Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            個人開発プロジェクト一覧
          </p>
        </header>

        {projects.length === 0 ? (
          // プロジェクトがない場合
          <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              プロジェクトデータが見つかりませんでした。
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              data/apps.yaml ファイルを確認してください。
            </p>
          </div>
        ) : (
          // プロジェクト一覧を表示
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        )}
      </div>
      
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kojin Works. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
