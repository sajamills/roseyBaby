import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Rosey Baby's commitment to an accessible website, and how to reach us about accessibility issues.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <article className="article-page">
        <header>
          <p className="eyebrow">Our commitment</p>
          <h1>Accessibility statement</h1>
          <p>
            We want roseybaby.com to be usable by everyone, including
            visitors using screen readers, keyboard navigation, or other
            assistive technology.
          </p>
        </header>
        <div className="article-body">
          <h2>What we&rsquo;re doing</h2>
          <p>
            We build with semantic HTML, keyboard-operable navigation and
            menus, visible focus states, descriptive image text, and a
            skip-to-content link, and we test with real keyboard and screen
            reader use. This is ongoing work, not a one-time checklist — we
            keep improving as we find issues.
          </p>
          <h2>Standard</h2>
          <p>
            We aim to meet the Web Content Accessibility Guidelines (WCAG)
            2.1 at Level AA where practical for a small restaurant website.
          </p>
          <h2>Let us know</h2>
          <p>
            If you run into anything on this site that&rsquo;s hard to use
            with assistive technology, tell us and we&rsquo;ll take a look.
            Call <a href="tel:+16623241949">662-324-1949</a> or email{" "}
            <a href="mailto:meetyouonthetracks@gmail.com">
              meetyouonthetracks@gmail.com
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
