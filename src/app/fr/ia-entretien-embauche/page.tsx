import { Metadata } from "next";
import Link from "next/link";
import LocalizedAssistantPage, { linkClass, type AssistantPageContent } from "@/components/LocalizedAssistantPage";
import { ASSISTANT_PAGES, assistantHreflang } from "@/lib/i18n";

// French version of /ai-interview-assistant, for Tunisia, Morocco, Algeria and France.
// Target searches (Google autocomplete, Nov 2026): "ia pour entretien d'embauche", "ia pour entretien en anglais",
// "ia pour entretien visio", "ia pour entretien technique", "assistant entretien ia", "outil ia pour entretien d'embauche".
// Research: marketing/keywords-international.md. Strategy: marketing/international-seo-strategy.md.
const URL = `https://renekin.com${ASSISTANT_PAGES.fr}`;
const TITLE = "IA pour entretien d'embauche en temps réel | Ghost";
const DESCRIPTION =
  "Ghost est une IA pour entretien d'embauche en temps réel : il écoute la question, lit votre écran et vous suggère des réponses en quelques secondes, en anglais ou en français.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "ia pour entretien d'embauche",
    "ia entretien d'embauche",
    "ia pour entretien en anglais",
    "ia pour entretien visio",
    "ia pour entretien technique",
    "assistant entretien ia",
    "outil ia pour entretien d'embauche",
    "Ghost AI",
  ],
  alternates: { canonical: URL, languages: assistantHreflang() },
  openGraph: {
    url: URL,
    locale: "fr_FR",
    title: TITLE,
    description:
      "Il écoute la question, lit votre écran et vous suggère des réponses en quelques secondes. Invisible au partage d'écran. Mac et Windows.",
    images: ["/opengraph-image"],
  },
};

const content: AssistantPageContent = {
  lang: "fr",
  url: URL,
  breadcrumb: { home: "Accueil", page: "IA pour entretien d'embauche" },
  hero: {
    h1: "IA pour entretien d'embauche en temps réel",
    sub: "Ghost écoute le recruteur, lit votre écran et vous suggère des réponses claires en quelques secondes, en anglais ou en français. Invisible au partage d'écran sur Mac et Windows.",
    cta: "Essayer gratuitement",
    pricing: "Voir les tarifs (en anglais)",
    badges: "20 crédits gratuits · macOS et Windows · Sans abonnement",
    englishLink: "Read this page in English",
  },
  whatIs: {
    h2: "Qu'est-ce qu'une IA pour entretien en temps réel ?",
    paragraphs: [
      "C'est une application qui reste à côté de votre visio et vous aide à répondre. Elle écoute la question, comprend le contexte et vous montre les points clés d'une bonne réponse pendant que vous êtes encore en train d'écouter.",
      <>
        <strong className="text-gray-900">Ghost</strong> est conçu pour ce moment précis. C&apos;est une petite fenêtre
        flottante sur votre bureau : il transcrit le recruteur, peut lire un exercice de code ou une diapositive
        directement sur votre écran, et utilise votre CV et l&apos;offre d&apos;emploi pour que les réponses vous
        ressemblent.
      </>,
    ],
  },
  english: {
    h2: "Un entretien en anglais sans perdre ses moyens",
    paragraphs: [
      "De plus en plus de postes, en télétravail ou dans des entreprises internationales, passent par un entretien en anglais, même quand l'anglais n'est pas votre langue maternelle. Le problème est rarement ce que vous savez : c'est de comprendre la question du premier coup, d'organiser votre idée et de trouver les mots, tout en même temps, avec quelqu'un qui vous regarde.",
      "Ghost vous enlève une partie de cette charge. Vous voyez la question écrite, au cas où vous l'auriez mal comprise, et les points clés de la réponse en anglais, prêts à être dits avec vos propres mots. Si vous préférez réfléchir en français, vous pouvez lui demander de répondre en français.",
    ],
  },
  how: {
    h2: "Comment Ghost fonctionne pendant un entretien",
    steps: [
      ["Ajoutez votre contexte", "Téléchargez Ghost, connectez-vous et ajoutez votre CV, l'offre d'emploi et vos notes."],
      ["Rejoignez votre visio", "Ouvrez Zoom, Google Meet ou Teams comme d'habitude. Ghost reste au premier plan, invisible au partage d'écran."],
      ["Recevez la réponse", "Laissez-le écouter, faites une capture d'écran ou tapez une question. Les réponses arrivent en quelques secondes."],
    ],
  },
  capabilities: {
    h2: "Tout ce qu'il vous faut, au bon moment",
    sub: "Une petite fenêtre qui écoute, voit et se souvient de votre contexte.",
    items: [
      { title: "Il écoute la question", desc: "Transcription du recruteur en direct. Avec un casque, Ghost capte le son du système pour bien entendre l'appel." },
      { title: "Il lit votre écran", desc: "Faites une capture d'un exercice de code, d'une diapositive ou d'un schéma et recevez une réponse structurée en quelques secondes." },
      { title: "Il connaît votre parcours", desc: "Ajoutez votre CV et l'offre d'emploi : les réponses s'adaptent à votre expérience et au poste." },
      { title: "Invisible au partage d'écran", desc: "La fenêtre de Ghost est exclue de la capture d'écran : elle n'apparaît ni dans Zoom, Google Meet ou Teams, ni dans les enregistrements." },
      { title: "Il répond dans votre langue", desc: "Les réponses sont dans la langue de la question, ou toujours dans celle que vous choisissez : français, anglais, arabe, espagnol et d'autres." },
      { title: "Facile à lire d'un coup d'œil", desc: "Des réponses en points clés et en code, pour les lire vite et les dire avec vos propres mots." },
    ],
  },
  useCases: {
    h2: "Pour chaque type d'entretien",
    items: [
      { title: "Entretiens en anglais", desc: "Pour les postes en télétravail ou dans des entreprises européennes, américaines ou du Golfe. Ghost comprend la question et vous donne les points clés en anglais, pour vous concentrer sur la réponse et pas sur la traduction." },
      { title: "Entretiens techniques et de code", desc: "Faites une capture de l'exercice et recevez l'approche, le code et la complexité en temps et en espace. Aussi pour les questions de conception de systèmes, de bases de données et de frameworks." },
      { title: "Entretiens RH et comportementaux", desc: "« Parlez-moi de vous », « Pourquoi notre entreprise ? » et des réponses avec la méthode STAR, construites à partir de votre propre CV." },
      { title: "Entraînement avant le vrai entretien", desc: "Entraînez-vous avec un ami ou seul, et voyez comment se construit une bonne réponse avant le jour J." },
    ],
    note: (
      <>
        Pour vous préparer avant, essayez nos outils gratuits (en anglais) : le{" "}
        <Link href="/tools/interview-question-predictor" className={linkClass}>prédicteur de questions d&apos;entretien</Link> et le{" "}
        <Link href="/tools/tell-me-about-yourself-generator" className={linkClass}>générateur de réponse à « Tell me about yourself »</Link>.
      </>
    ),
  },
  pricing: {
    h2: "Payez à la question, pas au mois",
    paragraphs: [
      "La plupart des outils d'IA pour entretien demandent un abonnement mensuel, alors que la plupart des gens n'ont que quelques entretiens par an. Ghost fonctionne avec des crédits : une question écrite coûte 1 crédit, une capture d'écran 2 et une question vocale 3. Un entretien type utilise 50 à 60 crédits.",
      <>
        Vous commencez avec <strong className="text-gray-900">20 crédits gratuits</strong>, et les packs commencent à{" "}
        <strong className="text-gray-900">10 USD pour 200 crédits</strong>. Les crédits n&apos;expirent pas et rien ne se
        renouvelle automatiquement. Voir tous les <Link href="/pricing" className={linkClass}>tarifs</Link> (en anglais).
      </>,
    ],
  },
  faq: {
    h2: "Questions fréquentes",
    items: [
      { q: "Qu'est-ce que Ghost ?", a: "Ghost est une IA pour entretien d'embauche en temps réel, créée par Renekin AI. C'est une application de bureau pour Mac et Windows qui écoute le recruteur, lit votre écran quand vous le demandez et vous suggère des réponses en quelques secondes, sans apparaître quand vous partagez votre écran." },
      { q: "Est-ce utile pour un entretien en anglais si mon anglais n'est pas parfait ?", a: "Oui, c'est l'un de ses usages principaux. Ghost transcrit la question du recruteur et vous montre les points clés d'une bonne réponse en anglais. Si vous préférez lire l'idée en français, vous pouvez choisir le français comme langue de réponse." },
      { q: "Peut-il répondre en français ?", a: "Oui. Dans les réglages de Ghost, sous « Answer Language », choisissez « Same as the question » pour qu'il réponde dans la langue de la question, ou French pour qu'il réponde toujours en français, même si la question est en anglais. Le code et les termes techniques restent tels quels." },
      { q: "L'application est-elle en français ?", a: "Les menus de l'application sont en anglais pour l'instant, mais ils sont peu nombreux et simples. Les réponses, elles, peuvent être en français." },
      { q: "Est-ce que ça marche avec Zoom, Google Meet et Microsoft Teams ?", a: "Oui. Ghost est une application de bureau : il fonctionne à côté de n'importe quelle application de visio, y compris Zoom, Google Meet, Microsoft Teams et les plateformes d'entretien dans le navigateur." },
      { q: "Le recruteur peut-il voir Ghost si je partage mon écran ?", a: "Non. La fenêtre de Ghost est exclue de la capture d'écran sur macOS et Windows : elle n'apparaît pas quand vous partagez ou enregistrez votre écran." },
      { q: "Combien ça coûte ? Y a-t-il une version gratuite ?", a: "Chaque nouveau compte reçoit 20 crédits gratuits avec toutes les fonctionnalités. Ensuite, les packs commencent à 10 USD pour 200 crédits, sans abonnement et sans date d'expiration. Une question écrite coûte 1 crédit, une capture d'écran 2 et une question vocale 3. Un entretien type utilise 50 à 60 crédits, soit environ 2 à 3 USD." },
      { q: "Quels systèmes sont compatibles ?", a: "Ghost fonctionne sur macOS 12 ou plus récent et sur Windows 10 (version 2004) ou plus récent." },
      { q: "Ghost enregistre-t-il mes entretiens ?", a: "Ghost n'enregistre jamais vos captures d'écran ni vos enregistrements audio. Nous conservons le texte de vos questions et des transcriptions vocales avec votre compte pour faire fonctionner et améliorer le service, et vous pouvez nous demander de les supprimer à tout moment. Nous ne vendons jamais vos données personnelles." },
    ],
  },
  cta: {
    h2: "Essayez Ghost gratuitement pour votre prochain entretien",
    sub: "20 crédits gratuits avec toutes les fonctionnalités. Sans carte et sans abonnement.",
    button: "Télécharger Ghost",
  },
};

export default function IaEntretienEmbauchePage() {
  return <LocalizedAssistantPage c={content} />;
}
