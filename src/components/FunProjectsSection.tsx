import { ProjectCard } from "@/components/ProjectsSection";
import { funProjects } from "@/data/projects";

export function FunProjectsSection() {
  return (
    <section className="fun-page" aria-labelledby="fun-title">
      <header className="fun-intro">
        <p className="fun-kicker">Side quests</p>
        <h1 id="fun-title">Things I make when curiosity takes over.</h1>
        <p className="fun-summary">
          Motion, posters, and thumbnail experiments that sharpen how I work
          with story, composition, and attention.
        </p>
      </header>

      <div className="project-grid fun-project-grid">
        {funProjects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
