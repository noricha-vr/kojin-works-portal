import { loadProjects } from "../../lib/utils/projectLoader";
import Hero from "./components/Hero";
import ProjectsList from "./components/ProjectsList";
import Footer from "./components/Footer";

export default function Home() {
  // サーバーサイドでプロジェクト情報を読み込む
  const projects = loadProjects();

  return (
    <div>
      <Hero />
      <ProjectsList projects={projects} />
      <Footer />
    </div>
  );
} 
