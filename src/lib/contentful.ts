const GRAPHQL_URL =
  `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}`;

export async function contentfulFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
    },
    body: JSON.stringify({ query, variables })
  });

  if (!res.ok) {
    const errorJson = await res.json();
    console.error('[Contentful Error JSON]', JSON.stringify(errorJson, null, 2));
    throw new Error(`Contentful error: ${res.statusText}`);
  }

  const { data } = await res.json();

  return data;
}
