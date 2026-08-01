"use client";

import Link from "next/link";
import { useRef } from "react";
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
  const closeMobileMenu = () => mobileMenu.current?.removeAttribute("open");

  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Rosey Baby home">
        <Image src="/rosey-baby-logo-reference.png" width={128} height={90} priority alt="Rosey Baby" />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <Link className="header-cta" href="https://www.opentable.com/r/rosey-baby-starkville">Reserve</Link>
      <details className="mobile-menu" ref={mobileMenu}>
        <summary aria-label="Open navigation menu"><span /><span /><span /><b>Menu</b></summary>
        <nav aria-label="Mobile navigation">
          {navigation.map(([label, href]) => <Link href={href} key={href} onClick={closeMobileMenu}>{label}</Link>)}
          <Link className="mobile-menu-call" href="tel:+16623241949" onClick={closeMobileMenu}>Call 662-324-1949</Link>
        </nav>
      </details>
    </header>
  );
}
