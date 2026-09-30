import { buildSystemPromptText } from "../lib/ai/systemPrompt.js";

const text = buildSystemPromptText({
  country: "US",
  region: "TX",
  isNewConversation: true,
  hasEmail: false,
  hasPhone: false,
  contactName: null,
});

process.stdout.write(text);
