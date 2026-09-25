import { ProjectCard } from "@/components/ProjectsSection";
import { funProjects } from "@/data/projects";

export function FunProjectsSection() {
  return (
    <>
      <section className="hero" aria-labelledby="fun-title">
        <div className="hero-copy">
          <p className="section-label">Side quests</p>
          <h1 id="fun-title">
            <span className="hero-line">Things I make</span>
            <span className="hero-line hero-line--muted">
              when curiosity takes over.
            </span>
          </h1>
          <p className="hero-summary">
            Motion, posters, and thumbnail experiments that sharpen how I work
            with story, composition, and attention.
          </p>
        </div>
      </section>

      <section className="projects-section" aria-label="Fun projects">
        <div className="project-grid">
          {funProjects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
