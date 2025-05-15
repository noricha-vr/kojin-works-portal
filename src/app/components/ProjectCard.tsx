import Image from 'next/image';
import { Project } from "../../../lib/types";

// プロジェクトカードの背景色を決定する関数
// function getProjectColor(index: number): string { ... } // この関数は不要になる可能性があります

interface ProjectCardProps {
  project: Project;
  index: number; // index は key として使われるので残します
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProjectCard({ project, index }: ProjectCardProps) {
  // タグの色を決定するロジックはそのまま使えます
  const getTagColor = () => {
    // 仮のタグ色ロジック（実際にはプロジェクトのテーマや画像の主要色に合わせるのが望ましい）
    // ここでは単純化のため、固定の色を返します
    return 'text-gray-700 bg-gray-200 border-gray-300';
  };

  const tagColorClass = "inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm border";
  const tagColors = getTagColor();

  return (
    <a
      href={project.link}
      rel="noopener noreferrer"
      className="flex flex-col rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
    >
      {/* カバー画像エリア */}
      <div className="relative w-full h-48 overflow-hidden"> {/* h-60 から h-48 に変更, bgColorClassを削除 */}
        <Image
          src={project.cover}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transform transition-transform duration-300 group-hover:scale-105" // ホバーエフェクト追加
        />
        {/* タグ表示エリア (画像の上に配置) */}
        <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-2 z-10">
          {project.tags && project.tags.map((tag) => (
            <span
              key={tag}
              className={`${tagColorClass} ${tagColors} bg-opacity-80`} // 背景を少し透過させる
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* プロジェクト情報エリア */}
      <div className="bg-white p-6 flex-grow"> {/* flex-grow を追加して高さを揃える */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-700 text-sm mb-4 flex-grow">{project.description}</p> {/* pタグに変更, flex-grow を追加 */}
      </div>
    </a>
  );
} 
