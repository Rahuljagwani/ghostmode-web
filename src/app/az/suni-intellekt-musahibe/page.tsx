import { Metadata } from "next";
import Link from "next/link";
import LocalizedAssistantPage, { linkClass, type AssistantPageContent } from "@/components/LocalizedAssistantPage";
import { ASSISTANT_PAGES, assistantHreflang } from "@/lib/i18n";

// Azerbaijani version of /ai-interview-assistant.
// Target searches (Google autocomplete, Nov 2026): "iş müsahibəsinə hazırlıq", "ingilis dilində müsahibə",
// "müsahibə sualları və cavabları". Few people search for an AI tool in Azerbaijani yet, so the page leads with
// English-language interviews. Speech recognition is weaker for Azerbaijani than for English or Russian, so the page
// doesn't promise interviews held in Azerbaijani.
const URL = `https://renekin.com${ASSISTANT_PAGES.az}`;
const TITLE = "Müsahibə üçün süni intellekt köməkçisi | Ghost";
const DESCRIPTION =
  "Ghost real vaxtda işləyən süni intellekt müsahibə köməkçisidir: sualı eşidir, ekranınızı oxuyur və bir neçə saniyəyə cavab təklif edir. İngilis dilində müsahibələr üçün.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "süni intellekt müsahibə",
    "müsahibə köməkçisi",
    "ingilis dilində müsahibə",
    "iş müsahibəsinə hazırlıq",
    "texniki müsahibə",
    "Ghost AI",
  ],
  alternates: { canonical: URL, languages: assistantHreflang() },
  openGraph: {
    url: URL,
    locale: "az_AZ",
    title: TITLE,
    description: "Sualı eşidir, ekranı oxuyur və bir neçə saniyəyə cavab təklif edir. Ekran paylaşımında görünmür. Mac və Windows.",
    images: ["/opengraph-image"],
  },
};

const content: AssistantPageContent = {
  lang: "az",
  url: URL,
  breadcrumb: { home: "Ana səhifə", page: "Müsahibə üçün süni intellekt" },
  hero: {
    h1: "Müsahibə üçün real vaxtda süni intellekt köməkçisi",
    sub: "Ghost müsahibəçini eşidir, ekranınızı oxuyur və bir neçə saniyəyə aydın cavab təklif edir. İngilis dilində, texniki və HR müsahibələri üçün. Mac və Windows-da ekran paylaşımında görünmür.",
    cta: "Pulsuz sınayın",
    pricing: "Qiymətlər (ingilis dilində)",
    badges: "20 pulsuz kredit · macOS və Windows · Abunəsiz",
    englishLink: "Read this page in English",
  },
  whatIs: {
    h2: "Müsahibə köməkçisi nədir?",
    paragraphs: [
      "Bu, video zənginizin yanında işləyən və cavab verməyə kömək edən proqramdır. Sualı eşidir, konteksti anlayır və siz hələ dinləyərkən yaxşı cavabın əsas məqamlarını göstərir.",
      <>
        <strong className="text-gray-900">Ghost</strong> məhz bu an üçün hazırlanıb. Bu, iş masanızda kiçik üzən
        pəncərədir: müsahibəçinin nitqini mətnə çevirir, kod tapşırığını və ya slaydı birbaşa ekrandan oxuya bilir,
        CV-nizi və vakansiya təsvirini istifadə edir ki, cavablar sizin kimi səslənsin.
      </>,
    ],
  },
  english: {
    h2: "İngilis dilində müsahibə, çaşqınlıq olmadan",
    paragraphs: [
      "Beynəlxalq şirkətlərdə və uzaqdan işləmək üçün vakansiyaların çoxunda müsahibə ingilis dilində olur. Çətinlik adətən biliyinizdə deyil: sualı ilk dəfədən başa düşmək, fikri toplamaq və sözləri tapmaq, özü də hamısını eyni anda və kiminsə qarşısında.",
      "Ghost bu yükün bir hissəsini götürür. Sualı yazılı şəkildə görürsünüz, əgər yaxşı eşitməmisinizsə, və cavabın əsas məqamlarını ingilis dilində, öz sözlərinizlə deməyə hazır şəkildə.",
    ],
  },
  how: {
    h2: "Ghost müsahibədə necə işləyir",
    steps: [
      ["Kontekst əlavə edin", "Ghost-u yükləyin, daxil olun və CV-nizi, vakansiya təsvirini və qeydlərinizi əlavə edin."],
      ["Zəngə qoşulun", "Zoom, Google Meet və ya Teams-i adi qaydada açın. Ghost bütün pəncərələrin üstündə qalır və ekran paylaşımında görünmür."],
      ["Cavabı alın", "Qoy dinləsin, ekran şəkli çəkin və ya sualı yazın. Cavab bir neçə saniyəyə görünür."],
    ],
  },
  capabilities: {
    h2: "Lazım olan hər şey, lazım olan anda",
    sub: "Eşidən, görən və kontekstinizi xatırlayan kiçik pəncərə.",
    items: [
      { title: "Sualı eşidir", desc: "Müsahibəçinin nitqi real vaxtda mətnə çevrilir. Qulaqlıqla Ghost sistem səsini tutur ki, zəngi yaxşı eşitsin." },
      { title: "Ekranı oxuyur", desc: "Kod tapşırığının, slaydın və ya sxemin ekran şəklini çəkin və bir neçə saniyəyə strukturlu cavab alın." },
      { title: "Hekayənizi bilir", desc: "CV-nizi və vakansiya təsvirini əlavə edin, cavablar təcrübənizə və vəzifəyə uyğunlaşsın." },
      { title: "Ekran paylaşımında görünmür", desc: "Ghost pəncərəsi ekran çəkilişindən çıxarılıb: Zoom, Google Meet, Teams və yazılarda görünmür." },
      { title: "Sualın dilində cavab verir", desc: "Sual ingilis dilindədirsə, cavab da ingilis dilində olur. Kod və terminlər olduğu kimi qalır." },
      { title: "Bir baxışda oxunur", desc: "Cavablar qısa bəndlər və kod şəklində olur ki, tez oxuyub öz sözlərinizlə deyəsiniz." },
    ],
  },
  useCases: {
    h2: "Hər növ müsahibə üçün",
    items: [
      { title: "İngilis dilində müsahibələr", desc: "Beynəlxalq şirkətlərdə və uzaqdan iş vakansiyaları üçün. Ghost sualı anlayır və əsas məqamları ingilis dilində verir ki, tərcüməyə yox, cavaba fikir verəsiniz." },
      { title: "Texniki müsahibələr", desc: "Tapşırığın ekran şəklini çəkin və yanaşmanı, kodu və vaxt-yaddaş mürəkkəbliyini alın. Həmçinin system design, verilənlər bazası və framework sualları." },
      { title: "HR müsahibələri", desc: "\"Özünüz haqqında danışın\", \"Niyə bizim şirkət?\" və CV-nizə əsaslanan STAR metodu ilə cavablar." },
      { title: "Əsl müsahibədən əvvəl məşq", desc: "Dostunuzla və ya təkbaşına məşq edin və güclü cavabın necə qurulduğunu görün." },
    ],
    note: (
      <>
        Hazırlıq üçün pulsuz alətlərimizi sınayın (ingilis dilində):{" "}
        <Link href="/tools/interview-question-predictor" className={linkClass}>müsahibə suallarını proqnozlaşdıran alət</Link> və{" "}
        <Link href="/tools/tell-me-about-yourself-generator" className={linkClass}>&quot;Tell me about yourself&quot; cavab generatoru</Link>.
      </>
    ),
  },
  pricing: {
    h2: "Aylıq yox, suala görə ödəyin",
    paragraphs: [
      "Müsahibə üçün süni intellekt alətlərinin çoxu aylıq abunə tələb edir, halbuki insanların çoxunun ildə cəmi bir neçə müsahibəsi olur. Ghost kreditlərlə işləyir: yazılı sual 1 kredit, ekran şəkli 2, səsli sual 3 kreditdir. Adi müsahibə 50–60 kredit istifadə edir.",
      <>
        <strong className="text-gray-900">20 pulsuz kreditlə</strong> başlayırsınız, paketlər isə{" "}
        <strong className="text-gray-900">200 kredit üçün 10 USD-dən</strong> başlayır. Kreditlərin müddəti bitmir və
        heç nə avtomatik yenilənmir. Bütün <Link href="/pricing" className={linkClass}>qiymətlər</Link> (ingilis dilində).
      </>,
    ],
  },
  faq: {
    h2: "Tez-tez verilən suallar",
    items: [
      { q: "Ghost nədir?", a: "Ghost, Renekin AI tərəfindən hazırlanmış real vaxtda işləyən süni intellekt müsahibə köməkçisidir. Mac və Windows üçün masaüstü proqramdır: müsahibəçini eşidir, istədikdə ekranınızı oxuyur və bir neçə saniyəyə cavab təklif edir, ekran paylaşımında isə görünmür." },
      { q: "İngilis dilim mükəmməl deyilsə, ingilis dilində müsahibədə kömək edəcəkmi?", a: "Bəli, bu onun əsas istifadə hallarından biridir. Ghost müsahibəçinin sualını mətnə çevirir və yaxşı cavabın əsas məqamlarını ingilis dilində göstərir ki, onları öz sözlərinizlə deyəsiniz." },
      { q: "Proqramın interfeysi Azərbaycan dilindədir?", a: "Hələlik proqramın menyuları ingilis dilindədir, lakin onlar azdır və sadədir." },
      { q: "Zoom, Google Meet və Microsoft Teams ilə işləyirmi?", a: "Bəli. Ghost masaüstü proqramdır, ona görə də Zoom, Google Meet, Microsoft Teams və brauzerdəki müsahibə platformaları daxil olmaqla istənilən video zəng proqramı ilə yanaşı işləyir." },
      { q: "Ekranı paylaşsam, müsahibəçi Ghost-u görəcəkmi?", a: "Xeyr. Ghost pəncərəsi macOS və Windows-da ekran çəkilişindən çıxarılıb, ona görə də ekranı paylaşanda və ya yazanda görünmür." },
      { q: "Qiyməti nə qədərdir? Pulsuz versiyası varmı?", a: "Hər yeni hesab bütün funksiyalarla 20 pulsuz kredit alır. Sonra paketlər 200 kredit üçün 10 USD-dən başlayır, abunə və müddət yoxdur. Yazılı sual 1 kredit, ekran şəkli 2, səsli sual 3 kreditdir. Adi müsahibə 50–60 kredit, təxminən 2–3 USD edir." },
      { q: "Hansı sistemlər dəstəklənir?", a: "Ghost macOS 12 və daha yeni, Windows 10 (versiya 2004) və daha yeni sistemlərdə işləyir." },
      { q: "Ghost müsahibələrimi saxlayırmı?", a: "Ghost heç vaxt ekran şəkillərinizi və səs yazılarınızı saxlamır. Xidmətin işləməsi və təkmilləşməsi üçün suallarınızın və səsli mətnlərin yazısını hesabınızda saxlayırıq və istənilən vaxt silinməsini istəyə bilərsiniz. Şəxsi məlumatlarınızı heç vaxt satmırıq." },
    ],
  },
  cta: {
    h2: "Növbəti müsahibənizdə Ghost-u pulsuz sınayın",
    sub: "Bütün funksiyalarla 20 pulsuz kredit. Kart və abunə tələb olunmur.",
    button: "Ghost-u yükləyin",
  },
};

export default function SuniIntellektMusahibePage() {
  return <LocalizedAssistantPage c={content} />;
}
