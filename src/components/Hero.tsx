import { LocationStrip } from "@/components/LocationStrip";

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          I&apos;m Darshan, a UI/UX designer who builds products.
        </h1>
        <LocationStrip />
      </div>
    </section>
  );
}
