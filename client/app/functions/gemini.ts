const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

//You will need to set NEXT_PUBLIC_GEMINI_API_KEY check docs

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 10,
  responseMimeType: "text/plain",
};

export async function classifyEmail(message: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
  const prompt = `Classify the following email into one of these categories: Important, Promotional, Social, Marketing, Spam. Return one word answer only.\nEmail:\n${message}\n\nCategory:`;
  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}
