import { Metadata } from "next";
import Link from "next/link";
import LocalizedAssistantPage, { linkClass, type AssistantPageContent } from "@/components/LocalizedAssistantPage";
import { ASSISTANT_PAGES, assistantHreflang } from "@/lib/i18n";

// Spanish version of /ai-interview-assistant, for Colombia, Mexico, Argentina, Peru and Spain.
// Target searches (Google autocomplete, Nov 2026): "ia para entrevistas de trabajo en tiempo real",
// "ia para entrevistas en inglés", "ia para entrevistas técnicas", "asistente de ia para entrevistas".
// Research: marketing/keywords-international.md. Strategy: marketing/international-seo-strategy.md.
const URL = `https://renekin.com${ASSISTANT_PAGES.es}`;
const TITLE = "IA para entrevistas de trabajo en tiempo real | Ghost";
const DESCRIPTION =
  "Ghost es una IA para entrevistas de trabajo en tiempo real: escucha la pregunta, lee tu pantalla y te sugiere respuestas en segundos, en inglés o en español.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "ia para entrevistas de trabajo",
    "ia para entrevistas de trabajo en tiempo real",
    "ia para entrevistas en inglés",
    "ia para entrevistas técnicas",
    "asistente de ia para entrevistas",
    "ia para entrevistas de trabajo gratis",
    "asistente de entrevistas en tiempo real",
    "Ghost AI",
  ],
  alternates: { canonical: URL, languages: assistantHreflang() },
  openGraph: {
    url: URL,
    locale: "es_LA",
    title: TITLE,
    description:
      "Escucha la pregunta, lee tu pantalla y te sugiere respuestas en segundos. Oculto al compartir pantalla. Mac y Windows.",
    images: ["/opengraph-image"],
  },
};

const content: AssistantPageContent = {
  lang: "es",
  url: URL,
  breadcrumb: { home: "Inicio", page: "IA para entrevistas de trabajo" },
  hero: {
    h1: "IA para entrevistas de trabajo en tiempo real",
    sub: "Ghost escucha al entrevistador, lee tu pantalla y te sugiere respuestas claras en segundos, en inglés o en español. Oculto al compartir pantalla en Mac y Windows.",
    cta: "Pruébalo gratis",
    pricing: "Ver precios (en inglés)",
    badges: "20 créditos gratis · macOS y Windows · Sin suscripción",
    englishLink: "Read this page in English",
  },
  whatIs: {
    h2: "¿Qué es una IA para entrevistas en tiempo real?",
    paragraphs: [
      "Es una aplicación que se queda junto a tu videollamada y te ayuda a responder. Escucha la pregunta, entiende el contexto y te muestra los puntos clave de una buena respuesta mientras todavía estás escuchando.",
      <>
        <strong className="text-gray-900">Ghost</strong> está hecho justo para ese momento. Es una pequeña ventana
        flotante en tu escritorio: transcribe al entrevistador, puede leer un problema de código o una diapositiva
        directamente de tu pantalla, y usa tu CV y la descripción del puesto para que las respuestas suenen a ti.
      </>,
    ],
  },
  english: {
    h2: "Entrevistas en inglés sin quedarte en blanco",
    paragraphs: [
      "Cada vez más trabajos remotos piden una entrevista en inglés, aunque el inglés no sea tu primer idioma. El problema casi nunca es lo que sabes: es entender la pregunta a la primera, ordenar la idea y encontrar las palabras, todo a la vez y con alguien mirándote.",
      "Ghost te quita parte de esa carga. Ves la pregunta escrita, por si no la entendiste bien, y los puntos clave de la respuesta en inglés, listos para decirlos con tus palabras. Si prefieres pensar en español, puedes pedirle que te responda en español.",
    ],
  },
  how: {
    h2: "Cómo funciona Ghost en una entrevista",
    steps: [
      ["Agrega tu contexto", "Descarga Ghost, inicia sesión y agrega tu CV, la descripción del puesto y tus notas."],
      ["Entra a tu llamada", "Abre Zoom, Google Meet o Teams como siempre. Ghost flota encima, oculto al compartir pantalla."],
      ["Recibe la respuesta", "Deja que escuche, haz una captura o escribe una pregunta. Las respuestas aparecen en segundos."],
    ],
  },
  capabilities: {
    h2: "Todo lo que necesitas en el momento",
    sub: "Una pequeña ventana que escucha, ve y recuerda tu contexto.",
    items: [
      { title: "Escucha la pregunta", desc: "Transcribe al entrevistador en vivo. Con audífonos, Ghost capta el audio del sistema para oír bien la llamada." },
      { title: "Lee tu pantalla", desc: "Haz una captura de un problema de código, una diapositiva o un diagrama y recibe una respuesta ordenada en segundos." },
      { title: "Conoce tu historia", desc: "Agrega tu CV y la descripción del puesto, y las respuestas se adaptan a tu experiencia y al rol." },
      { title: "Oculto al compartir pantalla", desc: "La ventana de Ghost queda fuera de la captura de pantalla: no aparece en Zoom, Google Meet, Teams ni en las grabaciones." },
      { title: "Responde en tu idioma", desc: "Las respuestas salen en el idioma de la pregunta, o siempre en el que elijas: español, inglés, portugués, francés y más." },
      { title: "Fácil de leer de un vistazo", desc: "Respuestas en puntos clave y código, para que las leas rápido y las digas con tus propias palabras." },
    ],
  },
  useCases: {
    h2: "Para cada tipo de entrevista",
    items: [
      { title: "Entrevistas en inglés", desc: "Para trabajos remotos con empresas de Estados Unidos o Europa. Ghost entiende la pregunta y te da los puntos clave en inglés, para que te concentres en responder y no en traducir." },
      { title: "Entrevistas técnicas y de programación", desc: "Haz una captura del problema y recibe el enfoque, el código y la complejidad en tiempo y espacio. También preguntas de diseño de sistemas, bases de datos y frameworks." },
      { title: "Entrevistas de RR. HH. y de comportamiento", desc: "\"Háblame de ti\", \"¿Por qué esta empresa?\" y respuestas con el método STAR, armadas a partir de tu propio CV." },
      { title: "Práctica antes de la entrevista real", desc: "Practica con un amigo o por tu cuenta y mira cómo se estructura una buena respuesta antes del día de la entrevista." },
    ],
    note: (
      <>
        Para prepararte antes, prueba nuestras herramientas gratis (en inglés): el{" "}
        <Link href="/tools/interview-question-predictor" className={linkClass}>predictor de preguntas de entrevista</Link> y el{" "}
        <Link href="/tools/tell-me-about-yourself-generator" className={linkClass}>generador de respuestas para &quot;Tell me about yourself&quot;</Link>.
      </>
    ),
  },
  pricing: {
    h2: "Paga por pregunta, no por mes",
    paragraphs: [
      "La mayoría de las herramientas de IA para entrevistas cobran una suscripción mensual, aunque casi todos tenemos solo unas pocas entrevistas al año. Ghost usa créditos: una pregunta escrita cuesta 1 crédito, una captura de pantalla 2 y una pregunta por voz 3. Una entrevista típica usa entre 50 y 60 créditos.",
      <>
        Empiezas con <strong className="text-gray-900">20 créditos gratis</strong>, y los paquetes empiezan en{" "}
        <strong className="text-gray-900">10 USD por 200 créditos</strong>. Los créditos no vencen y nada se renueva
        solo. Mira todos los <Link href="/pricing" className={linkClass}>planes y precios</Link> (en inglés).
      </>,
    ],
  },
  faq: {
    h2: "Preguntas frecuentes",
    items: [
      { q: "¿Qué es Ghost?", a: "Ghost es una IA para entrevistas de trabajo en tiempo real, creada por Renekin AI. Es una aplicación de escritorio para Mac y Windows que escucha al entrevistador, lee tu pantalla cuando se lo pides y te sugiere respuestas en pocos segundos, sin aparecer cuando compartes pantalla." },
      { q: "¿Sirve para entrevistas en inglés si mi inglés no es perfecto?", a: "Sí, es uno de sus usos principales. Ghost transcribe la pregunta del entrevistador y te muestra los puntos clave de una buena respuesta en inglés. Si prefieres leer la idea en español, puedes elegir español como idioma de respuesta." },
      { q: "¿Puede responder en español?", a: "Sí. En la configuración de Ghost, en \"Answer Language\", elige \"Same as the question\" para que responda en el idioma de la pregunta, o elige Spanish para que responda siempre en español, aunque la pregunta sea en inglés. El código y los términos técnicos se mantienen como están." },
      { q: "¿La aplicación está en español?", a: "Los menús de la aplicación están en inglés por ahora, pero son pocos y sencillos. Las respuestas sí pueden estar en español." },
      { q: "¿Funciona con Zoom, Google Meet y Microsoft Teams?", a: "Sí. Ghost es una aplicación de escritorio, así que funciona junto a cualquier aplicación de videollamadas, incluidas Zoom, Google Meet, Microsoft Teams y las plataformas de entrevistas en el navegador." },
      { q: "¿El entrevistador puede ver Ghost si comparto pantalla?", a: "No. La ventana de Ghost queda excluida de la captura de pantalla en macOS y Windows, así que no aparece cuando compartes o grabas la pantalla." },
      { q: "¿Cuánto cuesta? ¿Hay una versión gratis?", a: "Cada cuenta nueva recibe 20 créditos gratis con todas las funciones. Después, los paquetes empiezan en 10 USD por 200 créditos, sin suscripción y sin vencimiento. Una pregunta escrita cuesta 1 crédito, una captura de pantalla 2 y una pregunta por voz 3. Una entrevista típica usa entre 50 y 60 créditos, unos 2 a 3 USD." },
      { q: "¿Qué sistemas operativos son compatibles?", a: "Ghost funciona en macOS 12 o posterior y en Windows 10 (versión 2004) o posterior." },
      { q: "¿Ghost guarda mis entrevistas?", a: "Ghost nunca guarda tus capturas de pantalla ni tus grabaciones de audio. Guardamos el texto de tus preguntas y de las transcripciones de voz en tu cuenta para operar y mejorar el servicio, y puedes pedirnos que lo borremos en cualquier momento. Nunca vendemos tu información personal." },
    ],
  },
  cta: {
    h2: "Prueba Ghost gratis en tu próxima entrevista",
    sub: "20 créditos gratis con todas las funciones. Sin tarjeta y sin suscripción.",
    button: "Descargar Ghost",
  },
};

export default function IaParaEntrevistasPage() {
  return <LocalizedAssistantPage c={content} />;
}
