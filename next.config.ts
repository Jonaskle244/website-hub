import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Deploy-Weiche (F1): Default = Static Export für Cloudflare Pages.
  // In M2 leicht umschaltbar auf Vercel/SSR (diese Zeile entfernen bzw. anpassen).
  output: "export",
  // Beim Static Export ist die Next.js Image Optimization nicht verfügbar.
  images: {
    unoptimized: true,
  },
  // Seiten/Routen dürfen .mdx sein (neben ts/tsx).
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  // Optionen für remark/rehype-Plugins können später hier ergänzt werden.
});

export default withMDX(nextConfig);
