import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <p className="section-label">About Darshan</p>

      <div className="about-content">
        <figure className="about-portrait">
          <Image
            src="/images/profile/darshan-profile.png"
            alt="Darshan, UI/UX designer and product builder"
            fill
            sizes="(max-width: 760px) calc(100vw - 40px), 320px"
          />
        </figure>

        <div className="about-details">
          <h2 id="about-title">
            I design products <em>and</em> build them.
          </h2>

          <div className="about-copy">
            <p className="about-lede">
              I&apos;m Darshan - a UI/UX designer in Chennai who ships the things
              he draws. Figma to production, in one head.
            </p>
            <p>
              Shipping since 2024, across product design, visual systems, and
              frontend build. Recent work: SiteScope, a free website audit tool,
              and Ghost Frame, a browser-based image effects playground.
            </p>
          </div>

          <dl className="about-facts">
            <div>
              <dt>Based in</dt>
              <dd>Chennai, India</dd>
            </div>
            <div>
              <dt>Shipping since</dt>
              <dd>2024</dd>
            </div>
            <div>
              <dt>Current focus</dt>
              <dd>Product design + build</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
