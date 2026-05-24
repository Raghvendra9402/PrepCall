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

export type VapiMessage = {
  type: string;
  role: "assistant" | "user";
  transcript: string;
  transcriptType: string;
};
