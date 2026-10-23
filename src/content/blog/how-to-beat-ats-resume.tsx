import Link from "next/link";

export const faqs: { q: string; a: string }[] = [
  {
    q: "What is an ATS?",
    a: "An ATS (applicant tracking system) is software companies use to collect, organise and search job applications. Popular ones include Workday, Greenhouse, Lever, iCIMS and SAP SuccessFactors, and in India Naukri RMS, Darwinbox and Zoho Recruit. It reads your resume into a candidate profile that recruiters can search and filter.",
  },
  {
    q: "Is it true that 75% of resumes are rejected by ATS?",
    a: "No. The \"75%\" figure traces back to a 2012 marketing claim by a resume-services company, with no published study behind it. Most ATS don't automatically reject resumes. Applications are usually filtered by knockout questions, by recruiters searching for keywords, or simply lost in the volume of applicants.",
  },
  {
    q: "Should I send my resume as a PDF or Word file?",
    a: "Both work in modern ATS, as long as the PDF is text-based (you can select and copy the text) and not a scanned image. If the job portal specifically asks for .docx, use that.",
  },
  {
    q: "Can an ATS read tables, columns and text boxes?",
    a: "Not reliably. Multi-column layouts, tables and text boxes can scramble the order of your information when it is parsed. A single-column layout with standard headings is the safest choice.",
  },
  {
    q: "How many keywords should my resume have?",
    a: "There's no magic number. Include the main skills, tools and job titles from the job description wherever they're genuinely true for you, in both your skills section and your experience bullets. Don't stuff keywords; a recruiter reads the resume in the end.",
  },
  {
    q: "Is it okay to use AI to write my resume?",
    a: "Yes, as a starting point. Use AI to tighten bullet points or match the job description's wording, then edit so every line is true, specific and sounds like you. Recruiters notice generic, buzzword-heavy resumes.",
  },
];

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer">
      {children}
    </a>
  );
}

const format: [string, string][] = [
  ["One column, top to bottom", "Two or three columns, sidebars"],
  ["Standard headings: Experience, Education, Skills, Projects", "Creative headings like \"My Journey\" or \"What I Bring\""],
  ["Contact details in the main body", "Contact details only in the page header or footer"],
  ["Plain bullet points", "Tables, text boxes, icons and skill-rating bars"],
  ["Common fonts (Calibri, Arial, Garamond), 10–12 pt", "Decorative fonts, text inside images"],
  ["Consistent dates, e.g. \"Jan 2024 – Mar 2025\"", "Mixed date formats or years with no months"],
  [".docx or text-based PDF", "Scanned PDF, image, or .pages file"],
  ["File name: Firstname-Lastname-Resume.pdf", "resume_final_v3_NEW.pdf"],
];

export default function Post() {
  return (
    <>
      <div className="not-article rounded-2xl border border-sky-200 bg-sky-50 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">TL;DR</p>
        <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-gray-800 leading-relaxed">
          <li>
            An <strong>ATS</strong> doesn&apos;t secretly reject most resumes. The &quot;75% rejected&quot; stat is a
            myth.
          </li>
          <li>
            Resumes get missed because they <strong>parse badly</strong>, fail a <strong>knockout question</strong>, or
            don&apos;t contain the <strong>keywords recruiters search for</strong>.
          </li>
          <li>
            Fix all three with a simple single-column format, the job description&apos;s own words, and a 5-minute
            self-test before you apply.
          </li>
        </ul>
      </div>

      <p>
        You applied to 40 jobs and heard back from two. The internet says a robot called &quot;the ATS&quot; threw your
        resume in the bin. That&apos;s only partly true, and knowing which part changes what you should fix.
      </p>
      <p>
        This guide explains what an ATS actually does, busts the most famous myth about it, and gives you a checklist to
        make your resume <strong>ATS-friendly</strong> in about 20 minutes.
      </p>

      <div className="not-article rounded-2xl border border-sky-200 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-900">Check your resume in 30 seconds</p>
          <p className="text-sm text-gray-600 mt-1">Free ATS match score, missing keywords and format checks. No sign-up.</p>
        </div>
        <Link
          href="/tools/ats-resume-checker"
          className="shrink-0 inline-flex justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold !text-white !no-underline hover:bg-sky-600"
        >
          Try the free ATS checker
        </Link>
      </div>

      <h2 id="what-is-ats">What is an ATS?</h2>
      <p>
        An <strong>ATS (applicant tracking system)</strong> is software companies use to collect, organise and search
        job applications. When you click &quot;Apply&quot;, your resume goes into the ATS, which turns it into a
        candidate profile the hiring team can search, filter and move through stages.
      </p>
      <p>
        Common ones include <strong>Workday</strong>, <strong>Greenhouse</strong>, <strong>Lever</strong>,{" "}
        <strong>iCIMS</strong> and <strong>SAP SuccessFactors</strong>. Many Indian companies use{" "}
        <strong>Naukri RMS</strong>, <strong>Darwinbox</strong> or <strong>Zoho Recruit</strong>. If a job asks you to
        create an account on a company careers portal, you&apos;re almost certainly applying through an ATS.
      </p>

      <h2 id="how-ats-works">How an ATS actually reads your resume</h2>
      <p>Most systems follow the same four steps:</p>
      <ol>
        <li>
          <strong>Parsing.</strong> The ATS pulls your name, contact details, job titles, dates, skills and education
          out of your file and into fields. If your layout confuses the parser, your experience can land in the wrong
          place, or nowhere.
        </li>
        <li>
          <strong>Knockout questions.</strong> Many applications ask screening questions: work authorisation, minimum
          years of experience, notice period, location, a required certification. A &quot;wrong&quot; answer here can
          end the application automatically.
        </li>
        <li>
          <strong>Search and ranking.</strong> Recruiters search the ATS for skills, tools and titles, and many systems
          now add an AI layer that scores or summarises how well each resume matches the job description.
        </li>
        <li>
          <strong>Human review.</strong> A recruiter reads the shortlisted resumes and decides who to call.
        </li>
      </ol>
      <p>
        So the ATS mostly <strong>organises and ranks</strong>. The real filters are bad parsing, knockout answers, and
        not showing up in a recruiter&apos;s keyword search.
      </p>

      <h2 id="myth">The &quot;75% of resumes are rejected by ATS&quot; myth</h2>
      <p>
        You&apos;ve probably seen this stat on LinkedIn. It traces back to a <strong>2012 marketing claim</strong> by a
        resume-services company that never published how it got the number, and that company shut down a year later
        (as{" "}
        <Ext href="https://blog.hiringthing.com/applicant-tracking-system-myths">HiringThing explains</Ext>).
      </p>
      <p>
        When recruiters are actually asked, very few say they set their ATS to auto-reject resumes based on a keyword
        score (
        <Ext href="https://itbrief.co.uk/story/study-reveals-ats-rarely-auto-rejects-cvs-debunks-75-myth">
          a 2025 recruiter study
        </Ext>
        ). The bigger reason most applications go unanswered is <strong>volume</strong>: a popular role can get
        hundreds of applications in a few days, and recruiters only reach the top of the pile.
      </p>
      <blockquote>
        The goal isn&apos;t to &quot;trick the robot&quot;. It&apos;s to be easy to parse, pass the screening
        questions, and show up near the top when a recruiter searches.
      </blockquote>

      <h2 id="format-checklist">ATS-friendly resume format: do this, not that</h2>

      <div className="not-article -mx-4 sm:mx-0 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 text-gray-900">
              <th className="py-3 pl-4 pr-3 font-semibold">Do</th>
              <th className="py-3 pl-3 pr-4 font-semibold">Avoid</th>
            </tr>
          </thead>
          <tbody>
            {format.map(([doThis, avoid]) => (
              <tr key={doThis} className="border-t border-gray-100 text-gray-600 align-top">
                <td className="py-3 pl-4 pr-3">{doThis}</td>
                <td className="py-3 pl-3 pr-4">{avoid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Fancy Canva templates look great to humans and terrible to parsers. If you love your designed resume, keep it
        for networking and email, and use a plain version for portals.
      </p>

      <h2 id="keywords">How to use keywords (without stuffing)</h2>

      <h3>1. Pull keywords from the job description</h3>
      <p>
        Read the posting and highlight the <strong>skills, tools, job titles and certifications</strong> it mentions,
        especially anything under &quot;requirements&quot; or repeated more than once. Those are the words a recruiter
        is likely to type into the ATS search box.
      </p>

      <h3>2. Use their exact wording</h3>
      <p>
        If the job says &quot;React.js&quot; and you wrote &quot;ReactJS&quot;, or it says &quot;Customer Success&quot;
        and you wrote &quot;Client Servicing&quot;, match their version where it&apos;s accurate. Newer systems
        understand synonyms, but exact matches are still the safest.
      </p>

      <h3>3. Write the acronym and the full term</h3>
      <p>
        Write &quot;Machine Learning (ML)&quot;, &quot;Search Engine Optimisation (SEO)&quot; or &quot;Amazon Web
        Services (AWS)&quot; once, so you match whichever one the recruiter searches.
      </p>

      <h3>4. Put keywords in two places</h3>
      <p>
        List them in a <strong>Skills</strong> section, and also use them in your <strong>experience bullets</strong>{" "}
        with proof. A skills list says you know Python; a bullet shows it.
      </p>

      <h3>5. Don&apos;t stuff or hide keywords</h3>
      <p>
        Pasting the whole job description in white text, or repeating &quot;Python&quot; 20 times, doesn&apos;t help.
        Many systems show recruiters the plain text, and AI screening now flags it. A human reads your resume at the
        end, so it has to read well.
      </p>

      <h2 id="bullets">Turn duties into results</h2>
      <p>
        Keywords get you found; results get you called. Start bullets with an action verb, say what you did, and add a
        number wherever you can.
      </p>
      <ul>
        <li>
          <strong>Before:</strong> &quot;Responsible for the college placement website.&quot;
        </li>
        <li>
          <strong>After:</strong> &quot;Built the college placement portal in React and Node.js, used by 1,200+
          students across 3 placement drives.&quot;
        </li>
      </ul>
      <p>
        No work experience yet? <strong>Projects, internships, hackathons and certifications</strong> count. Give them
        the same treatment: what you built, with which tools, and what happened.
      </p>

      <h2 id="knockouts">Don&apos;t fail the knockout questions</h2>
      <p>
        Screening questions are where many applications quietly end. Answer them carefully and honestly:
      </p>
      <ul>
        <li>
          <strong>Experience:</strong> count internships and relevant projects if the question allows it, but
          don&apos;t inflate years.
        </li>
        <li>
          <strong>Notice period and joining date:</strong> give a realistic date. A long notice period can push you
          down the list, so mention if it&apos;s negotiable.
        </li>
        <li>
          <strong>Expected salary / CTC:</strong> research the range first. A number far above the band can filter
          you out.
        </li>
        <li>
          <strong>Location and work authorisation:</strong> double-check before you submit. These are the most common
          automatic rejections.
        </li>
      </ul>

      <h2 id="self-test">The 5-minute ATS self-test</h2>
      <p>
        Short on time? Our <Link href="/tools/ats-resume-checker">free ATS resume checker</Link> runs most of these
        checks for you and lists the keywords you&apos;re missing.
      </p>
      <p>Do this before every important application:</p>
      <ol>
        <li>
          <strong>Copy-paste test.</strong> Open your PDF, select all, and paste it into a plain text editor. If the
          order is jumbled, words are missing, or your name appears at the bottom, a parser will struggle too.
        </li>
        <li>
          <strong>Keyword check.</strong> Put the job description and your resume side by side. Tick off each
          important skill or tool. Add any that are true for you but missing.
        </li>
        <li>
          <strong>Heading check.</strong> Are your sections called Experience, Education, Skills and Projects?
        </li>
        <li>
          <strong>Contact check.</strong> Are your email and phone number in the main body, not only in the header?
        </li>
        <li>
          <strong>Human check.</strong> Read the top third of the page. Would a recruiter know your target role and
          strongest skill in 10 seconds?
        </li>
      </ol>

      <h2 id="after">After the ATS: the interview</h2>
      <p>
        Getting past the ATS gets you the call. The interview is where the offer is won, so start preparing as soon as
        you apply. Our guide on{" "}
        <Link href="/blog/how-to-prepare-for-ai-interview">how to prepare for an AI interview</Link> covers the new
        AI-run first rounds, and the{" "}
        <Link href="/ai-interview-assistant">AI interview assistant</Link> page shows how Ghost helps in the interview itself.
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
