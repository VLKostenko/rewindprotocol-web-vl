import { notFound } from 'next/navigation';
import { contentfulFetch } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { BLOG_POST_PAGE_QUERY } from "@/graphql/blogPostPageQuery";
import type { Document } from '@contentful/rich-text-types';

interface BlogItem {
  title: string;
  slug: string;
  data?: string;
  description?: { json: Document };
}

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPageProps) {
  let errorMsg = '';
  let blogItem: BlogItem | undefined;

  const { slug } = await params;

  try {
    const data = await contentfulFetch<{
      blogItemCollection: {
        items: BlogItem[];
      };
    }>(BLOG_POST_PAGE_QUERY, { slug });

    blogItem = data.blogItemCollection.items[0];
  } catch (error) {
    console.error('GraphQL Error:', error);
    errorMsg = 'Failed to fetch data. Please try again later.';
    return notFound();
  }

  if (!blogItem) return notFound();

    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {errorMsg && <div className="error">{errorMsg}</div>}

        <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1>{blogItem.title}</h1>

          {blogItem.data && (
            <p className="flex gap-2 text-sm text-gray-500">
              Date posted
              <span>
                {blogItem.data && new Date(blogItem.data).toLocaleDateString('en-US')}
              </span>
            </p>
          )}

          {blogItem.description?.json &&
            documentToReactComponents(blogItem.description.json, {
              renderNode: {
                [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
                [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
              },
            })}
        </div>

      </div>
    )
}
