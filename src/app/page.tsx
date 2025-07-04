import Link from 'next/link';
import { contentfulFetch } from '@/lib/contentful';
import { HOME_PAGE_QUERY } from "@/graphql/homePageQuery";

export default async function Home() {
  let data;
  let title;
  let errorMsg = '';

  try {
    data = await contentfulFetch<{homePage: { title: string } }>(HOME_PAGE_QUERY);
    title = data?.homePage?.title;
  } catch (error) {
    console.error('GraphQL Error:', error);
    errorMsg = 'Failed to fetch data. Please try again later.';
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav>
        <ul className={'text-white flex gap-[17px]'}>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/blog'}>Blog</Link>
          </li>
        </ul>
      </nav>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {errorMsg && <div className="error">{errorMsg}</div>}

        {title}
      </main>
    </div>
  );
}
