export const BLOG_PAGE_QUERY = `
   query GetBlogPage {
    newsPageCollection(limit: 1) {
      items {
        blogTitle
        blogItemsCollection {
          items {
            ... on BlogItem {
              title
              data
              slug
              description { json }
              sys { id }
            }
          }
        }
      }
    }
  }
`
