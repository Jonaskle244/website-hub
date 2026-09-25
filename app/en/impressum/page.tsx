import type { Metadata } from "next";
import { LegalPage, OperatorAddress } from "@/components/LegalPage";
import { operator } from "@/lib/operator";
import { CONTACT_FORM_EN } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "Legal provider information and contact details for Codemantix and Jonas Kleinsorge.",
  alternates: { canonical: "/en/impressum/", languages: { de: "/impressum/", en: "/en/impressum/" } },
};

export default function LegalNotice() {
  return (
    <LegalPage title="Legal notice" locale="en">
      <h2>Information under Section 5 of the German Digital Services Act (DDG)</h2>
      <OperatorAddress locale="en" />
      <h2>Contact</h2>
      <p>Email: <a href={`mailto:${operator.email}`}>{operator.email}</a></p>
      <p>You can also use my <a href={CONTACT_FORM_EN}>contact form on Kinokanon</a>. I operate Kinokanon as well, and your message reaches the same inbox.</p>
      <h2>German business identification number</h2>
      <p>Under Section 139c of the German Fiscal Code (Abgabenordnung): {operator.wirtschaftsId}</p>
      <h2>Consumer dispute resolution</h2>
      <p>I am neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration body.</p>
    </LegalPage>
  );
}
