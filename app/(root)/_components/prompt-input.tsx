'use client';

import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';
import { getChatResponse } from '@/lib/chatgpt';
import { cn } from '@/lib/utils';

export const PromptInput = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [isSuggestionLoading, setIsSuggestionLoading] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const createImage = useMutation(api.images.createImage);

  const isLoading = isSuggestionLoading || isImageLoading;

  const generateSuggestion = async () => {
    try {
      setIsSuggestionLoading(true);

      const chatResponse = await getChatResponse(
        'Write a random text prompt for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.'
      );
      setSuggestion(chatResponse);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSuggestionLoading(false);
    }
  };

  const submitPrompt = async (useSuggestion?: boolean) => {
    const promptText = useSuggestion ? suggestion : prompt.trim();
    setPrompt('');

    if (!promptText) {
      return;
    }

    setIsImageLoading(true);

    try {
      const notificationPromptText = promptText.slice(0, 40);

      const loadingToast = toast.loading(`DALL·E is creating: ${notificationPromptText}...`);
      const dalleResponse = await getChatResponse(promptText, true);
      const fileName = `${promptText}_${new Date().getTime()}.png`;
      await createImage({ fileName, url: dalleResponse });

      toast.dismiss(loadingToast);
      toast.success('Your AI Art has been Generated!');
    } catch (err) {
      console.log(err);
      toast.error('Error getting image!');
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleSubmitPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
        onSubmit={handleSubmitPrompt}
      >
        <textarea
          className="flex-1 p-4 outline-none rounded-md resize-none"
          disabled={isLoading}
          placeholder={
            (isSuggestionLoading && 'ChatGpt is thinking of a suggestion...') ||
            suggestion ||
            'Enter a prompt...'
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className={cn(
            'p-4 font-bold',
            prompt
              ? 'bg-violet-700 text-white transition-colors duration-200'
              : 'text-gray-300 cursor-not-allowed'
          )}
          disabled={!prompt || isLoading}
          type="submit"
        >
          Generate
        </button>
        <button
          className="p-4 bg-violet-700 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={!suggestion || isLoading}
          type="button"
          onClick={() => submitPrompt(true)}
        >
          Use Suggestion
        </button>
        <button
          className="p-4 bg-white text-violet-700 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold disabled:text-gray-300 disabled:cursor-not-allowed"
          disabled={isLoading}
          type="button"
          onClick={generateSuggestion}
        >
          New Suggestion
        </button>
      </form>
      {prompt && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{' '}
          <span className="text-violet-500">
            {isSuggestionLoading ? 'ChatGpt is thinking....' : suggestion}
          </span>
        </p>
      )}
    </div>
  );
};
