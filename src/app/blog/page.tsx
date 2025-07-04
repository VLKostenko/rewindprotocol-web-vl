import Link from 'next/link';
import { contentfulFetch } from '@/lib/contentful';
import { BLOG_PAGE_QUERY } from "@/graphql/blogPageQuery";
import type { Document } from '@contentful/rich-text-types';

export default async function Blog() {
  let data;
  let title;
  let errorMsg = '';
  let blogItems;

  try {
    data = await contentfulFetch<{
      newsPageCollection: {
        items: {
          blogTitle: string;
          blogItemsCollection: {
            items: {
              title: string;
              slug: string;
              data?: string;
              description?: { json: Document };
              sys: { id: string };
            }[];
          };
        }[];
      };
    }>(BLOG_PAGE_QUERY);

    const page = data.newsPageCollection.items[0];
    title = page?.blogTitle;
    blogItems = page?.blogItemsCollection?.items;

  } catch (error) {
    console.error('GraphQL Error:', error);
    errorMsg = 'Failed to fetch data. Please try again later.';
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav>
        <ul className={'text-white flex gap-[16px]'}>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
        </ul>
      </nav>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {errorMsg && <div className="error">{errorMsg}</div>}

        {title}

        {
          blogItems?.map((item) => {
            return (
              <Link href={`/blog/${item.slug}`} key={item.sys.id}>
                <div id={item.sys.id}>
                  <h1>{item.title}</h1>
                  <p>Date posted {item.data && new Date(item.data).toLocaleDateString('en-US')}</p>
                </div>
              </Link>
            )
          })
        }
      </main>
    </div>
  );
}
