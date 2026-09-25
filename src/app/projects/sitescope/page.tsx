import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/SiteHeader";
import { siteScopeCaseStudyText } from "@/data/sitescope-case-study";

type MediaEntry = {
  label: string;
  image?: string;
  alt?: string;
};

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
  "The Full Process - From Idea to Live Product",
  "Frontend Process - How It Was Built",
  "Backend Process - How It Was Built",
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
  "The Full Process - From Idea to Live Product",
  "Frontend Process - How It Was Built",
  "UX Rules Used",
  "Final Designs",
  "What I'd Do Differently",
] as const satisfies readonly SectionTitle[];

const tocLabels: Partial<Record<SectionTitle, string>> = {
  "The Full Process - From Idea to Live Product": "The Full Process",
  "Frontend Process - How It Was Built": "Frontend Build",
};

const rowSections = new Set<SectionTitle>([
  "Pain Points",
  "Market Research",
  "UX Research and Becoming My Users",
  "Competitor Research",
  "Design System",
  "Tools Used and What Each Does",
  "Backend Process - How It Was Built",
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
  ["Backend Process - How It Was Built", [2, 7]],
  ["UX Rules Used", [1, 7]],
  ["Page-by-Page Breakdown", [0, 5]],
  ["UX Decisions Made", [0, 4]],
  ["Color System and Visual Decisions", [0, 5]],
  ["Outcomes", [0, 6]],
  ["What I'd Do Differently", [0, 4]],
  ["What I Learned", [0, 3]],
]);

const compactSections = new Set<SectionTitle>(["My Role", "Timeline"]);

const mediaAfter = new Map<SectionTitle, MediaEntry[]>([
  [
    "Design Process",
    [
      {
        label: "SiteScope landing page in full",
        image: "/images/case-studies/sitescope/landing-full.png",
        alt: "SiteScope landing page, full scroll - hero, features, reports section, and CTA",
      },
    ],
  ],
  [
    "The Full Process - From Idea to Live Product",
    [
      {
        label: "SiteScope analysis section",
        image: "/images/case-studies/sitescope/analysis.png",
        alt: "SiteScope analysis section explaining what the tool measures",
      },
    ],
  ],
  [
    "Frontend Process - How It Was Built",
    [
      {
        label: "SiteScope features section",
        image: "/images/case-studies/sitescope/features.png",
        alt: "SiteScope features section - Catch issues before your users do",
      },
    ],
  ],
  [
    "Final Designs",
    [
      {
        label: "Final landing page - desktop",
        image: "/images/case-studies/sitescope/hero.png",
        alt: "SiteScope final landing page hero on desktop",
      },
      {
        label: "Reports section - desktop",
        image: "/images/case-studies/sitescope/reports.png",
        alt: "SiteScope reports section on desktop showing sample audit output",
      },
      {
        label: "Mobile experience",
        image: "/images/case-studies/sitescope/mobile-hero.png",
        alt: "SiteScope landing page on mobile at 414 pixels wide",
      },
    ],
  ],
]);

function MediaSlot({
  label,
  square = false,
  image,
  alt,
}: {
  label: string;
  square?: boolean;
  image?: string;
  alt?: string;
}) {
  if (image) {
    return (
      <figure
        className={`case-media-slot case-media-slot--filled${
          square ? " case-media-slot--square" : ""
        }`}
      >
        <Image
          src={image}
          alt={alt ?? label}
          fill
          sizes="(max-width: 760px) 100vw, 768px"
        />
      </figure>
    );
  }

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
                  {tocLabels[chapter] ?? chapter}
                </a>
              ))}
            </nav>
          </aside>

          <article className="case-study-article">
            <header className="case-hero">
              <div className="case-hero-heading">
                <p className="case-project-label">SiteScope · Case Study · 2026</p>
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

              <MediaSlot
                label="SiteScope landing page"
                image="/images/case-studies/sitescope/hero.png"
                alt="SiteScope landing page hero - See your site as the world does"
              />
            </header>

            <div className="case-study-sections">
              {caseStudy.sections.map((section) => {
                const media = mediaAfter.get(section.title) ?? [];
                const sectionClasses = [
                  "case-section",
                  rowSections.has(section.title) ? "case-section--rows" : "",
                  compactSections.has(section.title) ? "case-section--compact" : "",
                  section.title === "The Full Process - From Idea to Live Product"
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

                    {media.length === 1 ? (
                      <MediaSlot
                        label={media[0].label}
                        image={media[0].image}
                        alt={media[0].alt}
                      />
                    ) : null}

                    {media.length > 1 ? (
                      <div className="case-media-grid">
                        {media.map((entry) => (
                          <MediaSlot
                            label={entry.label}
                            image={entry.image}
                            alt={entry.alt}
                            square
                            key={entry.label}
                          />
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
