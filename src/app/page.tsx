'use client';  // Need this for react-leaflet to work
import Image from "next/image";
import dynamic from 'next/dynamic';
import Projects from '@/components/Projects';
import GitHubActivity from '@/components/GitHubActivity';

// Dynamically import the Map component with no SSR
const MapWithNoSSR = dynamic(
  () => import('@/components/Map'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-lg" />
    ),
  }
);

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        {/* Introduction Section */}
        <section className="w-full text-center sm:text-left mb-12">
          <h1 className="text-4xl font-bold mb-4">Hi, I&apos;m Sun 👋</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Welcome to my portfolio! I&apos;m a passionate developer interested in creating meaningful digital experiences.
          </p>
        </section>

        {/* Map Section */}
        <section className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg mb-12">
          <MapWithNoSSR />
        </section>

        <section className="w-full mb-12">
          <h2 className="text-3xl font-bold mb-6">My Projects</h2>
          <Projects />
        </section>

        <section className="w-full mb-12">
          <h2 className="text-3xl font-bold mb-6">Recent Activity</h2>
          <GitHubActivity />
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
