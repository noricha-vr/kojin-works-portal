"use client";

import { useEffect, useRef, useState } from "react";

/** グロー円のサイズ（px）。中心をカーソルに合わせるオフセット計算に使う */
const GLOW_SIZE = 640;

/**
 * カーソルに追従するネオングローのアンビエント演出。
 *
 * @remarks
 * マウス環境（pointer: fine）かつモーション低減設定でない場合のみ描画する。
 * 描画コストを抑えるため transform のみを requestAnimationFrame で更新する。
 */
export default function GlowCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // OS設定（モーション低減）やポインタ種別の切り替えにリロードなしで追従する
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glowRef.current?.style.setProperty(
          "transform",
          `translate3d(${e.clientX - GLOW_SIZE / 2}px, ${e.clientY - GLOW_SIZE / 2}px, 0)`,
        );
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      <div
        ref={glowRef}
        className="rounded-full opacity-30 mix-blend-screen"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          background:
            "radial-gradient(circle, rgba(77,232,210,0.35), rgba(200,241,53,0.08) 45%, transparent 70%)",
          transform: "translate3d(-100vw, -100vh, 0)",
        }}
      />
    </div>
  );
}
