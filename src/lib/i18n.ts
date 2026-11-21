import { SITE_URL } from "@/lib/blog";

// Translated versions of the AI interview assistant page. Add a language here only once its page is live:
// hreflang must point at real pages, and every version lists all the others (Google ignores one-way links).
// See marketing/international-seo-strategy.md.
export const ASSISTANT_PAGES = {
  en: "/ai-interview-assistant",
  es: "/es/ia-para-entrevistas-de-trabajo",
  fr: "/fr/ia-entretien-embauche",
  pt: "/pt/ia-para-entrevista-de-emprego",
  uk: "/uk/shi-dlya-spivbesidy",
  ru: "/ru/ii-dlya-sobesedovaniya",
  az: "/az/suni-intellekt-musahibe",
} as const;

export type AssistantLang = keyof typeof ASSISTANT_PAGES;
export type LocalLang = Exclude<AssistantLang, "en">;

// Footer and switcher labels, in each language's own name.
export const LANGUAGE_NAMES: Record<AssistantLang, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
  uk: "Українська",
  ru: "Русский",
  az: "Azərbaycanca",
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

/** Interface text for the translated blogs at /<lang>/blog. */
export type BlogStrings = {
  dateLocale: string;
  ogLocale: string;
  blogTitle: string;
  blogSeoTitle: string;
  blogDescription: string;
  blogIntro: string;
  home: string;
  minRead: string;
  lastUpdated: string;
  tldr: string;
  faq: string;
  author: string;
  ctaBoxTitle: string;
  ctaBoxText: string;
  ctaBoxButton: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  /** Heading of the latest-guides list on the language's landing page. */
  guidesHeading: string;
};

export const BLOG_STRINGS: Record<LocalLang, BlogStrings> = {
  es: {
    guidesHeading: "Guías para tu entrevista",
    dateLocale: "es-ES",
    ogLocale: "es_LA",
    blogTitle: "Blog",
    blogSeoTitle: "Blog de entrevistas de trabajo: guías y consejos | Ghost",
    blogDescription: "Guías en español para entrevistas de trabajo, entrevistas en inglés y entrevistas técnicas, del equipo de Ghost.",
    blogIntro: "Guías para entrevistas de trabajo, entrevistas en inglés y entrevistas técnicas, del equipo de Ghost.",
    home: "Inicio",
    minRead: "min de lectura",
    lastUpdated: "Actualizado el",
    tldr: "En resumen",
    faq: "Preguntas frecuentes",
    author: "Equipo Renekin",
    ctaBoxTitle: "¿Tienes una entrevista pronto?",
    ctaBoxText: "Ghost escucha la pregunta y te sugiere la respuesta en segundos, en inglés o en español.",
    ctaBoxButton: "Ver cómo funciona",
    ctaTitle: "Prueba Ghost gratis",
    ctaText: "20 créditos gratis con todas las funciones, oculto al compartir pantalla. Sin tarjeta y sin suscripción.",
    ctaButton: "Descargar Ghost",
  },
  fr: {
    guidesHeading: "Guides pour votre entretien",
    dateLocale: "fr-FR",
    ogLocale: "fr_FR",
    blogTitle: "Blog",
    blogSeoTitle: "Blog entretien d'embauche : guides et conseils | Ghost",
    blogDescription: "Des guides en français pour réussir vos entretiens d'embauche, vos entretiens en anglais et vos entretiens techniques.",
    blogIntro: "Des guides pour réussir vos entretiens d'embauche, en anglais et techniques, par l'équipe de Ghost.",
    home: "Accueil",
    minRead: "min de lecture",
    lastUpdated: "Mis à jour le",
    tldr: "En bref",
    faq: "Questions fréquentes",
    author: "L'équipe Renekin",
    ctaBoxTitle: "Un entretien bientôt ?",
    ctaBoxText: "Ghost écoute la question et vous suggère la réponse en quelques secondes, en anglais ou en français.",
    ctaBoxButton: "Voir comment ça marche",
    ctaTitle: "Essayez Ghost gratuitement",
    ctaText: "20 crédits gratuits avec toutes les fonctionnalités, invisible au partage d'écran. Sans carte et sans abonnement.",
    ctaButton: "Télécharger Ghost",
  },
  pt: {
    guidesHeading: "Guias para sua entrevista",
    dateLocale: "pt-BR",
    ogLocale: "pt_BR",
    blogTitle: "Blog",
    blogSeoTitle: "Blog de entrevista de emprego: guias e dicas | Ghost",
    blogDescription: "Guias em português para entrevista de emprego, entrevista em inglês e entrevista técnica, do time do Ghost.",
    blogIntro: "Guias para entrevista de emprego, entrevista em inglês e entrevista técnica, do time do Ghost.",
    home: "Início",
    minRead: "min de leitura",
    lastUpdated: "Atualizado em",
    tldr: "Resumo",
    faq: "Perguntas frequentes",
    author: "Time Renekin",
    ctaBoxTitle: "Tem entrevista em breve?",
    ctaBoxText: "O Ghost ouve a pergunta e sugere a resposta em segundos, em inglês ou em português.",
    ctaBoxButton: "Ver como funciona",
    ctaTitle: "Teste o Ghost grátis",
    ctaText: "20 créditos grátis com todos os recursos, invisível no compartilhamento de tela. Sem cartão e sem assinatura.",
    ctaButton: "Baixar o Ghost",
  },
  uk: {
    guidesHeading: "Поради для вашої співбесіди",
    dateLocale: "uk-UA",
    ogLocale: "uk_UA",
    blogTitle: "Блог",
    blogSeoTitle: "Блог про співбесіди: поради та питання | Ghost",
    blogDescription: "Поради українською для співбесід: співбесіда англійською, технічні співбесіди та питання з відповідями.",
    blogIntro: "Поради для співбесід англійською та технічних співбесід від команди Ghost.",
    home: "Головна",
    minRead: "хв читання",
    lastUpdated: "Оновлено",
    tldr: "Коротко",
    faq: "Часті питання",
    author: "Команда Renekin",
    ctaBoxTitle: "Скоро співбесіда?",
    ctaBoxText: "Ghost чує питання і за кілька секунд підказує відповідь англійською або українською.",
    ctaBoxButton: "Як це працює",
    ctaTitle: "Спробуйте Ghost безкоштовно",
    ctaText: "20 безкоштовних кредитів з усіма функціями, невидимий під час демонстрації екрана. Без картки й без підписки.",
    ctaButton: "Завантажити Ghost",
  },
  ru: {
    guidesHeading: "Гайды для вашего собеседования",
    dateLocale: "ru-RU",
    ogLocale: "ru_RU",
    blogTitle: "Блог",
    blogSeoTitle: "Блог о собеседованиях: вопросы и советы | Ghost",
    blogDescription: "Гайды на русском для собеседований: собеседование на английском, технические собеседования, вопросы с ответами.",
    blogIntro: "Гайды для собеседований на английском и технических собеседований от команды Ghost.",
    home: "Главная",
    minRead: "мин чтения",
    lastUpdated: "Обновлено",
    tldr: "Коротко",
    faq: "Частые вопросы",
    author: "Команда Renekin",
    ctaBoxTitle: "Скоро собеседование?",
    ctaBoxText: "Ghost слышит вопрос и за несколько секунд подсказывает ответ на английском или на русском.",
    ctaBoxButton: "Как это работает",
    ctaTitle: "Попробуйте Ghost бесплатно",
    ctaText: "20 бесплатных кредитов со всеми функциями, не виден при демонстрации экрана. Без карты и без подписки.",
    ctaButton: "Скачать Ghost",
  },
  az: {
    guidesHeading: "Müsahibəniz üçün bələdçilər",
    dateLocale: "az-AZ",
    ogLocale: "az_AZ",
    blogTitle: "Bloq",
    blogSeoTitle: "İş müsahibəsi bloqu: suallar və məsləhətlər | Ghost",
    blogDescription: "İş müsahibəsinə hazırlıq, ingilis dilində müsahibə və texniki müsahibə üçün Azərbaycan dilində bələdçilər.",
    blogIntro: "İş müsahibəsi, ingilis dilində müsahibə və texniki müsahibə üçün Ghost komandasından bələdçilər.",
    home: "Ana səhifə",
    minRead: "dəq oxuma",
    lastUpdated: "Yenilənib:",
    tldr: "Qısaca",
    faq: "Tez-tez verilən suallar",
    author: "Renekin komandası",
    ctaBoxTitle: "Tezliklə müsahibəniz var?",
    ctaBoxText: "Ghost sualı eşidir və bir neçə saniyəyə ingilis və ya Azərbaycan dilində cavab təklif edir.",
    ctaBoxButton: "Necə işləyir",
    ctaTitle: "Ghost-u pulsuz sınayın",
    ctaText: "Bütün funksiyalarla 20 pulsuz kredit, ekran paylaşımında görünmür. Kart və abunə tələb olunmur.",
    ctaButton: "Ghost-u yükləyin",
  },
};
