import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "@/components/SiteHeader";
import { CaseHeroVideo } from "@/components/CaseHeroVideo";
import {
  ghostFrameCaseStudyText,
  ghostFrameCaseStudyTitle,
} from "@/data/ghost-frame-case-study";

type MediaEntry = {
  label: string;
  image?: string;
  alt?: string;
};

export const metadata: Metadata = {
  title: "Ghost Frame Full Case Study | Darshan",
  description:
    "The full product design and build case study for Ghost Frame, a browser-based image effects studio.",
};

const sectionTitles = [
  "Overview",
  "My Role",
  "Timeline",
  "The Problem I Was Solving",
  "What Ghost Frame Actually Does",
  "The Architecture Decision That Changed Everything",
  "Information Architecture",
  "Design System",
  "Landing Page Design",
  "Effects Page Design",
  "Editor UX",
  "The 30 Effects",
  "Responsive Design",
  "The Python Backend Decision (and Why I Abandoned It)",
  "The Auth Strategy",
  "Decisions I'd Revisit",
  "What I'm Proud Of",
  "The Role of AI-Assisted Development",
  "Reflection",
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
  const lines = ghostFrameCaseStudyText.split("\n");
  const titleSet = new Set<string>(sectionTitles);
  const sections: CaseSection[] = [];
  let current: CaseSection | null = null;

  // Skip the first line (document title). Remaining lines belong to sections.
  for (const line of lines.slice(1)) {
    if (!line) continue;

    if (titleSet.has(line)) {
      current = { title: line as SectionTitle, lines: [] };
      sections.push(current);
      continue;
    }

    current?.lines.push(line);
  }

  return { sections };
}

const caseStudy = parseCaseStudy();

const chapters = [
  "Overview",
  "The Problem I Was Solving",
  "What Ghost Frame Actually Does",
  "The Architecture Decision That Changed Everything",
  "Design System",
  "Landing Page Design",
  "Editor UX",
  "The 30 Effects",
  "The Python Backend Decision (and Why I Abandoned It)",
  "Decisions I'd Revisit",
  "Reflection",
] as const satisfies readonly SectionTitle[];

const tocLabels: Partial<Record<SectionTitle, string>> = {
  "The Problem I Was Solving": "The Problem",
  "What Ghost Frame Actually Does": "What It Does",
  "The Architecture Decision That Changed Everything": "Architecture Call",
  "Landing Page Design": "Landing Page",
  "The Python Backend Decision (and Why I Abandoned It)": "The Backend Rewrite",
  "Decisions I'd Revisit": "What I'd Revisit",
};

const compactSections = new Set<SectionTitle>(["My Role", "Timeline"]);

const subHeadings: Partial<Record<SectionTitle, Set<string>>> = {
  "Landing Page Design": new Set([
    "Preloader",
    "Hero",
    "What This Does Statement",
    "Sticky Outcome Strip",
    "Parallax Gallery",
    "Before After Slider",
    "Features Carousel",
    "How It Works",
  ]),
  "Editor UX": new Set([
    "Layout",
    "Drop Zone",
    "Sidebar: Source",
    "Sidebar: Effects",
    "Sidebar: Adjust",
    "Sidebar: Presets",
    "Sidebar: Export",
    "Status Bar",
    "AI Processing Overlay",
  ]),
};

const mediaAfter = new Map<SectionTitle, MediaEntry[]>([
  [
    "What Ghost Frame Actually Does",
    [
      {
        label: "Ghost Frame features section",
        image: "/images/case-studies/ghost-frame/features.png",
        alt: "Ghost Frame features and product overview section",
      },
    ],
  ],
  [
    "Landing Page Design",
    [
      {
        label: "Ghost Frame landing hero",
        image: "/images/case-studies/ghost-frame/hero.png",
        alt: "Ghost Frame landing page hero, Turn Images Into Something Different",
      },
    ],
  ],
  [
    "Effects Page Design",
    [
      {
        label: "Effects gallery page",
        image: "/images/case-studies/ghost-frame/effects.png",
        alt: "Ghost Frame effects page showing categorized effect cards",
      },
    ],
  ],
  [
    "Editor UX",
    [
      {
        label: "Editor interface",
        image: "/images/case-studies/ghost-frame/editor.png",
        alt: "Ghost Frame editor with canvas, sidebar and effect controls",
      },
    ],
  ],
  [
    "Responsive Design",
    [
      {
        label: "Mobile experience",
        image: "/images/case-studies/ghost-frame/mobile-hero.png",
        alt: "Ghost Frame landing page on mobile at 414 pixels wide",
      },
    ],
  ],
]);

function MediaSlot({
  label,
  image,
  alt,
}: {
  label: string;
  image?: string;
  alt?: string;
}) {
  if (image) {
    return (
      <figure
        className="case-media-slot case-media-slot--filled"
        aria-label={label}
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
    <div className="case-media-slot" role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}

function SectionLines({ section }: { section: CaseSection }) {
  const blocks: React.ReactNode[] = [];
  const subs = subHeadings[section.title];
  const lines = section.lines;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (subs?.has(line)) {
      blocks.push(
        <h3 key={`${section.title}-h3-${i}`} className="case-subheading">
          {line}
        </h3>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("* ")) {
        items.push(lines[i].slice(2));
        i += 1;
      }
      blocks.push(
        <ul className="case-point-list" key={`${section.title}-ul-${i}`}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i += 1;
      }
      blocks.push(
        <ol className="case-numbered-list" key={`${section.title}-ol-${i}`}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>,
      );
      continue;
    }

    blocks.push(<p key={`${section.title}-p-${i}`}>{line}</p>);
    i += 1;
  }

  return <div className="case-section-copy">{blocks}</div>;
}

export default function GhostFrameCaseStudy() {
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
                <p className="case-project-label">
                  Ghost Frame · Case Study · 2026
                </p>
                <h1>{ghostFrameCaseStudyTitle}</h1>
                <a
                  className="case-live-link"
                  href="https://ghost-frame-one.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Live website</span>
                  <span className="case-live-link-url">ghost-frame-one.vercel.app</span>
                  <ArrowUpRightIcon size={17} weight="regular" aria-hidden="true" />
                </a>
              </div>

              <CaseHeroVideo
                src="/videos/ghost-frame-hero.mp4"
                label="Ghost Frame product walkthrough"
              />
            </header>

            <div className="case-study-sections">
              {caseStudy.sections.map((section) => {
                const sectionClasses = [
                  "case-section",
                  compactSections.has(section.title)
                    ? "case-section--compact"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ");
                const media = mediaAfter.get(section.title) ?? [];

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
                  </section>
                );
              })}
            </div>

            <footer className="case-study-end">
              <p>Ghost Frame case study</p>
              <Link href="/#work">Back to selected work</Link>
            </footer>
          </article>

          <div className="case-study-spacer" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
