import type { Metadata } from "next";
import { LegalPage, OperatorAddress } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How personal data is processed when you visit codemantix.com or contact Codemantix.",
  alternates: { canonical: "/en/datenschutz/", languages: { de: "/datenschutz/", en: "/en/datenschutz/" } },
};

export default function PrivacyNotice() {
  return (
    <LegalPage title="Privacy notice" locale="en">
      <p>This notice explains which personal data is processed when you visit codemantix.com or send an enquiry. It applies to this portfolio and services site. Linked applications have their own privacy notices.</p>
      <h2>Controller</h2>
      <OperatorAddress locale="en" />
      <h2>Providing and protecting the website</h2>
      <p>This site is delivered via Cloudflare Pages by Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA. When you access it, Cloudflare processes connection and access data needed for technical operation. This may include your IP address, access time, requested URL, browser and operating system details, and the referring page.</p>
      <p>This processing serves delivery, stability and security. The legal basis is Article 6(1)(f) GDPR; the legitimate interest is providing a reliable and secure website.</p>
      <p>Cloudflare’s <a href="https://www.cloudflare.com/cloudflare-customer-dpa/">Data Processing Addendum</a> forms part of its <a href="https://www.cloudflare.com/terms/">Self-Serve Subscription Agreement</a>. It also covers international transfers and related safeguards, including EU standard contractual clauses. Processing in the USA and other countries is possible.</p>
      <p>I do not maintain my own archive of visitor access logs. Cloudflare also processes network and security data for its own purposes. Retention depends on the purpose of processing, security needs and legal requirements; no single fixed period applies to every category. See <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare’s privacy policy</a> for more on end-user data and retention.</p>
      <h2>Cookies, fonts and analytics</h2>
      <p>The site sets no analytics or advertising cookies, tracks no visitors and has no user accounts. Font files and project images are delivered with the site. Visiting this site does not load fonts from Google Fonts or embedded social-media content.</p>
      <p>The hosting provider may set technical cookies for necessary security checks. Where strictly necessary for the service you requested, these are used under Section 25(2)(2) of the German Telecommunications Digital Services Data Protection Act (TDDDG); related personal-data processing protects the site under Article 6(1)(f) GDPR.</p>
      <h2 id="kontakt">Contacting me</h2>
      <p>Clicking an email link opens your email app. Only if you send a message will I process your sender address, message and any other information you provide to handle your enquiry. A prefilled subject or message is never sent automatically.</p>
      <p>The legal basis for precontractual or contractual enquiries is Article 6(1)(b) GDPR. For other enquiries, it is the legitimate interest in responding under Article 6(1)(f) GDPR.</p>
      <p>The email inbox is operated by ALL-INKL.COM – Neue Medien Münnich, owner René Münnich, Hauptstraße 68, 02742 Friedersdorf, Germany. Further details: <a href="https://all-inkl.com/datenschutzinformationen/">ALL-INKL privacy information</a>.</p>
      <p>Messages are deleted once the enquiry is resolved unless statutory retention duties or legitimate reasons to preserve legal claims apply. Business correspondence and contract documents may be subject to statutory retention periods.</p>
      <p>As an alternative, this site links to the contact form on my Kinokanon website. It is not embedded here. If you open and submit that form, its <a href="https://kinokanon.codemantix.com/en/datenschutz/#kontakt">contact-form privacy notice</a> applies.</p>
      <h2>Links to projects and other websites</h2>
      <p>Project previews are locally stored images. Your browser connects to an external website only when you follow its link. That website’s privacy information then applies.</p>
      <h2>Your rights</h2>
      <p>Subject to the legal requirements, you have rights of access (Article 15 GDPR), rectification (Article 16), erasure (Article 17), restriction of processing (Article 18) and data portability (Article 20).</p>
      <p>You may object to processing under Article 6(1)(f) GDPR on grounds relating to your particular situation (Article 21 GDPR). Contact me using the details above.</p>
      <p>You may lodge a complaint with a data protection supervisory authority (Article 77 GDPR), particularly at your habitual residence, workplace or the place of the alleged infringement. For North Rhine-Westphalia, this is the <a href="https://www.ldi.nrw.de/">State Commissioner for Data Protection and Freedom of Information</a>.</p>
      <p>No automated decision-making with legal or similarly significant effects takes place.</p>
    </LegalPage>
  );
}
