/**
 * Projekt-Datenmodell (Strang C3.1). Quelle der Wahrheit für Home-Feature,
 * Übersicht (`/projekte`) und Detailseiten (`/projekte/[slug]`).
 *
 * Erweiterbar by design: neues Projekt = neuer Eintrag hier (+ Cover in
 * `public/projects/`). Xeno Expedition folgt, sobald das Spiel weit genug ist.
 * Content-Modell abgestimmt in der Vault-Notiz „Codemantix Hub – Informationsarchitektur (H1)".
 */

export type ProjectStatus = "live" | "in-arbeit" | "archiviert";

export type ProjectLink = { label: string; url: string };

export type ProjectImage = { src: string; alt: string; caption?: string };

export type ProjectSection = {
  title: string;
  body: string[];
  /** Optionales Bild unter dem Abschnittstext. */
  image?: ProjectImage;
};

export type Project = {
  slug: string;
  titel: string;
  tagline: string;
  rolle: string;
  jahr: string;
  status: ProjectStatus;
  stack: string[];
  cover: string;
  links: ProjectLink[];
  featured: boolean;
  order: number;
  /** Lead-Absatz auf der Detailseite. */
  intro: string;
  /** Story-Abschnitte der Case-Study. */
  sections: ProjectSection[];
  /** Kurzes Ergebnis / Stand. */
  ergebnis: string;
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "live",
  "in-arbeit": "in Arbeit",
  archiviert: "archiviert",
};

const projects: Project[] = [
  {
    slug: "cloudframe",
    titel: "Cloudframe",
    tagline: "Drohnen-Portfolio als filmisches Sucher-Erlebnis.",
    rolle: "Konzept · Design · Entwicklung",
    jahr: "2026",
    status: "in-arbeit",
    stack: ["Astro", "TypeScript", "D3.js", "Three.js", "Sharp"],
    cover: "/projects/cloudframe-cover.png",
    links: [],
    featured: true,
    order: 1,
    intro:
      "Cloudframe ist meine eigene Website für Drohnenaufnahmen — kein Standard-Portfolio, sondern eine app-artige Seite, die sich anfühlt wie der Blick durch den Kamera-Sucher.",
    sections: [
      {
        title: "Die Idee",
        body: [
          "Drohnenvideos verdienen mehr als eine Galerie-Kachel. Cloudframe stellt das visuelle Erlebnis in den Vordergrund: hochwertig, filmisch, mit einer eigenen Sucher-/HUD-Bildsprache statt Baukasten-Look.",
          "Die ganze Seite folgt einem Motiv — dem Blick durch die Kamera: Fadenkreuze, Fokus-Eckwinkel, ein REC-Overlay mit laufendem Timecode.",
        ],
        image: {
          src: "/projects/cloudframe-reschensee.jpg",
          alt: "Drohnenaufnahme des Kirchturms im Reschensee",
          caption: "Reschensee, Südtirol — eine der Locations auf der Karte.",
        },
      },
      {
        title: "Vier Views statt Unterseiten",
        body: [
          "Statt klassischer Menüpunkte schaltet man zwischen vier app-artigen Views um: Start (Hero mit Scroll-Scrubbing), Karte, Filme und Hardware.",
          "Die Hardware-View ersetzt bewusst eine „Über mich\"-Seite — statt Persönlichem ein interaktives Datenblatt der DJI Mini 4 Pro mit nummerierten Bauteil-Hotspots.",
        ],
      },
      {
        title: "Interaktive Europa-Karte",
        body: [
          "Herzstück ist eine mit D3.js gebaute Karte: Mausrad-Zoom, weiches Fly-to beim Pin-Klick, acht Locations mit Inline-Galerien.",
          "Ein Live-Geo-HUD zeigt die echten Koordinaten unter dem Cursor, ein Ziel-Fadenkreuz folgt der Maus — die Idee kam beim Bauen besonders gut an.",
        ],
        image: {
          src: "/projects/cloudframe-rhodos.jpg",
          alt: "Drohnenaufnahme einer Bucht auf Rhodos",
          caption: "Rhodos — Top-Down über der Bucht.",
        },
      },
      {
        title: "Technik",
        body: [
          "Gebaut mit Astro 7 (statisch und schnell) und TypeScript (strict). D3.js trägt die Karte, Three.js ein gelegentliches Drohnen-Flyby, sharp die Bild- und OG-Pipeline.",
          "Alle Animationen sind reduced-motion-fest — Bewegung ist Würze, kein Selbstzweck.",
        ],
      },
    ],
    ergebnis:
      "Eine Seite mit eigener Handschrift — filmisch, technisch, gebaut statt zusammengeklickt. Aktuell im Feinschliff vor dem Launch.",
  },
];

export function getProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
