import { createOpenAI } from "@ai-sdk/openai";

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is missing");
}

export const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",

  apiKey: process.env.OPENROUTER_API_KEY,
});
