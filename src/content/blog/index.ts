import type { ComponentType } from "react";
import BestAiInterviewCopilot, { faqs as bestAiInterviewCopilotFaqs } from "./best-ai-interview-copilot";

export const postContent: Record<string, { Body: ComponentType; faqs?: { q: string; a: string }[] }> = {
  "best-ai-interview-copilot": { Body: BestAiInterviewCopilot, faqs: bestAiInterviewCopilotFaqs },
};
