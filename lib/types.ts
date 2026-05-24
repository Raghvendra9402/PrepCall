export interface TranscriptMessage {
  role: "assistant" | "user";
  content: string;
}

export interface Feedback {
  strengths: string[];
  finalVerdict: { score: number; justification: string };
  areasToImprove: string[];
  overallImpression: string;
}
