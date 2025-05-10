import { Project } from "../../../lib/types";
import ProjectCard from "./ProjectCard";

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12" id="projects">
        {/* セクションヘッダー */}
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          プロジェクト一覧
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
    </div>
  );
} 
