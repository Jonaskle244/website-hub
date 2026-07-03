import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "../components/nav/Nav";
import { Footer } from "../components/Footer";

const sans = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://codemantix.com";
const SITE_DESC =
  "Codemantix — Portfolio & Projekte von Jonas: Web, Games und 3D. Gebaut, nicht zusammengeklickt.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Codemantix — Portfolio & Projekte",
    template: "%s — Codemantix",
  },
  description: SITE_DESC,
  applicationName: "Codemantix",
  authors: [{ name: "Jonas" }],
  openGraph: {
    type: "website",
    siteName: "Codemantix",
    locale: "de_DE",
    url: "/",
    title: "Codemantix — Portfolio & Projekte",
    description: SITE_DESC,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Codemantix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codemantix — Portfolio & Projekte",
    description: SITE_DESC,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
