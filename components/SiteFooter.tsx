import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return <footer>
    <div><Image className="footer-logo" src="/rosey-baby-logo-reference.png" width={128} height={90} alt="Rosey Baby" /><p>300 S Jackson St<br />Starkville, MS 39759</p><Link href="https://www.google.com/maps/dir/?api=1&destination=300%20S%20Jackson%20St%2C%20Starkville%2C%20MS%2039759">Get directions ↗</Link></div>
    <div><p className="footer-label">Hours</p><p>Mon–Sat · 11 AM–10 PM<br />Sunday · Closed</p><p><Link href="/menu">Menu</Link><br/><Link href="/catering">Catering</Link><br/><Link href="/events">Starkville events</Link><br/><Link href="/starkville">Local guide</Link><br/><Link href="/careers">Careers</Link></p></div>
    <div><p className="footer-label">Contact</p><p><a href="tel:+16623241949">662-324-1949</a><br /><a href="mailto:meetyouonthetracks@gmail.com">meetyouonthetracks@gmail.com</a></p><p><Link href="https://www.opentable.com/r/rosey-baby-starkville">Reserve a table ↗</Link></p><div className="social-links"><a href="https://www.facebook.com/RoseyBabyStarkville/">Facebook</a><a href="https://www.instagram.com/roseybabystarkville/">Instagram</a><a href="https://x.com/RoseyBaby_stark">X</a><a href="https://untappd.com/v/rosey-baby/18903">Untappd</a></div></div>
    <div className="footer-legal"><p>© {new Date().getFullYear()} Rosey Baby</p><p><Link href="/privacy">Privacy Policy</Link> · <Link href="/accessibility">Accessibility</Link></p></div>
  </footer>;
}
