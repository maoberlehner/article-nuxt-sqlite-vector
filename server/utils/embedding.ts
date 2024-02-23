import OpenAI from 'openai';

export const getEmbedding = async (text: string) => {
  const openai = new OpenAI({
    apiKey: useRuntimeConfig().openAi.secretKey,
  });
  const stringRaw = text.replace(/[\n\r]/g, ' ');
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: stringRaw,
  });

  return response.data[0].embedding;
};
