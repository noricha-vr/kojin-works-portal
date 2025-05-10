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
  // 各プロジェクトの背景色クラスを取得
  const bgColorClass = getProjectColor(index);
  
  // タグの色をプロジェクト色に基づいて設定
  const getTagColor = () => {
    // 画像に合わせて、白背景と青系のテキストに変更
    if (bgColorClass.includes('blue')) return 'text-blue-600 bg-white border-blue-200';
    if (bgColorClass.includes('cyan')) return 'text-cyan-600 bg-white border-cyan-200';
    if (bgColorClass.includes('amber')) return 'text-amber-600 bg-white border-amber-200';
    if (bgColorClass.includes('emerald')) return 'text-emerald-600 bg-white border-emerald-200';
    if (bgColorClass.includes('pink')) return 'text-pink-600 bg-white border-pink-200';
    if (bgColorClass.includes('purple')) return 'text-purple-600 bg-white border-purple-200';
    return 'text-gray-600 bg-white border-gray-200'; // デフォルト
  };
  
  // プロジェクトタグの表示色をカスタマイズ - 独立したバッチスタイル
  const tagColorClass = "inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm border";
  const tagColors = getTagColor();
  
  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* カバー画像エリア */}
      <div className={`relative ${bgColorClass} h-60`}>
        {/* タグ表示エリア */}
        <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-2 z-10">
          {project.tags && project.tags.map((tag) => (
            <span 
              key={tag} 
              className={`${tagColorClass} ${tagColors}`}
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
      {/* 新しいヒーローセクション */}
      <section className="bg-slate-50 text-slate-800 min-h-screen flex items-center justify-center pt-16">
        <div className="text-center p-6 md:p-12">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900">
            個人開発<br className="md:hidden" /> <span className="text-indigo-600">アイデアをカタチに</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto text-slate-600">
            シンプルながらも機能的なソリューションで、最高のユーザー体験を追求します。
          </p>
          <a href="#projects"
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition duration-300 shadow-md transform hover:scale-105">
            プロジェクトを見る
          </a>
        </div>
      </section>
      
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12" id="projects">
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
