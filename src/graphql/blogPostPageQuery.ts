export const BLOG_POST_PAGE_QUERY = `
   query GetBlogItemBySlug($slug: String!) {
        blogItemCollection(where: { slug: $slug }, limit: 1) {
          items {
            title
            slug
            data
            description {
              json
            }
          }
        }
      }
`
