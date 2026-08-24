import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Rosey Baby collects and uses information from visitors to roseybaby.com.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <article className="article-page">
        <header>
          <p className="eyebrow">Last updated August 2026</p>
          <h1>Privacy Policy</h1>
          <p>
            This page explains what information roseybaby.com collects and
            how it&rsquo;s used. We keep this simple: we&rsquo;re a restaurant,
            not a data company.
          </p>
        </header>
        <div className="article-body">
          <h2>What we collect</h2>
          <p>
            This site uses Google Analytics (GA4) to understand how visitors
            use the site — pages viewed, general location by city/region, and
            actions like clicking to call, get directions, or start an
            online form. This data is aggregated and not used to identify
            individual visitors.
          </p>
          <p>
            If you submit a catering, crawfish boil, or bartending inquiry
            through one of our Typeform-powered forms, the information you
            provide (name, contact details, and your event details) is sent
            directly to our team to respond to your request. We don&rsquo;t
            use it for anything else.
          </p>
          <h2>What we don&rsquo;t do</h2>
          <p>
            We don&rsquo;t sell or rent visitor information to third parties.
            We don&rsquo;t run third-party ad-tracking scripts on this site.
          </p>
          <h2>Third-party links</h2>
          <p>
            Links to OpenTable, Typeform, Untappd, and our social profiles
            take you to services with their own privacy policies. This
            policy only covers roseybaby.com itself.
          </p>
          <h2>Questions</h2>
          <p>
            If you have a question about this policy, call us at{" "}
            <a href="tel:+16623241949">662-324-1949</a> or email{" "}
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
