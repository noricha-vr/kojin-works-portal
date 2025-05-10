import { Project } from "../../../lib/types";

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

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
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
    <a
      href={project.link}
      rel="noopener noreferrer"
      className="flex flex-col rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer"
    >
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
        <h4 className="text-gray-600 mb-4 text-sm">{project.description}</h4>
      </div>
    </a>
  );
} 
