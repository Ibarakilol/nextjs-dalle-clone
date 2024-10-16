import { Header } from '@/components/header';
import { Images } from './_components/images';
import { PromptInput } from './_components/prompt-input';

const RootPage = () => {
  return (
    <>
      <Header />
      <PromptInput />
      <main className="mx-4 md:m-10">
        <Images />
      </main>
    </>
  );
};

export default RootPage;
