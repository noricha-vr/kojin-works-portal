import { loadProjects } from "../../lib/utils/projectLoader";
import Footer from "./components/Footer";
import GlowCursor from "./components/GlowCursor";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ProjectsList from "./components/ProjectsList";

export default function Home() {
  // サーバーサイド（ビルド時）でプロジェクト情報を読み込む
  const projects = loadProjects();

  return (
    <>
      <GlowCursor />
      <main>
        <Hero projects={projects} />
        <Marquee titles={projects.map((project) => project.title)} />
        <ProjectsList projects={projects} />
      </main>
      <Footer />
    </>
  );
}
