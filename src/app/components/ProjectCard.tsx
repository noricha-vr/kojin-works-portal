"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { Project } from "../../../lib/types";
import Icon from "./Icon";

interface ProjectCardProps {
  project: Project;
  /** カードの通し番号。ナンバリングとアクセント色の循環に使う */
  index: number;
}

/** カードごとに循環させるアクセント色 */
const ACCENTS = [
  "var(--color-lime)",
  "var(--color-aqua)",
  "var(--color-rose)",
  "var(--color-amber)",
];

/** リンクURLから表示用のホスト名を取り出す */
function hostnameOf(link: string): string {
  try {
    return new URL(link).hostname;
  } catch {
    return link;
  }
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const accent = ACCENTS[index % ACCENTS.length];

  // カーソル位置に合わせてカードを3Dチルトさせる（マウスのみ）
  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="tilt-card group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-line bg-ink-2"
      style={{ "--accent": accent } as CSSProperties}
    >
      {/* カバー画像 */}
      <div className="shine relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <span
          className="absolute left-3 top-3 z-[2] rounded-md px-2 py-0.5 font-mono text-sm font-semibold text-ink"
          style={{ background: accent }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* プロジェクト情報 */}
      <div className="flex grow flex-col gap-2.5 p-5">
        <h3 className="text-lg font-bold text-snow md:text-xl">{project.title}</h3>
        <p className="line-clamp-3 grow text-sm leading-relaxed text-dim">
          {project.description}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3 border-t border-line pt-3.5">
          <span className="truncate font-mono text-sm text-dim">{hostnameOf(project.link)}</span>
          <span className="card-arrow">
            <Icon name="arrowRight" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </a>
  );
}
