import { CandidatePrompt, ChatMessage } from "prompt-iteration-assistant";
import { RecursiveTwitterSummarizerInput } from "../schemas/recursiveTwitterSummarizerInputSchema";

export const zeroShot = new CandidatePrompt<RecursiveTwitterSummarizerInput>({
  name: "zero-shot-3",
  compile() {
    return [
      ChatMessage.system(
        `
# Instructions
- Act as a user profile writer.
- You are shown a collection of user data.
- Given the information from multiple sources and not prior knowledge summarize the user's interests into a profile that explains what topics, people, concepts and ideas interest them.
- Focus on specific low-level interests, like "the use of large language models (LLMs) in recommender systems", as opposed to generic high-level interests like "AI", "technology" and "innovation".
- Expand abbreviations and acronyms, eg. "LLM agents" should be written as "large language model (LLM) agents".
- You must include any technical terms and names of people, places, and things that are relevant to the user.
- If summarizing existing summaries, preserve the technical terms and names of concepts, people, places, ideas and events that are relevant to the user.
- The summary string should be JSON parsable (escaped quotes, etc).
- Write a two paragraph summary of around 500 words.
`.trim()
      ),
      {
        role: "user",
        content: `
# Username
${this.getVariable("user")}

# Bio
${this.getVariable("bio")}

# User data
${this.getVariable("tweets")}
`.trim(),
      },
    ];
  },
});
