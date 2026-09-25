import { getProjects, type Project, type ProjectSection, type ProjectStatus } from "./projects";

export const STATUS_LABEL_EN: Record<ProjectStatus, string> = {
  live: "live",
  "in-arbeit": "in progress",
  archiviert: "archived",
};

type EnglishProject = Pick<Project, "tagline" | "rolle" | "intro" | "ergebnis"> & {
  titel?: string;
  sections: (Pick<ProjectSection, "title" | "body"> & { image?: { alt: string; caption?: string } })[];
};

const copy: Record<string, EnglishProject> = {
  kernwerk: {
    tagline: "From particles to precision: an interactive industrial website in German and English.",
    rolle: "Concept study · Concept · Design · Development",
    intro: "KERNWERK is a self-initiated concept study for a fictional precision manufacturer. Thousands of particles form an aluminium housing as you scroll. The journey moves through the component into production and then into a gallery of dimensional service cards. It is a portfolio piece, not client work.",
    sections: [
      { title: "From particles to component", body: [
        "A loose field of silver and orange particles gradually becomes a component. Scroll progress controls the formation, followed by an image-based journey into CNC production.",
        "You can explore the animation forwards and backwards or let it play automatically. The finished component is based on an image; it is not a CAD model."
      ] },
      { title: "A gallery in motion", body: [
        "Milling, turning and quality assurance each have their own dimensional card. As cards change, the outgoing image breaks into bright fragments. Pointer movement gently tilts the front card and shifts a light reflection.",
        "The page then settles down: a project enquiry combines the visitor's input into a draft they can copy. This demo does not send enquiries."
      ] },
      { title: "Two languages, one visual world", body: [
        "Visitors can switch between German and English throughout the site, from scene copy and controls to the project overview. Image crops, typography and particle count are adjusted for narrow screens. A still-image mode offers access without animation.",
        "The visuals were created with AI and selected to form one coherent world. WebGL generates the component formation, Canvas the image fragments, and CSS the dimensional cards. These effects run in the browser; no Higgsfield video was used for KERNWERK."
      ] }
    ],
    ergebnis: "A published bilingual concept study with a scroll-driven particle formation, dimensional service gallery and local enquiry draft. A conventional company view is available as a second perspective."
  },
  lodge: {
    tagline: "A cinematic website for a fictional lakeside lodge: a self-initiated concept study.",
    rolle: "Concept study · Concept · Design · Development",
    intro: "SEERUHE is a self-initiated concept study for a fictional lodge between forest and water. Its English-language site combines calm typography, warm natural colours and a camera move controlled by scrolling. It is a design portfolio piece, not client work or a bookable property.",
    sections: [
      { title: "Turning a place into an experience", body: [
        "The first view aims to convey the feeling of a retreat. Large images, restrained navigation and short copy leave room for the landscape and architecture.",
        "The journey moves from the lake towards the terrace and then inside. Design and motion follow this simple story."
      ] },
      { title: "Motion controlled by scrolling", body: [
        "A ten-second camera move follows scroll progress, so visitors decide how quickly they approach the lodge. The visual is limited to 1280 pixels wide to keep imagery and copy working together.",
        "A still-image mode offers a quieter way to explore the content. The interior also appears as its own visual."
      ], image: { alt: "AI-generated interior of the fictional SEERUHE lodge overlooking the lake", caption: "Synthetic interior visual from the concept study." } },
      { title: "From image idea to website", body: [
        "The visual world and camera move were created with AI, selected and prepared for the site. Key frames established a coherent direction; the video was upscaled to 4K and compressed for web delivery.",
        "The implementation uses HTML, CSS and JavaScript. Cloudflare serves the site, which can be explored on narrow and wide screens."
      ] }
    ],
    ergebnis: "Live since September 2026: an English-language concept site with a scroll-controlled camera move, still-image mode and distinct visual world. It shows how a fictional property can become a custom web experience."
  },
  cloudframe: {
    tagline: "A drone portfolio designed as a cinematic viewfinder experience.",
    rolle: "Concept · Design · Development",
    intro: "Cloudframe is my own website for drone footage: an app-like experience that feels like looking through a camera viewfinder.",
    sections: [
      { title: "The idea", body: [
        "Drone videos deserve more than a gallery tile. Cloudframe puts the visual experience first, with a cinematic viewfinder and HUD language of its own.",
        "The entire site follows one idea: looking through the camera. Crosshairs, focus corners and a REC overlay with a running timecode carry that through."
      ], image: { alt: "Drone view of the church tower in Lake Reschen", caption: "Lake Reschen, South Tyrol: one of the locations on the map." } },
      { title: "Four views instead of pages", body: [
        "Instead of conventional menu pages, visitors switch between four app-like views: Home with a scroll-controlled hero, Map, Films and Hardware.",
        "The Hardware view replaces a standard About page with an interactive DJI Mini 4 Pro specification and numbered component hotspots."
      ] },
      { title: "Interactive map of Europe", body: [
        "At its centre is a map built with D3.js: wheel zoom, smooth fly-to movement when selecting a pin, and eight locations with inline galleries.",
        "A live geo HUD shows real coordinates beneath the cursor while a targeting crosshair follows the pointer."
      ], image: { alt: "Drone view of a bay on Rhodes", caption: "Rhodes: a top-down view of the bay." } },
      { title: "Technology", body: [
        "Built with Astro 7 for a fast static site and strict TypeScript. D3.js powers the map, Three.js an occasional drone flyby, and sharp the image and Open Graph pipeline.",
        "All animation respects reduced-motion preferences. Motion supports the experience rather than becoming the point of it."
      ] }
    ],
    ergebnis: "Live since July 2026: a home for my drone footage with an interactive map, films and galleries. I designed and developed it and continue to improve it as needed."
  },
  kinokanon: {
    tagline: "Compare films, build your own ranking and discover your matching character.",
    rolle: "Personal project · Concept · Design · Development",
    intro: "Kinokanon is my own film project. Visitors compare films, build and share a personal ranking, explore viewing orders and try character quizzes. The site is available in German and English.",
    sections: [
      { title: "The idea", body: [
        "People can talk about favourite films for hours. Kinokanon turns that into something to try: you choose between two films, and the app builds your personal order.",
        "I wanted a site that combines editorial content with an easy-to-use application. I handle its design, content and development; it is not a client commission."
      ] },
      { title: "From comparison to your own ranking", body: [
        "Rather than dragging a long list into order, you compare films in pairs. Progress saved in the browser lets you pick up the ranking later.",
        "You can share the result as a link, inviting someone else to make their own choices."
      ] },
      { title: "Two languages, several ways in", body: [
        "The site works in German and English. Alongside rankings, it offers viewing-order guides and original Marvel and Star Wars character quizzes.",
        "Each quiz has its own questions and results. Answers survive a language switch, so visitors can continue where they left off."
      ], image: { alt: "Star Wars character quiz on Kinokanon", caption: "Actual site view: the standalone Star Wars quiz." } },
      { title: "Design and implementation", body: [
        "Clear typography, dark surfaces and red accents give the site a distinct identity. The landing experience leads directly into interaction, with further film information close by.",
        "Astro and TypeScript form the foundation; React handles ranking interactions. Cloudflare hosts the site. Static content and interactive features are combined according to their purpose."
      ] }
    ],
    ergebnis: "Live since September 2026: a bilingual film site with interactive rankings, shareable results and character quizzes. The project demonstrates both custom design and a useful web application."
  },
  sonnensystem: {
    titel: "Solar System 3D",
    tagline: "An interactive 3D model of the solar system in your browser.",
    rolle: "Concept · Design · Development",
    intro: "Solar System 3D is an interactive browser model of our solar system. Explore the Sun, all eight planets and their major moons freely. It is a real 3D scene you can fly through, search and move forwards or backwards in time.",
    sections: [
      { title: "The idea", body: [
        "Many solar-system visualisations favour either attractive imagery or plausible astronomy. I wanted both.",
        "The Sun, eight planets and 18 moons appear as textured bodies. Four small moons, including Phobos and Deimos, even use actual NASA 3D models."
      ], image: { alt: "Overview of the 3D solar system with planetary orbits", caption: "The whole system at a glance, with orbital paths." } },
      { title: "Astronomical foundations", body: [
        "Planets follow J2000 Keplerian orbits rather than invented circles. Time controls let you move from real time to 30 days per second, forwards or backwards, and return to today in one click.",
        "Earth has a day and night side with clouds and atmosphere; Saturn has rings; the Sun has its own shader."
      ], image: { alt: "Saturn and its rings in the 3D solar system", caption: "Saturn's rings; the camera can follow any selected body." } },
      { title: "Explore the system", body: [
        "A focus camera smoothly follows the selected body. Search filters all 24 bodies including moons, arrow keys move through them, and a travel mode takes you on a guided journey.",
        "The URL stores the selected body, focus, view and date, so a particular view can be shared."
      ] },
      { title: "Technology", body: [
        "Built with React 19, TypeScript, react-three-fiber and Three.js, with Vite for builds and Tailwind for the interface. It is deployed on Vercel under its own subdomain, with DNS on Cloudflare.",
        "It also has light and dark modes, an information panel with a scale comparison to Earth, and versioned release notes."
      ] }
    ],
    ergebnis: "Live at solarsystem.codemantix.com since July 2026. The core feature set is complete and approved. Next up are improvements to the asset pipeline and code splitting for faster loading."
  }
};

export function getProjectsEn(): Project[] {
  return getProjects().map((project) => {
    const translated = copy[project.slug];
    if (!translated) throw new Error(`Missing English translation: ${project.slug}`);
    if (project.sections.length !== translated.sections.length) throw new Error(`Section count mismatch: ${project.slug}`);
    return {
      ...project,
      ...translated,
      links: project.slug === "kinokanon" ? project.links.map((link) => ({ ...link, url: "https://kinokanon.codemantix.com/en/" })) : project.links,
      sections: project.sections.map((section, index) => ({
        ...section,
        ...translated.sections[index],
        image: section.image ? { ...section.image, ...translated.sections[index].image } : undefined,
      })),
    };
  });
}

export function getFeaturedProjectsEn(): Project[] {
  return getProjectsEn().filter((project) => project.featured);
}

export function getProjectEn(slug: string): Project | undefined {
  return getProjectsEn().find((project) => project.slug === slug);
}
