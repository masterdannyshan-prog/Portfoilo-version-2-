import Image from "next/image";

const tools = [
  { name: "Figma", icon: "figma" },
  { name: "Framer", icon: "framer" },
  { name: "Photoshop", icon: "adobephotoshop" },
  { name: "Illustrator", icon: "adobeillustrator" },
  { name: "After Effects", icon: "adobeaftereffects" },
  { name: "DaVinci Resolve", icon: "davinciresolve" },
  { name: "Cursor", icon: "cursor" },
  { name: "Claude AI", icon: "anthropic" },
];

const experience = [
  {
    period: "May 2025 - April 2026",
    role: "UI/UX Designer",
    company: "Purple Merit",
  },
  {
    period: "Aug 2024 - Nov 2024",
    role: "Junior Designer",
    company: "Excrin Digital Lab",
  },
];

const education = [
  {
    period: "2023 - 2025",
    course: "UI/UX & Graphic Design Certification",
    school: "Image Creative Education",
  },
  {
    period: "2020 - 2023",
    course: "Bachelor of Commerce",
    school: "University of Madras",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <p className="section-label">About Darshan</p>

      <div className="about-combined">
        {/* Left: Photo */}
        <figure className="about-portrait-new">
          <Image
            src="/images/profile/darshan-profile.png"
            alt="Darshan, UI/UX designer and product builder"
            fill
            sizes="(max-width: 760px) calc(100vw - 40px), 260px"
          />
        </figure>

        {/* Center: Headline + bio + education */}
        <div className="about-center">
          <h2 id="about-title">
            I design products <em>and</em> build them.
          </h2>

          <div className="about-copy">
            <p className="about-lede">
              I&apos;m Darshan - a UI/UX designer in Chennai who ships the
              things he draws. Figma to production, in one head.
            </p>
            <p>
              Across product design, visual systems, and frontend build. Recent
              work: SiteScope, a free website audit tool, and Ghost Frame, a
              browser-based image effects playground.
            </p>
          </div>

          <dl className="about-facts">
            <div>
              <dt>Based in</dt>
              <dd>Chennai, India</dd>
            </div>
          </dl>

          <div className="about-edu">
            <h3 className="about-subhead">Education</h3>
            {education.map((item) => (
              <div className="about-entry" key={item.course}>
                <p className="about-entry-period">{item.period}</p>
                <p className="about-entry-title">{item.course}</p>
                <p className="about-entry-sub">{item.school}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tools + Experience */}
        <div className="about-right">
          <div className="about-tools-block">
            <h3 className="about-subhead">Tools</h3>
            <div className="tools-icon-grid">
              {tools.map((tool) => (
                <div className="tool-badge" key={tool.name} title={tool.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.simpleicons.org/${tool.icon}/ffffff`}
                    alt={tool.name}
                    width={26}
                    height={26}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="about-exp-block">
            <h3 className="about-subhead">Experience</h3>
            {experience.map((item) => (
              <div className="about-entry" key={item.company}>
                <p className="about-entry-period">{item.period}</p>
                <p className="about-entry-title">{item.role}</p>
                <p className="about-entry-sub">{item.company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
