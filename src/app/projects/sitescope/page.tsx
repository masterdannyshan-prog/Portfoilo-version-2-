import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/SiteHeader";
import { siteScopeCaseStudyText } from "@/data/sitescope-case-study";

export const metadata: Metadata = {
  title: "SiteScope Full Case Study | Darshan",
  description:
    "The complete product design and build case study for SiteScope, a free website audit tool.",
};

const sectionTitles = [
  "Overview",
  "My Role",
  "Timeline",
  "The Problem",
  "Initial Observations",
  "Pain Points",
  "Market Research",
  "UX Research and Becoming My Users",
  "Competitor Research",
  "Design System",
  "Design Process",
  "Tools Used and What Each Does",
  "The Full Process — From Idea to Live Product",
  "Frontend Process — How It Was Built",
  "Backend Process — How It Was Built",
  "UX Rules Used",
  "Page-by-Page Breakdown",
  "UX Decisions Made",
  "Color System and Visual Decisions",
  "Final Designs",
  "Outcomes",
  "What I'd Do Differently",
  "Reflection",
  "What I Learned",
] as const;

type SectionTitle = (typeof sectionTitles)[number];

type CaseSection = {
  title: SectionTitle;
  lines: string[];
};

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseCaseStudy() {
  const lines = siteScopeCaseStudyText.split("\n");
  const titleSet = new Set<string>(sectionTitles);
  const sections: CaseSection[] = [];
  let current: CaseSection | null = null;

  for (const line of lines.slice(4)) {
    if (!line) continue;

    if (titleSet.has(line)) {
      current = { title: line as SectionTitle, lines: [] };
      sections.push(current);
      continue;
    }

    current?.lines.push(line);
  }

  return {
    sourceLabel: lines[0],
    title: lines[2],
    sections,
  };
}

const caseStudy = parseCaseStudy();

const chapters = [
  "Overview",
  "The Problem",
  "Market Research",
  "Design System",
  "The Full Process — From Idea to Live Product",
  "Frontend Process — How It Was Built",
  "UX Rules Used",
  "Final Designs",
  "What I'd Do Differently",
] as const satisfies readonly SectionTitle[];

const rowSections = new Set<SectionTitle>([
  "Pain Points",
  "Market Research",
  "UX Research and Becoming My Users",
  "Competitor Research",
  "Design System",
  "Tools Used and What Each Does",
  "Backend Process — How It Was Built",
  "UX Rules Used",
  "Page-by-Page Breakdown",
  "Outcomes",
  "What I'd Do Differently",
  "What I Learned",
]);

// Indices refer to the unchanged source lines within each section.
const pointRanges = new Map<SectionTitle, readonly [number, number]>([
  ["Pain Points", [0, 5]],
  ["Market Research", [1, 4]],
  ["UX Research and Becoming My Users", [3, 6]],
  ["Competitor Research", [1, 5]],
  ["Design System", [1, 5]],
  ["Tools Used and What Each Does", [0, 12]],
  ["Backend Process — How It Was Built", [2, 7]],
  ["UX Rules Used", [1, 7]],
  ["Page-by-Page Breakdown", [0, 5]],
  ["UX Decisions Made", [0, 4]],
  ["Color System and Visual Decisions", [0, 5]],
  ["Outcomes", [0, 6]],
  ["What I'd Do Differently", [0, 4]],
  ["What I Learned", [0, 3]],
]);

const compactSections = new Set<SectionTitle>(["My Role", "Timeline"]);

const mediaAfter = new Map<SectionTitle, string[]>([
  ["The Problem", ["Problem evidence or current audit workflow"]],
  ["Competitor Research", ["Competitive analysis or research board"]],
  ["Design Process", ["Landing page and report page explorations"]],
  ["The Full Process — From Idea to Live Product", ["Product process or build timeline"]],
  ["Frontend Process — How It Was Built", ["Frontend screens or component architecture"]],
  ["Backend Process — How It Was Built", ["Backend architecture or scan pipeline"]],
  [
    "Final Designs",
    ["Final landing page design", "Final audit report design", "Mobile product design"],
  ],
]);

function MediaSlot({ label, square = false }: { label: string; square?: boolean }) {
  return (
    <div
      className={`case-media-slot${square ? " case-media-slot--square" : ""}`}
      role="img"
      aria-label={label}
    >
      <span>{label}</span>
    </div>
  );
}

function SectionLines({ section }: { section: CaseSection }) {
  const blocks = [];
  const pointRange = pointRanges.get(section.title);

  for (let index = 0; index < section.lines.length; index += 1) {
    const line = section.lines[index];

    if (pointRange && index === pointRange[0]) {
      blocks.push(
        <ul className="case-point-list" key={`${section.title}-points`}>
          {section.lines.slice(pointRange[0], pointRange[1]).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>,
      );
      index = pointRange[1] - 1;
      continue;
    }

    if (/^Step \d+:/.test(line)) {
      const description = section.lines[index + 1];

      blocks.push(
        <div className="case-process-step" key={line}>
          <h3>{line}</h3>
          {description ? <p>{description}</p> : null}
        </div>,
      );

      if (description) index += 1;
      continue;
    }

    blocks.push(<p key={`${section.title}-${index}`}>{line}</p>);
  }

  return <div className="case-section-copy">{blocks}</div>;
}

export default function SiteScopeCaseStudy() {
  return (
    <main className="site-shell case-study-shell">
      <SiteHeader />

      <div className="case-study-page">
        <div className="case-study-layout">
          <aside className="case-study-aside">
            <Link className="case-back" href="/#work">
              <ArrowLeftIcon size={15} weight="regular" aria-hidden="true" />
              <span>Back</span>
            </Link>

            <nav className="case-toc" aria-label="Case study chapters">
              {chapters.map((chapter) => (
                <a href={`#${sectionId(chapter)}`} key={chapter}>
                  {chapter}
                </a>
              ))}
            </nav>
          </aside>

          <article className="case-study-article">
            <header className="case-hero">
              <div className="case-hero-heading">
                <p className="case-project-label">{caseStudy.sourceLabel}</p>
                <h1>{caseStudy.title}</h1>
                <a
                  className="case-live-link"
                  href="https://sitescope-opal-nine.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Live website</span>
                  <span className="case-live-link-url">sitescope-opal-nine.vercel.app</span>
                  <ArrowUpRightIcon size={17} weight="regular" aria-hidden="true" />
                </a>
              </div>

              <MediaSlot label="Hero image or product video" />
            </header>

            <div className="case-study-sections">
              {caseStudy.sections.map((section) => {
                const media = mediaAfter.get(section.title) ?? [];
                const sectionClasses = [
                  "case-section",
                  rowSections.has(section.title) ? "case-section--rows" : "",
                  compactSections.has(section.title) ? "case-section--compact" : "",
                  section.title === "The Full Process — From Idea to Live Product"
                    ? "case-section--process"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <section
                    id={sectionId(section.title)}
                    className={sectionClasses}
                    key={section.title}
                  >
                    <h2>{section.title}</h2>
                    <SectionLines section={section} />

                    {media.length === 1 ? <MediaSlot label={media[0]} /> : null}

                    {media.length > 1 ? (
                      <div className="case-media-grid">
                        {media.map((label) => (
                          <MediaSlot label={label} square key={label} />
                        ))}
                      </div>
                    ) : null}
                  </section>
                );
              })}
            </div>

            <footer className="case-study-end">
              <p>SiteScope case study</p>
              <Link href="/#work">Back to selected work</Link>
            </footer>
          </article>

          <div className="case-study-spacer" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
