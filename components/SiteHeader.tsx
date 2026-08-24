"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const navigation = [
  ["Menu", "/menu"],
  ["Crawfish", "/crawfish"],
  ["Beer wall", "/beer-wall"],
  ["Catering", "/catering"],
  ["Events", "/events"],
  ["Starkville", "/starkville"],
  ["Blog", "/blog"],
  ["Our story", "/our-story"],
  ["Visit", "/visit"],
] as const;

export default function SiteHeader() {
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const summaryButton = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const wasOpen = useRef(false);
  const closeMobileMenu = () => setOpen(false);

  useEffect(() => {
    if (open) {
      mobileMenu.current?.querySelector<HTMLAnchorElement>("nav a")?.focus();
    } else if (wasOpen.current) {
      summaryButton.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Link className="wordmark" href="/" aria-label="Rosey Baby home">
        <Image src="/rosey-baby-logo-reference.png" width={128} height={90} priority alt="Rosey Baby" />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <Link className="header-cta" href="https://www.opentable.com/r/rosey-baby-starkville">Reserve</Link>
      <details className="mobile-menu" ref={mobileMenu} open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
        <summary ref={summaryButton} aria-label={open ? "Close navigation menu" : "Open navigation menu"}><span /><span /><span /><b>Menu</b></summary>
        <nav aria-label="Mobile navigation">
          {navigation.map(([label, href]) => <Link href={href} key={href} onClick={closeMobileMenu}>{label}</Link>)}
          <Link className="mobile-menu-call" href="tel:+16623241949" onClick={closeMobileMenu}>Call 662-324-1949</Link>
        </nav>
      </details>
    </header>
  );
}
