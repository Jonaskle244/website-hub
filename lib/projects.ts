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
    slug: "kernwerk",
    titel: "KERNWERK",
    tagline:
      "Aus Partikeln wird Präzision – eine interaktive Industrie-Website auf Deutsch und Englisch.",
    rolle: "Designstudie · Konzept · Gestaltung · Entwicklung",
    jahr: "2026",
    status: "live",
    stack: ["WebGL", "Canvas", "JavaScript", "CSS"],
    cover: "/projects/kernwerk-cover.png",
    links: [{ label: "kernwerk.codemantix.com", url: "https://kernwerk.codemantix.com/" }],
    featured: true,
    order: 1,
    intro:
      "KERNWERK ist eine eigene Designstudie für einen fiktiven Präzisionsfertiger. Tausende Partikel formen beim Scrollen ein Aluminiumgehäuse. Die Reise führt durch das Bauteil in die Fertigung und weiter zu räumlichen Leistungskarten. Kein Kundenauftrag, sondern eine Arbeitsprobe für einen eigenständigen, interaktiven Firmenauftritt.",
    sections: [
      {
        title: "Vom Partikelfeld zum Bauteil",
        body: [
          "Aus einem losen Feld silberner und orangefarbener Partikel entsteht Schritt für Schritt ein Bauteil. Der Scrollfortschritt steuert die Formation und anschließend den bildbasierten Durchflug in die CNC-Fertigung.",
          "Die Animation lässt sich vorwärts und rückwärts erkunden oder automatisch abspielen. Das fertige Bauteil basiert auf einem Bild; es ist kein CAD-Modell.",
        ],
      },
      {
        title: "Eine Galerie in Bewegung",
        body: [
          "Fräsen, Drehen und Qualitätssicherung bekommen eigene räumliche Karten. Beim Wechsel zerfällt das zurückweichende Motiv in helle Bildfragmente. Mausbewegungen neigen die vordere Karte leicht und verschieben einen Lichtreflex.",
          "Danach wird die Seite ruhig: Eine Projektanfrage fasst die Eingaben lokal zu einem kopierbaren Entwurf zusammen. In dieser Demo werden keine Anfragen versendet.",
        ],
      },
      {
        title: "Zwei Sprachen, eine Bildwelt",
        body: [
          "Deutsch und Englisch lassen sich direkt umschalten – von den Szenentexten über die Bedienung bis zur Projektübersicht. Für schmale Ansichten sind Bildausschnitte, Typografie und Partikelmenge angepasst. Ein Standbildmodus bietet einen Zugang ohne Animation.",
          "Die Motive wurden mit KI erstellt und für die gemeinsame Bildwelt ausgewählt. WebGL erzeugt die Bauteilformation, Canvas die Bildfragmente und CSS die räumlichen Karten. Die Effekte entstehen im Browser; für KERNWERK wurde kein Higgsfield-Video verwendet.",
        ],
      },
    ],
    ergebnis:
      "Eine veröffentlichte, zweisprachige Designstudie mit scrollgesteuerter Partikelformation, räumlicher Leistungsgalerie und lokalem Anfrageentwurf. Die klassische Firmenansicht bleibt als zweite Perspektive erreichbar.",
  },
  {
    slug: "lodge",
    titel: "SEERUHE · Lodge",
    tagline: "Filmische Website für eine fiktive Lodge am See – eine eigene Designstudie.",
    rolle: "Designstudie · Konzept · Gestaltung · Entwicklung",
    jahr: "2026",
    status: "live",
    stack: ["HTML", "CSS", "JavaScript", "Scroll-Video"],
    cover: "/projects/lodge-cover.jpg",
    links: [{ label: "lodge.codemantix.com", url: "https://lodge.codemantix.com/" }],
    featured: true,
    order: 2,
    intro:
      "SEERUHE ist eine eigene Designstudie für eine fiktive Lodge zwischen Wald und Wasser. Die englischsprachige Website verbindet ruhige Typografie, warme Naturfarben und eine Kamerafahrt, die sich beim Scrollen entfaltet. Sie ist eine gestalterische Arbeitsprobe, kein Kundenauftrag und keine buchbare Unterkunft.",
    sections: [
      {
        title: "Ein Ort wird zum Erlebnis",
        body: [
          "Die Seite soll schon beim ersten Blick das Gefühl eines Rückzugsorts vermitteln. Großzügige Bilder, zurückhaltende Navigation und kurze Texte lassen der Landschaft und der Architektur Raum.",
          "Vom See führt die Reise näher an die Terrasse und anschließend in den Innenraum. Gestaltung und Bewegung folgen dieser kleinen Geschichte.",
        ],
      },
      {
        title: "Bewegung durch Scrollen",
        body: [
          "Eine zehnsekündige Kamerafahrt folgt dem Scrollfortschritt. So bestimmen Besucher selbst, wie schnell sie sich der Lodge nähern. Die Darstellung bleibt auf maximal 1280 Pixel begrenzt, damit Bild und Text zusammenwirken.",
          "Ein Standbildmodus bietet einen ruhigen Zugang zu den Inhalten. Der Innenraum erscheint als eigenständiges Bildmotiv.",
        ],
        image: {
          src: "/projects/lodge-interior.jpg",
          alt: "KI-generierter Innenraum der fiktiven SEERUHE-Lodge mit Blick auf den See",
          caption: "Synthetisches Innenraummotiv der Designstudie.",
        },
      },
      {
        title: "Von der Bildidee zur Website",
        body: [
          "Die Bildwelt und die Kamerafahrt wurden mit KI erstellt, ausgewählt und für die Website aufbereitet. Aus den Schlüsselbildern entstand eine zusammenhängende visuelle Richtung; das Video wurde auf 4K hochskaliert und für die Webauslieferung komprimiert.",
          "Die Umsetzung verwendet HTML, CSS und JavaScript. Die Website wird über Cloudflare ausgeliefert und lässt sich auf schmalen wie großen Bildschirmen erkunden.",
        ],
      },
    ],
    ergebnis:
      "Seit September 2026 live: eine englischsprachige Konzeptwebsite mit scrollgesteuerter Kamerafahrt, Standbildmodus und eigener Bildwelt. Die Arbeitsprobe zeigt, wie aus einer fiktiven Unterkunft ein individueller Webauftritt entsteht.",
  },
  {
    slug: "cloudframe",
    titel: "Cloudframe",
    tagline: "Drohnen-Portfolio als filmisches Sucher-Erlebnis.",
    rolle: "Konzept · Design · Entwicklung",
    jahr: "2026",
    status: "live",
    stack: ["Astro", "TypeScript", "D3.js", "Three.js", "Sharp"],
    cover: "/projects/cloudframe-cover.png",
    links: [
      {
        label: "cloudframe.codemantix.com",
        url: "https://cloudframe.codemantix.com",
      },
    ],
    featured: true,
    order: 3,
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
          'Die Hardware-View ersetzt bewusst eine „Über mich"-Seite — statt Persönlichem ein interaktives Datenblatt der DJI Mini 4 Pro mit nummerierten Bauteil-Hotspots.',
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
      "Seit Juli 2026 live: ein eigener Auftritt für meine Drohnenaufnahmen mit interaktiver Karte, Filmen und Galerien. Gestaltung und Entwicklung stammen von mir; die Seite wird bei Bedarf weiterentwickelt.",
  },
  {
    slug: "kinokanon",
    titel: "Kinokanon",
    tagline: "Filme vergleichen, eigene Rankings erstellen und den passenden Charakter entdecken.",
    rolle: "Eigenes Projekt · Konzept · Design · Entwicklung",
    jahr: "2026",
    status: "live",
    stack: ["Astro", "TypeScript", "React", "Cloudflare"],
    cover: "/projects/kinokanon-cover.png",
    links: [{ label: "kinokanon.codemantix.com", url: "https://kinokanon.codemantix.com/de/" }],
    featured: true,
    order: 4,
    intro:
      "Kinokanon ist mein eigenes Filmprojekt: eine Website, auf der Besucher Filme vergleichen, ein persönliches Ranking erstellen und ihr Ergebnis teilen können. Dazu kommen Filmreihenfolgen und Charakterquizze – auf Deutsch und Englisch.",
    sections: [
      {
        title: "Die Idee",
        body: [
          "Über Lieblingsfilme lässt sich lange reden. Kinokanon macht daraus etwas zum Ausprobieren: Du entscheidest zwischen zwei Filmen, die Anwendung baut daraus deine persönliche Reihenfolge.",
          "Mein Ziel war eine Website, die redaktionelle Inhalte mit einer einfach bedienbaren Anwendung verbindet. Gestaltung, Inhalte und Entwicklung liegen bei mir; Kinokanon ist kein Kundenauftrag.",
        ],
      },
      {
        title: "Vom Vergleich zum eigenen Ranking",
        body: [
          "Statt eine lange Liste von Hand zu sortieren, vergleichst du Filme paarweise. Ein Zwischenstand im Browser hilft dabei, das Ranking fortzusetzen.",
          "Das Ergebnis lässt sich als Link teilen. So wird aus einer persönlichen Auswahl eine Einladung, selbst zu sortieren.",
        ],
      },
      {
        title: "Zwei Sprachen, mehrere Einstiege",
        body: [
          "Die Website ist auf Deutsch und Englisch verfügbar. Neben dem Ranking gibt es Orientierung zu Filmreihenfolgen und eigene Charakterquizze für Marvel und Star Wars.",
          "Die Quizze haben jeweils eigene Fragen und Ergebnisse. Antworten bleiben beim Sprachwechsel erhalten, damit Besucher nicht von vorn beginnen müssen.",
        ],
        image: {
          src: "/projects/kinokanon-quiz.png",
          alt: "Star-Wars-Charakterquiz auf Kinokanon",
          caption: "Echte Website-Ansicht: das eigenständige Star-Wars-Quiz.",
        },
      },
      {
        title: "Gestaltung und Umsetzung",
        body: [
          "Klare Typografie, dunkle Flächen und rote Akzente geben der Seite eine eigene visuelle Identität. Der Einstieg führt direkt zur Interaktion; weiterführende Filminformationen bleiben erreichbar.",
          "Astro und TypeScript bilden die Grundlage, React trägt die Ranking-Interaktion. Die Veröffentlichung läuft über Cloudflare. Statische Inhalte und dynamische Funktionen werden passend zu ihrem Zweck kombiniert.",
        ],
      },
    ],
    ergebnis:
      "Seit September 2026 live: eine zweisprachige Film-Website mit interaktiven Rankings, teilbaren Ergebnissen und Charakterquizzen. Die Arbeitsprobe zeigt sowohl individuelle Gestaltung als auch die Entwicklung einer nutzbaren Web-Anwendung.",
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
    order: 5,
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
          'Eine Fokus-Kamera folgt jedem gewählten Himmelskörper weich. Ein Suchfeld filtert alle 24 Körper inklusive Monde, die Pfeiltasten schalten durch — und ein „Reise"-Modus fährt automatisch durch das System.',
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
