/**
 * Root-absolute public assets (e.g. "/resume-tangyong.pdf") must be rebased
 * onto import.meta.env.BASE_URL: GitHub Pages serves the app from "/<repo>/",
 * where a raw "/..." URL escapes the app and 404s. External URLs and relative
 * paths pass through untouched.
 */
export const withBase = (url: string): string => {
   const trimmed = url.trim();
   if (!trimmed.startsWith("/")) return trimmed;
   const base = import.meta.env.BASE_URL || "/";
   return `${base.replace(/\/$/, "")}${trimmed}`;
};
