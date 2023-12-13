import { z } from "zod";

export const createQueriesOutputSchema = z.object({
  queries: z.array(
    z.object({
      query: z.array(z.string()),
      tweetIDs: z.array(z.number()),
    })
  ),
});