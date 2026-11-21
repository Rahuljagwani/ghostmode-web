import { SITE_URL } from "@/lib/blog";

// Translated versions of the AI interview assistant page. Add a language here only once its page is live:
// hreflang must point at real pages, and every version lists all the others (Google ignores one-way links).
// See marketing/international-seo-strategy.md.
export const ASSISTANT_PAGES = {
  en: "/ai-interview-assistant",
  es: "/es/ia-para-entrevistas-de-trabajo",
  fr: "/fr/ia-entretien-embauche",
  pt: "/pt/ia-para-entrevista-de-emprego",
} as const;

export type AssistantLang = keyof typeof ASSISTANT_PAGES;

// Footer and switcher labels, in each language's own name.
export const LANGUAGE_NAMES: Record<AssistantLang, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
};

/** hreflang map for the interview assistant pages, with English as the default for everyone else. */
export function assistantHreflang(): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const [lang, path] of Object.entries(ASSISTANT_PAGES)) {
    languages[lang] = `${SITE_URL}${path}`;
  }
  languages["x-default"] = `${SITE_URL}${ASSISTANT_PAGES.en}`;
  return languages;
}
