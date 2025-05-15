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
  return (
    <a
      href={project.link}
      rel="noopener noreferrer"
      className="flex flex-col rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
    >
      {/* カバー画像エリア */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* プロジェクト情報エリア */}
      <div className="bg-white p-6 flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-700 text-sm mb-4 flex-grow">{project.description}</p>
      </div>
    </a>
  );
} 
