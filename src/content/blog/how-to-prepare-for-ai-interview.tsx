export const faqs: { q: string; a: string }[] = [
  {
    q: "What is an AI interview?",
    a: "An AI interview is a job interview run by software instead of a person. Depending on the platform, an AI asks you questions by voice or video, chats with you in text, or asks you to record video answers. It then scores your answers against a set of skills for the role and sends a report to the hiring team.",
  },
  {
    q: "Does a human see my AI interview?",
    a: "Usually, yes. Most platforms give recruiters a score, a summary and a transcript or recording. HackerRank, for example, says its AI interviewer scores candidates but people make the final hiring decision. Assume a person will read or watch what you say.",
  },
  {
    q: "How long does an AI interview take?",
    a: "Most run between 15 and 45 minutes. HackerRank describes its technical AI interview as about 30 minutes. Your invite usually tells you the length and the deadline to complete it.",
  },
  {
    q: "Can I retake an AI interview?",
    a: "It depends on the company's settings. Some one-way video interviews allow a practice question or a retake per answer, while live AI interviews usually don't. Read the instructions on the first screen carefully before you start.",
  },
  {
    q: "Can I use AI during an AI interview?",
    a: "Only if the platform gives you an AI tool and the instructions allow it. Some technical AI interviews, like HackerRank's, include an AI assistant on purpose and score how well you use it. Follow the rules in your invite.",
  },
  {
    q: "How do I prepare for an AI interview?",
    a: "Find out the format, study the job description, prepare short structured answers using the STAR method, practise thinking out loud for technical questions, expect follow-up questions on your resume, set up a quiet room with good audio, and rehearse out loud with a timer.",
  },
];

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer">
      {children}
    </a>
  );
}

const formats: { name: string; how: string; examples: string; tip: string }[] = [
  {
    name: "Live voice or video",
    how: "An AI talks to you in real time and asks follow-up questions based on your answers, like a phone screen.",
    examples: "Alex (formerly Apriora), micro1's Zara, HackerRank's Chakra for tech roles",
    tip: "Treat it like a real conversation. Pause, think, then answer.",
  },
  {
    name: "Chat-based",
    how: "You answer written questions in a chat window, and the AI replies with follow-ups.",
    examples: "Sapia.ai, Humanly",
    tip: "Write in full, clear sentences. Your words are all it has.",
  },
  {
    name: "One-way recorded video",
    how: "You see a question, get a short time to think, then record your answer. No one is live on the other side.",
    examples: "HireVue, Spark Hire, Willo",
    tip: "Look at the camera, not your own face on screen.",
  },
];

export default function Post() {
  return (
    <>
      <div className="not-article rounded-2xl border border-sky-200 bg-sky-50 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">TL;DR</p>
        <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-gray-800 leading-relaxed">
          <li>
            More first-round interviews are now run by <strong>AI interviewers</strong>, by voice, chat or recorded
            video.
          </li>
          <li>
            They score every candidate on the <strong>same skills</strong>, and the hiring team gets a report with
            quotes from what you said.
          </li>
          <li>
            The best prep: know the format, use the job description, give <strong>short structured answers</strong>,
            think out loud, and rehearse with a timer.
          </li>
        </ul>
      </div>

      <p>
        You apply for a job, and a day later you get an interview link. You click it, and there&apos;s no recruiter
        waiting for you. Instead, an AI says hello and asks you to introduce yourself.
      </p>
      <p>
        This is quickly becoming normal. In October 2026, HackerRank opened up its AI interviewer, Chakra, to customers
        after it ran{" "}
        <Ext href="https://techcrunch.com/2026/10/05/hackerranks-ai-interviewer-offers-a-glimpse-into-what-job-interviews-could-become">
          more than 500,000 interviews in testing
        </Ext>
        . Platforms like HireVue, micro1 and Alex already run AI interviews for companies hiring at scale. If
        you&apos;re job hunting or sitting campus placements, there&apos;s a good chance at least one of your rounds
        will be with an AI.
      </p>
      <p>Here&apos;s what these interviews look like, what they score, and how to prepare.</p>

      <h2 id="types">The 3 types of AI interviews</h2>
      <p>
        Not every AI interview is the same. Most fall into one of three formats, and each needs slightly different
        prep.
      </p>

      <div className="not-article -mx-4 sm:mx-0 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 text-gray-900">
              <th className="py-3 pl-4 pr-3 font-semibold">Format</th>
              <th className="py-3 px-3 font-semibold">How it works</th>
              <th className="py-3 px-3 font-semibold">Examples</th>
              <th className="py-3 pl-3 pr-4 font-semibold">Quick tip</th>
            </tr>
          </thead>
          <tbody>
            {formats.map((f) => (
              <tr key={f.name} className="border-t border-gray-100 text-gray-600 align-top">
                <td className="py-3 pl-4 pr-3 font-semibold text-gray-900">{f.name}</td>
                <td className="py-3 px-3">{f.how}</td>
                <td className="py-3 px-3">{f.examples}</td>
                <td className="py-3 pl-3 pr-4">{f.tip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        Format categories based on{" "}
        <Ext href="https://fabrichq.ai/blogs/best-ai-interview-platforms-compared-2026">Fabric&apos;s 2026 platform comparison</Ext>.
      </p>
      <p>
        Your invite email usually says which kind it is. If it doesn&apos;t, it&apos;s completely fine to ask the
        recruiter: &quot;Is this a live AI interview or a recorded one, and roughly how long is it?&quot;
      </p>

      <h2 id="what-ai-scores">What an AI interviewer actually scores</h2>
      <p>
        A human interviewer might be tired, distracted or swayed by small talk. An AI interviewer scores everyone
        against the <strong>same rubric</strong>. HackerRank&apos;s{" "}
        <Ext href="https://www.hackerrank.com/writing/how-does-an-ai-interviewer-work">explainer</Ext> lists the
        usual areas:
      </p>
      <ul>
        <li>
          <strong>Technical accuracy:</strong> is what you said correct?
        </li>
        <li>
          <strong>Depth of knowledge:</strong> can you go beyond the textbook answer when asked a follow-up?
        </li>
        <li>
          <strong>Communication clarity:</strong> is your answer organised and easy to follow?
        </li>
        <li>
          <strong>Problem-solving approach:</strong> how do you break a problem down?
        </li>
      </ul>
      <p>
        For technical roles, some AI interviewers go further. HackerRank&apos;s Chakra, for example, gives you a real
        codebase with an AI assistant built in and scores your <strong>judgment</strong> and{" "}
        <strong>&quot;AI fluency&quot;</strong>: how well you frame a problem for AI, check its output and steer it to
        a solution.
      </p>
      <p>
        One more thing to know: the report usually includes <strong>quotes from your own answers</strong> as evidence.
        What you say out loud matters as much as the final answer.
      </p>

      <h2 id="how-to-prepare">How to prepare for an AI interview: 10 tips</h2>

      <h3>1. Find out the format first</h3>
      <p>
        Live voice, chat and recorded video each need different prep. Read the invite carefully, and check the
        length, the deadline and whether retakes are allowed before you start.
      </p>

      <h3>2. Study the job description like an exam paper</h3>
      <p>
        AI interviewers score you against the skills the role needs. Underline the key skills in the job description
        and make sure your answers show evidence for each one, using the same words where they fit naturally.
      </p>

      <h3>3. Use the STAR method for behavioural questions</h3>
      <p>
        <strong>Situation, Task, Action, Result.</strong> A structured answer is easy for an AI (and a human) to score.
        Prepare 4 or 5 stories from projects, internships or college that you can adapt: a challenge you solved, a
        team conflict, a mistake you learned from, something you led.
      </p>

      <h3>4. Keep answers short and focused</h3>
      <p>
        Aim for <strong>60 to 90 seconds</strong> per answer. Lead with the main point, back it up with one example,
        then stop. Rambling makes it harder for any interviewer to find what they&apos;re looking for.
      </p>

      <h3>5. Expect follow-up questions</h3>
      <p>
        Live AI interviewers ask follow-ups based on what you just said, so two candidates can get completely
        different questions. Know every line of your resume well enough to go two levels deeper: why you chose that
        tech, what went wrong, what you&apos;d do differently.
      </p>

      <h3>6. Think out loud on technical questions</h3>
      <p>
        If you&apos;re solving a problem, narrate it: what you&apos;re trying, why, and what you&apos;re checking. A
        silent pause followed by a perfect answer gives the AI much less to score than a clear, talked-through path.
      </p>

      <h3>7. If you&apos;re given an AI assistant, use it well</h3>
      <p>
        Some technical AI interviews include an AI coding assistant on purpose. Give it clear context, ask for small
        pieces, and <strong>always check its output</strong>: run the tests, try an edge case, and say what you found.
        Catching its mistakes is a strong signal.
      </p>

      <h3>8. For recorded video, practise the camera basics</h3>
      <p>
        Put the camera at eye level, sit facing a window or lamp, and look at the lens, not your own face. Use the
        thinking time before each question to jot down two or three bullet points, not a full script.
      </p>

      <h3>9. Set up a quiet, reliable space</h3>
      <p>
        Good audio matters more than good video, because many AI interviewers transcribe what you say. Use earphones
        with a mic, close noisy apps and notifications, check your internet, and do the system check well before your
        slot.
      </p>

      <h3>10. Rehearse out loud with a timer</h3>
      <p>
        Reading answers in your head isn&apos;t practice. Record yourself answering five common questions (&quot;Tell
        me about yourself&quot;, &quot;Why this company?&quot;, a strength, a weakness, a project you&apos;re proud of)
        with a 90-second timer, then watch it back. You&apos;ll spot filler words and rambling immediately.
      </p>

      <h2 id="fairness">Is an AI interview fair?</h2>
      <p>
        It&apos;s a fair question. AI interviewers score everyone the same way, which can reduce some human bias, but
        automated hiring tools can also inherit bias from the data and criteria they&apos;re built on. Places like New
        York City already require bias audits and candidate notice for some automated hiring tools, and many companies
        keep a person in charge of the final decision.
      </p>
      <p>
        If you need an accommodation, such as extra time, captions or a different format, ask the recruiter before you
        start. You&apos;re entitled to understand how you&apos;re being assessed.
      </p>

      <h2 id="faq">Frequently asked questions</h2>
      {faqs.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p className="mt-2">{f.a}</p>
        </div>
      ))}
    </>
  );
}
