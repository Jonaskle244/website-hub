import type { Metadata } from "next";
import { LegalPage, OperatorAddress } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Informationen zur Datenverarbeitung beim Besuch von codemantix.com und bei einer Kontaktaufnahme.",
  alternates: { canonical: "/datenschutz/", languages: { de: "/datenschutz/", en: "/en/datenschutz/" } },
};

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutz">
      <p>
        Hier erfährst du, welche personenbezogenen Daten beim Besuch von codemantix.com und bei
        einer Anfrage verarbeitet werden. Die Hinweise gelten für diesen Portfolio- und
        Leistungsauftritt; verlinkte Anwendungen haben eigene Datenschutzhinweise.
      </p>
      <h2>Verantwortlicher</h2>
      <OperatorAddress />
      <h2>Bereitstellung und Schutz der Website</h2>
      <p>
        Diese Website wird über Cloudflare Pages von Cloudflare, Inc., 101 Townsend Street, San
        Francisco, CA 94107, USA, ausgeliefert. Beim Abruf verarbeitet Cloudflare technisch
        erforderliche Verbindungs- und Zugriffsdaten. Dazu können IP-Adresse, Zeitpunkt, angefragte
        Adresse, Browser- und Betriebssysteminformationen sowie die zuvor besuchte Seite gehören.
      </p>
      <p>
        Die Verarbeitung dient der Auslieferung, Stabilität und Sicherheit der Website.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; das berechtigte Interesse liegt in einem
        zuverlässigen und geschützten Webangebot.
      </p>
      <p>
        Cloudflares{" "}
        <a href="https://www.cloudflare.com/cloudflare-customer-dpa/">
          Auftragsverarbeitungsvertrag
        </a>{" "}
        ist Bestandteil der{" "}
        <a href="https://www.cloudflare.com/terms/">Self-Service-Nutzungsbedingungen</a>. Er regelt
        auch internationale Übermittlungen und die dafür vorgesehenen Schutzmaßnahmen,
        einschließlich EU-Standardvertragsklauseln. Eine Verarbeitung in den USA und weiteren
        Ländern ist möglich.
      </p>
      <p>
        Es wird kein eigenes Archiv von Besucher-Zugriffsprotokollen geführt. Cloudflare verarbeitet
        auch Netzwerk- und Sicherheitsdaten für eigene Zwecke. Die Dauer richtet sich nach
        Verarbeitungszweck, Sicherheitsbedarf und gesetzlichen Anforderungen; eine einheitliche
        feste Frist für sämtliche Daten wird nicht genannt. Weitere Informationen enthält die{" "}
        <a href="https://www.cloudflare.com/privacypolicy/">Datenschutzerklärung von Cloudflare</a>,
        insbesondere zu Endnutzerdaten und Aufbewahrung.
      </p>
      <h2>Cookies, Schriften und Besuchermessung</h2>
      <p>
        Die Anwendung setzt keine Analyse- oder Werbe-Cookies ein und verwendet weder
        Besuchertracking noch ein Nutzerkonto. Schriftdateien und Projektbilder werden mit der
        Website ausgeliefert; beim Seitenbesuch werden keine Schriften von Google Fonts und keine
        eingebetteten Social-Media-Inhalte geladen.
      </p>
      <p>
        Der Hosting-Anbieter kann bei notwendigen Sicherheitsprüfungen technische Cookies einsetzen.
        Soweit diese für den angefragten Dienst unbedingt erforderlich sind, erfolgt ihr Einsatz auf
        Grundlage von § 25 Abs. 2 Nr. 2 TDDDG; die zugehörige Verarbeitung personenbezogener Daten
        dient dem Schutz der Website nach Art. 6 Abs. 1 lit. f DSGVO.
      </p>
      <h2 id="kontakt">Kontaktaufnahme</h2>
      <p>
        Beim Klick auf einen E-Mail-Link öffnet sich dein Mailprogramm. Erst wenn du eine Nachricht
        versendest, werden Absenderadresse, Nachrichteninhalt und gegebenenfalls weitere von dir
        mitgeteilte Angaben zur Bearbeitung deiner Anfrage verarbeitet. Eine vorbereitete
        Betreffzeile oder Nachricht wird nicht automatisch versendet.
      </p>
      <p>
        Rechtsgrundlage ist bei vorvertraglichen oder vertraglichen Anfragen Art. 6 Abs. 1 lit. b
        DSGVO, bei anderen Anliegen das berechtigte Interesse an der Beantwortung nach Art. 6 Abs. 1
        lit. f DSGVO.
      </p>
      <p>
        Das E-Mail-Postfach wird bei ALL-INKL.COM – Neue Medien Münnich, Inhaber René Münnich,
        Hauptstraße 68, 02742 Friedersdorf, Deutschland, betrieben. Näheres:{" "}
        <a href="https://all-inkl.com/datenschutzinformationen/">
          Datenschutzinformationen von ALL-INKL
        </a>
        .
      </p>
      <p>
        Nachrichten werden gelöscht, sobald die Bearbeitung abgeschlossen ist und keine gesetzlichen
        Aufbewahrungspflichten oder berechtigten Gründe zur Sicherung von Rechtsansprüchen
        entgegenstehen. Bei geschäftlicher Korrespondenz oder Vertragsunterlagen können gesetzliche
        Aufbewahrungsfristen gelten.
      </p>
      <p>
        Als Alternative ist das Kontaktformular auf meiner Website Kinokanon verlinkt. Es wird nicht
        hier eingebettet. Beim Öffnen und Absenden gelten die dortigen{" "}
        <a href="https://kinokanon.codemantix.com/de/datenschutz/#kontakt">
          Datenschutzhinweise zum Formular
        </a>
        .
      </p>
      <h2>Links zu Projekten und anderen Websites</h2>
      <p>
        Projektvorschauen sind lokal gespeicherte Bilder. Erst beim Folgen eines externen Links
        stellt dein Browser eine Verbindung zur jeweiligen Website her. Für deren Datenverarbeitung
        gelten die dortigen Datenschutzhinweise.
      </p>
      <h2>Deine Rechte</h2>
      <p>
        Unter den gesetzlichen Voraussetzungen hast du das Recht auf Auskunft (Art. 15 DSGVO),
        Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18) und
        Datenübertragbarkeit (Art. 20).
      </p>
      <p>
        Du kannst einer Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aus Gründen deiner
        besonderen Situation widersprechen (Art. 21 DSGVO). Wende dich dazu an den oben genannten
        Kontakt.
      </p>
      <p>
        Du kannst dich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO),
        insbesondere am Ort deines gewöhnlichen Aufenthalts, deines Arbeitsplatzes oder des
        vermuteten Verstoßes. Für Nordrhein-Westfalen ist dies die{" "}
        <a href="https://www.ldi.nrw.de/">
          Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen
        </a>
        .
      </p>
      <p>
        Es findet keine automatisierte Entscheidungsfindung mit rechtlicher oder vergleichbar
        erheblicher Wirkung statt.
      </p>
    </LegalPage>
  );
}
