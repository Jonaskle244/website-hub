import type { MDXComponents } from "mdx/types";

// Zentrale Stelle, um MDX-Elemente zu überschreiben (Styling/Custom-Components).
// Für F1 bewusst leer gehalten – konkrete Komponenten & Styles folgen in F2.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
