import type { CSSProperties } from "react";

interface MarqueeProps {
  titles: string[];
}

/** 背面の帯に流すカテゴリラベル */
const CATEGORY_TAGS = ["WEB TOOLS", "VRCHAT", "GAMES", "BROWSER APPS", "OSS", "EXPERIMENTS"];

/**
 * 全プロジェクト名が流れる無限マーキー帯。
 *
 * @remarks
 * 同じ内容を2セット並べて translateX(-50%) でループさせるCSSアニメーション。
 * 純粋な装飾なので全体を aria-hidden にしている（実体は下のカード一覧）。
 */
export default function Marquee({ titles }: MarqueeProps) {
  return (
    <div aria-hidden="true" className="relative select-none overflow-hidden py-12">
      {/* 背面: カテゴリが逆方向に流れる控えめな帯 */}
      <div className="absolute left-1/2 top-1/2 w-[110%] -translate-x-1/2 -translate-y-1/2 rotate-[1.4deg] overflow-hidden border-y-2 border-line bg-ink-2 py-2.5">
        <div
          className="marquee-track flex w-max"
          style={{ "--marquee-speed": "80s", animationDirection: "reverse" } as CSSProperties}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {Array.from({ length: 5 }, () => CATEGORY_TAGS).flat().map((tag, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="px-6 font-mono text-sm tracking-[0.3em] text-dim whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 前面: プロジェクト名が流れるライム帯 */}
      <div className="relative -ml-[5%] w-[110%] rotate-[-1.6deg] overflow-hidden border-y-4 border-ink bg-lime py-3.5 shadow-[0_18px_50px_rgba(200,241,53,0.18)]">
        <div className="marquee-track flex w-max" style={{ "--marquee-speed": "46s" } as CSSProperties}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {titles.map((title) => (
                <span
                  key={`${copy}-${title}`}
                  className="flex items-center whitespace-nowrap font-display text-xl text-ink md:text-3xl"
                >
                  <span className="px-6">{title}</span>
                  <span className="h-2.5 w-2.5 shrink-0 rotate-45 bg-ink" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
