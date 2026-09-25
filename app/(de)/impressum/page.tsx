import type { Metadata } from "next";
import { LegalPage, OperatorAddress } from "@/components/LegalPage";
import { operator } from "@/lib/operator";
import { CONTACT_FORM } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung und Kontakt für Codemantix – Jonas Kleinsorge.",
  alternates: { canonical: "/impressum/", languages: { de: "/impressum/", en: "/en/impressum/" } },
};

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <OperatorAddress />
      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${operator.email}`}>{operator.email}</a>
      </p>
      <p>
        Als weiteren Kontaktweg kannst du mein{" "}
        <a href={CONTACT_FORM}>Kontaktformular auf Kinokanon</a> nutzen. Kinokanon wird ebenfalls
        von mir betrieben; die Nachricht erreicht dasselbe Postfach.
      </p>
      <h2>Wirtschafts-Identifikationsnummer</h2>
      <p>Gemäß § 139c Abgabenordnung: {operator.wirtschaftsId}</p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </LegalPage>
  );
}
