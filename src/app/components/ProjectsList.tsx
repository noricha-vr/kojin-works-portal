import { Project } from "../../../lib/types";
import Icon from "./Icon";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <section id="projects" className="relative scroll-mt-10 px-5 pb-28 pt-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <div>
              <p className="mb-3 flex items-center gap-2.5 font-mono text-sm tracking-[0.25em] text-lime">
                <Icon name="star" className="h-3.5 w-3.5" />
                ALL PROJECTS — {projects.length} WORKS
              </p>
              <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] leading-tight text-snow">
                きょうは、<span className="text-outline-lime">なに</span>であそぶ？
              </h2>
            </div>
            <p className="font-mono text-sm text-dim">気になったカードをクリック →</p>
          </div>
        </Reveal>

        {projects.length === 0 ? (
          <div className="rounded-2xl border-2 border-line bg-ink-2 p-10 text-center">
            <p className="mb-3 text-dim">プロジェクトデータが見つかりませんでした。</p>
            <p className="font-mono text-sm text-dim">data/apps.yaml ファイルを確認してください。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={(index % 3) * 100} className="h-full">
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
