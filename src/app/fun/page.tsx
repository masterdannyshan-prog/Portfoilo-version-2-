import type { Metadata } from "next";
import { FunProjectsSection } from "@/components/FunProjectsSection";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Fun | Darshan",
  description: "Darshan's creative experiments across motion, posters, and thumbnails.",
};

export default function FunPage() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <FunProjectsSection />
    </main>
  );
}
