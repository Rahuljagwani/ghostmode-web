import { getLivePosts, SITE_URL } from "@/lib/blog";

// Picks up scheduled blog posts as they go live.
export const revalidate = 600;

const INTRO = `# Ghost by Renekin AI

> Ghost is a real-time AI copilot for job interviews and meetings, made by Renekin AI. It listens to the interviewer, reads what's on your screen (coding problems, slides, diagrams), and suggests clear, structured answers in seconds. Its window is hidden from screen share in Zoom, Google Meet and Microsoft Teams. Desktop app for macOS 12+ and Windows 10+.

Key facts:
- Pricing: credit-based, no subscription. 20 free credits on sign-up. Packs: $10 for 200 credits, $19 for 450, $28 for 750.
- Credit costs: text question 1 credit, screenshot 2 credits, voice question 3 credits. A typical interview uses about 50-60 credits (about $2 on the largest pack).
- Modes: behavioral (STAR answers), technical, coding (approach, code, complexity), system design, and general chat.
- Context: users can add their resume and the job description so answers match their experience.
- Website: https://renekin.com
- Contact: socials@renekin.com

## Product

- [AI Interview Assistant](https://renekin.com/ai-interview-assistant): what Ghost is, how it works in an interview, features, pricing and FAQ.
- [AI Coding Interview Assistant](https://renekin.com/ai-coding-interview-assistant): screenshot a coding problem, get the approach, code, complexity and edge cases.
- [Cluely alternative](https://renekin.com/cluely-alternative): Ghost vs Cluely on screen-share stealth, pricing and features.
- [Pricing](https://renekin.com/pricing): free and paid credit packs.
- [Download](https://renekin.com/download): macOS and Windows installers.

## Free tools

- [ATS Resume Checker](https://renekin.com/tools/ats-resume-checker): free ATS match score, missing keywords and format checks for a resume against a job description. No sign-up.
- [Interview Question Predictor](https://renekin.com/tools/interview-question-predictor): paste a job description, get the 10 most likely interview questions with answer tips. No sign-up.
- ["Tell Me About Yourself" Generator](https://renekin.com/tools/tell-me-about-yourself-generator): turn a resume into a 60-90 second answer. No sign-up.
- [Resume Bullet Point Generator](https://renekin.com/tools/resume-bullet-point-generator): rewrite a weak resume line into 3 strong, ATS-friendly bullets. No sign-up.
- [STAR Method Answer Generator](https://renekin.com/tools/star-method-answer-generator): turn a rough story into a STAR answer for behavioral questions. No sign-up.

`;

const COMPANY = `## Company

- [About Renekin AI](https://renekin.com/about)
- Instagram: https://www.instagram.com/renekin_ai/
- YouTube: https://www.youtube.com/@RenekinAI
- LinkedIn: https://www.linkedin.com/company/renekin-ai/

## Policies

- [Privacy Policy](https://renekin.com/privacy)
- [Terms of Service](https://renekin.com/terms)
`;

export function GET() {
  const guides = getLivePosts()
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
    .join("\n");
  return new Response(`${INTRO}## Guides\n\n${guides}\n\n${COMPANY}`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
