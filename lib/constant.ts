export const FEEDBACK_PROMPT = `
    You are acting as an experienced interviewer.
Below is the conversation between a candidate and an AI interviewer during an interview:

Interview Transcript:
{{ conversation }}

Task: Analyze the conversation and give concise, professional feedback in strict JSON format with the following keys:
{
  "overall_impression": "string – short summary of how the interview went",
  "strengths": ["list of strengths"],
  "areas_to_improve": ["list of improvement points"],
  "final_verdict": {
      "score": "number from 1 to 10",
      "justification": "one-line reason for the score"
  }
}

- Do not output anything except valid JSON.

- Do not include the transcript in the output.

- Keep each string concise and under 30 words.
`;
