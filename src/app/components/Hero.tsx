"use client";

import { useCallback } from 'react';

export default function Hero() {
  // スムーズスクロール関数
  const scrollToProjects = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <section className="bg-slate-50 text-slate-800 min-h-screen flex items-center justify-center pt-16">
      <div className="text-center p-6 md:p-12">
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-slate-900">
          個人開発<br className="md:hidden" /> <span className="text-indigo-600">アイデアをカタチに</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto text-slate-600">
          シンプルながらも機能的なソリューションで、最高のユーザー体験を追求します。
        </p>
        <a href="#projects"
          onClick={scrollToProjects}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-indigo-700 transition duration-300 shadow-md transform hover:scale-105">
          プロジェクトを見る
        </a>
      </div>
    </section>
  );
} 
