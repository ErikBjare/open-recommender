import {
  CandidatePrompt,
  ChatMessage,
  toCamelCase,
} from "prompt-iteration-assistant";
import { FindStartOfAnswerInput } from "../schemas/findStartOfAnswerOutputSchema";
import { FIND_START_OF_ANSWER as FIND_START_OF_ANSWER } from "../findStartOfAnswer";
import { FindStartOfAnswerOutput } from "../schemas/findStartOfAnswerInputSchema";

export const findStartOfAnswerPrompt =
  new CandidatePrompt<FindStartOfAnswerInput>({
    name: "main",
    compile() {
      return [
        ChatMessage.system(
          `
# Instructions
- Given a question from the user, evalutate whether the beginning of the answer is in the text.
- If the beginning of the answer is in the text, quote the beginning of the answer.
- The answer doesn't need to be complete, just the start of it.
- Quote the beginning of the answer directly from the text.
`.trim()
        ),
        //         ChatMessage.user(
        //           `
        // # Text

        // # Question
        // What is the best way to learn a new language?
        // `.trim()
        //         ),
        //         ChatMessage.assistant<FindStartOfAnswerOutput>(null, {
        //           name: toCamelCase(FIND_START_OF_ANSWER),
        //           arguments: {
        //             answersQuestion: true,
        //             quotedAnswer: "",
        //           },
        //         }),
        //         ChatMessage.user(
        //           `
        // # Text

        // # Question
        // How does chain of thought prompting work?
        // `.trim()
        //         ),
        //         ChatMessage.assistant<FindStartOfAnswerOutput>(null, {
        //           name: toCamelCase(FIND_START_OF_ANSWER),
        //           arguments: {
        //             answersQuestion: false,
        //           },
        //         }),
        ChatMessage.user(
          `
# Text
${this.getVariable("text")}
# Question
${this.getVariable("question")}
`.trim()
        ),
      ];
    },
  });
