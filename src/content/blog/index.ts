import type { ComponentType } from "react";
import HowToBeatAtsResume, { faqs as howToBeatAtsResumeFaqs } from "./how-to-beat-ats-resume";
import HowToPrepareForAiInterview, { faqs as howToPrepareForAiInterviewFaqs } from "./how-to-prepare-for-ai-interview";
import BestAiInterviewCopilot, { faqs as bestAiInterviewCopilotFaqs } from "./best-ai-interview-copilot";

export const postContent: Record<string, { Body: ComponentType; faqs?: { q: string; a: string }[] }> = {
  "how-to-beat-ats-resume": { Body: HowToBeatAtsResume, faqs: howToBeatAtsResumeFaqs },
  "how-to-prepare-for-ai-interview": { Body: HowToPrepareForAiInterview, faqs: howToPrepareForAiInterviewFaqs },
  "best-ai-interview-copilot": { Body: BestAiInterviewCopilot, faqs: bestAiInterviewCopilotFaqs },
};
