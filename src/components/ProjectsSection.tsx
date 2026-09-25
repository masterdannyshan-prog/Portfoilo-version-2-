import Image from "next/image";
import { projects, type Project } from "@/data/projects";
import { CursorFillLabel } from "@/components/CursorFillLabel";

export function ProjectsSection() {
  return (
    <section id="work" className="projects-section" aria-labelledby="projects-title">
      <h2 id="projects-title" className="sr-only">Selected projects</h2>

      <p className="section-label">Selected Work - 2024 / 2026</p>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>
    </section>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const opensNewTab = project.href?.startsWith("http");

  return (
    <article id={`project-${project.slug}`} className="project-card">
      {project.href ? (
        <a
          className="project-card-link"
          href={project.href}
          target={opensNewTab ? "_blank" : undefined}
          rel={opensNewTab ? "noreferrer" : undefined}
          aria-label={`${project.linkLabel}: ${project.title}`}
        >
          <ProjectContent project={project} />
        </a>
      ) : (
        <div className="project-card-link project-card-link--pending">
          <ProjectContent project={project} />
        </div>
      )}
    </article>
  );
}

function ProjectContent({ project }: { project: Project }) {
  const mediaStyle = project.mediaBackground
    ? { background: project.mediaBackground }
    : undefined;
  const imageStyle: React.CSSProperties = {};
  if (project.objectFit) imageStyle.objectFit = project.objectFit;
  if (project.objectPosition) imageStyle.objectPosition = project.objectPosition;

  return (
    <>
      <div className="project-media" style={mediaStyle}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 760px) 100vw, 50vw"
          priority={project.slug === "sitescope"}
          unoptimized={project.image.startsWith("https://")}
          style={Object.keys(imageStyle).length > 0 ? imageStyle : undefined}
        />
        <CursorFillLabel showArrow={Boolean(project.href)}>
          {project.href ? "View project" : "Case study soon"}
        </CursorFillLabel>
      </div>

      <div className="project-caption">
        <h3>{project.title}</h3>
        <p>
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.status}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </p>
      </div>
    </>
  );
}
