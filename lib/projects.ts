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
    links: [
      {
        label: "cloudframe.codemantix.com",
        url: "https://cloudframe.codemantix.com",
      },
    ],
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
  {
    slug: "sonnensystem",
    titel: "Sonnensystem 3D",
    tagline: "Interaktives 3D-Modell des Sonnensystems im Browser.",
    rolle: "Konzept · Design · Entwicklung",
    jahr: "2026",
    status: "live",
    stack: ["React 19", "TypeScript", "Three.js", "R3F", "Vite"],
    cover: "/projects/sonnensystem-cover.jpg",
    links: [
      {
        label: "solarsystem.codemantix.com",
        url: "https://solarsystem.codemantix.com",
      },
    ],
    featured: true,
    order: 2,
    intro:
      "Sonnensystem 3D ist ein interaktives Modell unseres Sonnensystems im Browser — Sonne, alle acht Planeten und ihre wichtigsten Monde, frei erkundbar. Kein Lehrbuch-Diagramm, sondern eine echte 3D-Szene, die man anfliegen, durchsuchen und in der Zeit vor- und zurückdrehen kann.",
    sections: [
      {
        title: "Die Idee",
        body: [
          "Die meisten Sonnensystem-Visualisierungen sind entweder hübsch-aber-erfunden oder korrekt-aber-hässlich. Ich wollte beides: astronomisch plausibel und trotzdem schön anzusehen.",
          "Sonne, 8 Planeten und 18 Monde stehen als texturierte Kugeln in der Szene — für vier kleine Monde wie Phobos und Deimos sogar als echte NASA-3D-Modelle.",
        ],
        image: {
          src: "/projects/sonnensystem-system.jpg",
          alt: "Gesamtansicht des 3D-Sonnensystems mit Planetenbahnen",
          caption: "Das ganze System auf einen Blick — echte Bahnen, kein Kreis-Diagramm.",
        },
      },
      {
        title: "Astronomisch echt",
        body: [
          "Die Planeten laufen nicht auf fiktiven Kreisen, sondern auf echten J2000-Keplerbahnen. Über die Zeitsteuerung dreht man das ganze System vor und zurück — von Echtzeit bis 30 Tage pro Sekunde, mit einem Klick zurück auf Heute.",
          "Die Erde bekommt eine Tag-/Nacht-Seite mit Wolken und Atmosphäre, Saturn seine Ringe, die Sonne einen eigenen Shader.",
        ],
        image: {
          src: "/projects/sonnensystem-saturn.jpg",
          alt: "Saturn mit Ringen im 3D-Sonnensystem",
          caption: "Saturn mit Ringsystem — die Kamera folgt jedem gewählten Körper.",
        },
      },
      {
        title: "Erkunden statt Klicken",
        body: [
          "Eine Fokus-Kamera folgt jedem gewählten Himmelskörper weich. Ein Suchfeld filtert alle 24 Körper inklusive Monde, die Pfeiltasten schalten durch — und ein „Reise\"-Modus fährt automatisch durch das System.",
          "Jeder Zustand — Körper, Fokus, Ansicht, Datum — steht in der URL. Eine bestimmte Ansicht ist damit einfach teilbar.",
        ],
      },
      {
        title: "Technik",
        body: [
          "Gebaut mit React 19 und TypeScript auf react-three-fiber (Three.js), Vite als Build und Tailwind fürs UI. Deployment auf Vercel unter eigener Subdomain, DNS über Cloudflare.",
          "Dazu ein heller und dunkler Modus, ein Info-Panel mit maßstäblichem Größenvergleich zur Erde und versionierte Release-Notes.",
        ],
      },
    ],
    ergebnis:
      "Seit Juli 2026 live unter solarsystem.codemantix.com — die Kern-Feature-Runde ist abgeschlossen und abgenommen. Als Nächstes: Asset-Pipeline und Code-Splitting für schnellere Ladezeiten.",
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
