import { Metadata } from "next";
import Link from "next/link";
import LocalizedAssistantPage, { linkClass, type AssistantPageContent } from "@/components/LocalizedAssistantPage";
import { ASSISTANT_PAGES, assistantHreflang } from "@/lib/i18n";

// Portuguese (Brazil) version of /ai-interview-assistant.
// Target searches (Google autocomplete, Nov 2026): "ia para entrevista de emprego em tempo real",
// "ia para entrevista em inglês", "ia para ajudar em entrevista de emprego", "ia para entrevista técnica".
// Research: marketing/keywords-international.md. Strategy: marketing/international-seo-strategy.md.
const URL = `https://renekin.com${ASSISTANT_PAGES.pt}`;
const TITLE = "IA para entrevista de emprego em tempo real | Ghost";
const DESCRIPTION =
  "Ghost é uma IA para entrevista de emprego em tempo real: ouve a pergunta, lê sua tela e sugere respostas em segundos, em inglês ou em português.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "ia para entrevista de emprego",
    "ia para entrevista de emprego em tempo real",
    "ia para entrevista em inglês",
    "ia para ajudar em entrevista de emprego",
    "ia para entrevista técnica",
    "ia para entrevista de emprego online",
    "assistente de entrevista com ia",
    "Ghost AI",
  ],
  alternates: { canonical: URL, languages: assistantHreflang() },
  openGraph: {
    url: URL,
    locale: "pt_BR",
    title: TITLE,
    description:
      "Ouve a pergunta, lê sua tela e sugere respostas em segundos. Invisível no compartilhamento de tela. Mac e Windows.",
    images: ["/opengraph-image"],
  },
};

const content: AssistantPageContent = {
  lang: "pt",
  url: URL,
  breadcrumb: { home: "Início", page: "IA para entrevista de emprego" },
  hero: {
    h1: "IA para entrevista de emprego em tempo real",
    sub: "O Ghost ouve o entrevistador, lê sua tela e sugere respostas claras em segundos, em inglês ou em português. Invisível no compartilhamento de tela no Mac e no Windows.",
    cta: "Teste grátis",
    pricing: "Ver preços (em inglês)",
    badges: "20 créditos grátis · macOS e Windows · Sem assinatura",
    englishLink: "Read this page in English",
  },
  whatIs: {
    h2: "O que é uma IA para entrevista em tempo real?",
    paragraphs: [
      "É um aplicativo que fica ao lado da sua videochamada e ajuda você a responder. Ele ouve a pergunta, entende o contexto e mostra os pontos principais de uma boa resposta enquanto você ainda está ouvindo.",
      <>
        O <strong className="text-gray-900">Ghost</strong> foi feito exatamente para esse momento. É uma pequena
        janela flutuante na sua área de trabalho: transcreve o entrevistador, consegue ler um problema de código ou um
        slide direto da sua tela e usa seu currículo e a descrição da vaga para que as respostas tenham a sua cara.
      </>,
    ],
  },
  english: {
    h2: "Entrevista em inglês sem dar branco",
    paragraphs: [
      "Cada vez mais vagas remotas, para empresas dos Estados Unidos e da Europa, pedem uma entrevista em inglês, mesmo que o inglês não seja sua primeira língua. O problema quase nunca é o que você sabe: é entender a pergunta de primeira, organizar a ideia e achar as palavras, tudo ao mesmo tempo e com alguém olhando para você.",
      "O Ghost tira parte desse peso. Você vê a pergunta escrita, caso não tenha entendido bem, e os pontos principais da resposta em inglês, prontos para você falar com as suas palavras. Se preferir pensar em português, pode pedir para ele responder em português.",
    ],
  },
  how: {
    h2: "Como o Ghost funciona na entrevista",
    steps: [
      ["Adicione seu contexto", "Baixe o Ghost, entre na sua conta e adicione seu currículo, a descrição da vaga e suas anotações."],
      ["Entre na chamada", "Abra o Zoom, o Google Meet ou o Teams normalmente. O Ghost fica por cima, invisível no compartilhamento de tela."],
      ["Receba a resposta", "Deixe ele ouvir, tire um print ou digite uma pergunta. As respostas aparecem em segundos."],
    ],
  },
  capabilities: {
    h2: "Tudo o que você precisa na hora",
    sub: "Uma pequena janela que ouve, vê e lembra do seu contexto.",
    items: [
      { title: "Ouve a pergunta", desc: "Transcrição do entrevistador ao vivo. Com fone de ouvido, o Ghost capta o áudio do sistema para ouvir bem a chamada." },
      { title: "Lê sua tela", desc: "Tire um print de um problema de código, um slide ou um diagrama e receba uma resposta organizada em segundos." },
      { title: "Conhece sua história", desc: "Adicione seu currículo e a descrição da vaga, e as respostas se adaptam à sua experiência e ao cargo." },
      { title: "Invisível no compartilhamento de tela", desc: "A janela do Ghost fica fora da captura de tela: não aparece no Zoom, Google Meet, Teams nem nas gravações." },
      { title: "Responde no seu idioma", desc: "As respostas saem no idioma da pergunta, ou sempre no que você escolher: português, inglês, espanhol e outros." },
      { title: "Fácil de ler num relance", desc: "Respostas em tópicos e código, para você ler rápido e falar com as suas palavras." },
    ],
  },
  useCases: {
    h2: "Para cada tipo de entrevista",
    items: [
      { title: "Entrevistas em inglês", desc: "Para vagas remotas em empresas de fora. O Ghost entende a pergunta e mostra os pontos principais em inglês, para você se concentrar em responder e não em traduzir." },
      { title: "Entrevistas técnicas e de programação", desc: "Tire um print do problema e receba a abordagem, o código e a complexidade de tempo e espaço. Também perguntas de system design, banco de dados e frameworks." },
      { title: "Entrevistas de RH e comportamentais", desc: "\"Fale sobre você\", \"Por que esta empresa?\" e respostas no método STAR, montadas a partir do seu próprio currículo." },
      { title: "Treino antes da entrevista de verdade", desc: "Treine com um amigo ou sozinho e veja como uma boa resposta é estruturada antes do grande dia." },
    ],
    note: (
      <>
        Para se preparar antes, use nossas ferramentas grátis (em inglês): o{" "}
        <Link href="/tools/interview-question-predictor" className={linkClass}>previsor de perguntas de entrevista</Link> e o{" "}
        <Link href="/tools/tell-me-about-yourself-generator" className={linkClass}>gerador de resposta para &quot;Tell me about yourself&quot;</Link>.
      </>
    ),
  },
  pricing: {
    h2: "Pague por pergunta, não por mês",
    paragraphs: [
      "A maioria das ferramentas de IA para entrevista cobra uma assinatura mensal, mesmo que a maioria das pessoas tenha só algumas entrevistas por ano. O Ghost usa créditos: uma pergunta escrita custa 1 crédito, um print 2 e uma pergunta por voz 3. Uma entrevista típica usa de 50 a 60 créditos.",
      <>
        Você começa com <strong className="text-gray-900">20 créditos grátis</strong>, e os pacotes começam em{" "}
        <strong className="text-gray-900">10 USD por 200 créditos</strong>. Os créditos não expiram e nada é renovado
        automaticamente. Veja todos os <Link href="/pricing" className={linkClass}>planos e preços</Link> (em inglês).
      </>,
    ],
  },
  faq: {
    h2: "Perguntas frequentes",
    items: [
      { q: "O que é o Ghost?", a: "O Ghost é uma IA para entrevista de emprego em tempo real, criada pela Renekin AI. É um aplicativo de desktop para Mac e Windows que ouve o entrevistador, lê sua tela quando você pede e sugere respostas em poucos segundos, sem aparecer quando você compartilha a tela." },
      { q: "Serve para entrevista em inglês se meu inglês não é perfeito?", a: "Sim, esse é um dos usos principais. O Ghost transcreve a pergunta do entrevistador e mostra os pontos principais de uma boa resposta em inglês. Se preferir ler a ideia em português, você pode escolher português como idioma de resposta." },
      { q: "Ele responde em português?", a: "Sim. Nas configurações do Ghost, em \"Answer Language\", escolha \"Same as the question\" para ele responder no idioma da pergunta, ou Portuguese para responder sempre em português, mesmo que a pergunta seja em inglês. Código e termos técnicos ficam como estão." },
      { q: "O aplicativo está em português?", a: "Os menus do aplicativo estão em inglês por enquanto, mas são poucos e simples. As respostas podem ser em português." },
      { q: "Funciona com Zoom, Google Meet e Microsoft Teams?", a: "Sim. O Ghost é um aplicativo de desktop, então funciona junto com qualquer aplicativo de videochamada, incluindo Zoom, Google Meet, Microsoft Teams e plataformas de entrevista no navegador." },
      { q: "O entrevistador consegue ver o Ghost se eu compartilhar a tela?", a: "Não. A janela do Ghost fica excluída da captura de tela no macOS e no Windows, então não aparece quando você compartilha ou grava a tela." },
      { q: "Quanto custa? Tem versão grátis?", a: "Toda conta nova recebe 20 créditos grátis com todos os recursos. Depois, os pacotes começam em 10 USD por 200 créditos, sem assinatura e sem validade. Uma pergunta escrita custa 1 crédito, um print 2 e uma pergunta por voz 3. Uma entrevista típica usa de 50 a 60 créditos, cerca de 2 a 3 USD." },
      { q: "Quais sistemas são compatíveis?", a: "O Ghost funciona no macOS 12 ou mais recente e no Windows 10 (versão 2004) ou mais recente." },
      { q: "O Ghost guarda minhas entrevistas?", a: "O Ghost nunca guarda seus prints nem suas gravações de áudio. Guardamos o texto das suas perguntas e das transcrições de voz na sua conta para operar e melhorar o serviço, e você pode pedir para apagarmos a qualquer momento. Nunca vendemos seus dados pessoais." },
    ],
  },
  cta: {
    h2: "Teste o Ghost grátis na sua próxima entrevista",
    sub: "20 créditos grátis com todos os recursos. Sem cartão e sem assinatura.",
    button: "Baixar o Ghost",
  },
};

export default function IaParaEntrevistaDeEmpregoPage() {
  return <LocalizedAssistantPage c={content} />;
}
