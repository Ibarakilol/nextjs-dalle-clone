'use client';

import { useQuery } from 'convex/react';
import Image from 'next/image';

import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';

export const Images = () => {
  const images = useQuery(api.images.getImages);

  return (
    <div className="pb-10">
      {!images ? (
        <p className="animate-pulse text-center pb-7 font-extralight">
          Loading <span className="text-violet-400">AI</span> Generated Images...
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10 ">
          {images.map((image, idx) => (
            <div
              key={image.fileName}
              className={cn(
                'relative cursor-help hover:scale-[103%] transition-transform duration-200 ease-in-out',
                idx === 0 && 'md:col-span-2 md:row-span-2'
              )}
            >
              <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10">
                <p className="text-center font-light text-lg p-5">
                  {image.fileName.split('_').shift()?.toString().split('.').shift()}
                </p>
              </div>
              <Image
                alt={image.fileName}
                className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
                height={800}
                priority
                src={image.url}
                width={800}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
