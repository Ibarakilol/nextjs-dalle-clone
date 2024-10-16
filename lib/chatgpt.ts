// @ts-ignore
import GPT4js from 'gpt4js';

const chatGPTOptions = {
  provider: 'Nextway',
  model: 'gpt-4o-free',
};

const dalleOptions = {
  provider: 'DALLE2',
};

export const getChatResponse = async (prompt: string, isDalle = false) => {
  const provider = GPT4js.createProvider(isDalle ? 'DALLE2' : 'Nextway');

  if (isDalle) {
    const dalleResponse = await provider.imageGeneration(prompt, dalleOptions);
    return dalleResponse[0];
  } else {
    const chatResponse = await provider.chatCompletion(
      [{ role: 'user', content: prompt }],
      chatGPTOptions
    );
    return chatResponse;
  }
};
