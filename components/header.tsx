import Image from 'next/image';

export const Header = () => {
  return (
    <header className="flex p-5 sticky top-0 bg-white z-50 shadow-md">
      <div className="flex space-x-2 items-center ">
        <Image alt="OpenAI Logo" height={30} src="/open-ai-logo.png" width={30} />
        <div>
          <h1 className="font-bold">Image generator</h1>
          <h2 className="text-xs">Powered by DALL·E & ChatGPT</h2>
        </div>
      </div>
    </header>
  );
};
