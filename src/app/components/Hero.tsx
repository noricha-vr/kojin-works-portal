"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { Project } from "../../../lib/types";
import Icon from "./Icon";

interface HeroProps {
  projects: Project[];
}

/** 浮遊カバーの配置スロット。depth が大きいほどパララックスで大きく動く */
const FLOAT_SLOTS = [
  { position: "left-[3%] top-[17%] w-40 xl:w-48", tilt: -8, depth: 26, bobDelay: 0 },
  { position: "right-[4%] top-[13%] w-44 xl:w-56", tilt: 7, depth: 38, bobDelay: 1.4 },
  { position: "left-[6%] bottom-[15%] w-36 xl:w-44", tilt: 6, depth: 50, bobDelay: 2.6 },
  { position: "right-[8%] bottom-[19%] w-40 xl:w-52", tilt: -6, depth: 32, bobDelay: 0.8 },
  { position: "left-[45%] top-[5%] w-32 hidden xl:block", tilt: 10, depth: 60, bobDelay: 2 },
];

/** プロジェクト一覧から浮遊カバー用に均等間隔で選出する */
function pickFloatProjects(projects: Project[], count: number): Project[] {
  if (projects.length <= count) return projects;
  return Array.from({ length: count }, (_, i) => {
    const index = Math.round((i * (projects.length - 1)) / (count - 1));
    return projects[index];
  });
}

export default function Hero({ projects }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const floatProjects = pickFloatProjects(projects, FLOAT_SLOTS.length);

  // マウス位置を -1〜1 に正規化してCSS変数へ流し、浮遊カバーをパララックスさせる。
  // OS設定（モーション低減）やポインタ種別の切り替えにはリロードなしで追従する
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        section.style.setProperty("--mx", mx.toFixed(3));
        section.style.setProperty("--my", my.toFixed(3));
      });
    };
    // 同一リスナーの重複登録はブラウザ側で無視されるため、syncは冪等
    const sync = () => {
      if (fine.matches && !reduced.matches) {
        section.addEventListener("pointermove", onMove, { passive: true });
      } else {
        section.removeEventListener("pointermove", onMove);
        section.style.setProperty("--mx", "0");
        section.style.setProperty("--my", "0");
      }
    };
    sync();
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToProjects = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const badgeText = `${projects.length} PROJECTS — KOJIN.WORKS — TAP TO PLAY — `;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-28"
    >
      {/* トップバー */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <p className="font-mono text-base font-semibold tracking-[0.2em] text-snow">
          KOJIN<span className="text-lime">.</span>WORKS<span className="blink text-lime">_</span>
        </p>
        <a
          href="https://github.com/noricha-vr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub: noricha-vr"
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-line text-dim transition-colors hover:border-lime hover:text-lime"
        >
          <Icon name="github" className="h-5 w-5" />
        </a>
      </header>

      {/* 浮遊するアプリカバー（装飾） */}
      <div aria-hidden="true" className="absolute inset-0 hidden md:block">
        {floatProjects.map((project, i) => {
          const slot = FLOAT_SLOTS[i];
          return (
            <div
              key={project.title}
              className={`absolute ${slot.position}`}
              style={{
                transform: `translate3d(calc(var(--mx, 0) * ${slot.depth}px), calc(var(--my, 0) * ${slot.depth}px), 0)`,
                transition: "transform 0.25s ease-out",
              }}
            >
              <div
                className="floaty rounded-2xl border-2 border-line bg-ink-2/90 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                style={{ "--tilt": `${slot.tilt}deg`, "--bob-delay": `${slot.bobDelay}s` } as CSSProperties}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  <Image src={project.cover} alt="" fill sizes="240px" className="object-cover" />
                </div>
                <p className="mt-1.5 truncate px-1 font-mono text-sm text-dim">{project.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* メインコピー */}
      <div className="relative z-10 max-w-4xl text-center">
        <p
          className="rise mb-6 flex items-center justify-center gap-3 font-mono text-sm tracking-[0.3em] text-lime"
          style={{ "--rise-delay": "0ms" } as CSSProperties}
        >
          <Icon name="star" className="h-3.5 w-3.5" />
          INDIE DEV PLAYGROUND
          <Icon name="star" className="h-3.5 w-3.5" />
        </p>

        {/* 各行が全ビューポートで1行に収まるサイズ（10文字 × 1em ≦ コンテナ幅） */}
        <h1 className="font-display text-[clamp(1.9rem,6.5vw,5rem)] leading-[1.25] tracking-tight">
          {/* モバイルでは「を、」を2行目に送り、孤立改行を防ぐ */}
          <span className="rise block" style={{ "--rise-delay": "150ms" } as CSSProperties}>
            <span className="text-lime">「</span>あったらいいな<span className="text-lime">」</span>
            <span className="hidden md:inline">を、</span>
          </span>
          <span className="rise block" style={{ "--rise-delay": "320ms" } as CSSProperties}>
            <span className="md:hidden">を、</span>つくって、
            <span className="text-outline-lime inline-block">あそぶ。</span>
          </span>
        </h1>

        <p
          className="rise mx-auto mt-8 max-w-xl text-base leading-relaxed text-dim md:text-lg"
          style={{ "--rise-delay": "480ms" } as CSSProperties}
        >
          個人開発者 noricha が「あったらいいな」をひとつずつカタチにした、
          {projects.length}個の作品があつまる遊び場です。
          気になるものから、自由にさわってみてください。
        </p>

        <div
          className="rise mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ "--rise-delay": "620ms" } as CSSProperties}
        >
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="inline-flex items-center gap-3 rounded-full bg-lime px-9 py-4 text-lg font-bold text-ink shadow-[0_0_44px_rgba(200,241,53,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_64px_rgba(200,241,53,0.45)]"
          >
            作品であそぶ
            <Icon name="arrowDown" className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/noricha-vr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border-2 border-line px-8 py-[0.9rem] text-lg font-bold text-snow transition-colors hover:border-snow"
          >
            <Icon name="github" className="h-5 w-5" />
            GitHub をみる
          </a>
        </div>

        <ul
          className="rise mt-12 flex flex-wrap items-center justify-center gap-3"
          style={{ "--rise-delay": "760ms" } as CSSProperties}
        >
          {[`${projects.length} WORKS`, "WEB / VR / GAME", "ぜんぶ個人開発"].map((label) => (
            <li
              key={label}
              className="rounded-full border border-line px-4 py-1.5 font-mono text-sm text-dim"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* 回転する円形バッジ（装飾） */}
      <div aria-hidden="true" className="absolute bottom-10 right-10 z-10 hidden lg:block">
        <div className="relative">
          <svg viewBox="0 0 120 120" className="spin-slow h-28 w-28">
            <defs>
              <path id="badge-ring" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
            </defs>
            <text className="fill-dim font-mono" fontSize="10" letterSpacing="2">
              <textPath href="#badge-ring">{badgeText}</textPath>
            </text>
          </svg>
          <Icon
            name="star"
            className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-lime"
          />
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
      >
        <span className="font-mono text-sm tracking-[0.3em] text-dim">SCROLL</span>
        <span className="scroll-line block h-10 w-px bg-lime" />
      </div>
    </section>
  );
}
