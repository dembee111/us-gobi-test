module.exports.productQuery = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          availableForSale
          createdAt
          description
          descriptionHtml
          id
          handle
          tags
          title
          vendor
          options(first: 30) {
            id
            name
            values
          }
          images(first: 100) {
            edges {
              node {
                altText
                originalSrc
              }
            }
          }
          description
          descriptionHtml
          variants(first: 250) {
            edges {
              node {
                
                id
                availableForSale
                selectedOptions {
                  name
                  value
                }
                sku
                title
              }
            }
          }
        }
      }
    }
  }
`;

module.exports.collectionQuery = `
    query GetCollections($first: Int!, $after: String) {
        collections(first: $first, after: $after) {
            pageInfo {
                hasNextPage
            }
            edges {
                cursor
                node {
                    id
                    description
                    descriptionHtml
                    handle
                    title
                    updatedAt
                    products(first: 9) {
                        edges {
                            node {
                                id
                                handle
                                
                            }
                        }
                    }
                }
            }
        }
    }
`;

module.exports.articleQuery = `
  query GetArticles($first: Int!, $after: String) {
    articles(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          author {
            bio
            email
            firstName
            lastName
            name
          }
          blog {
            id
          }
          content
          contentHtml
          excerpt
          excerptHtml
          id
          image {
            altText
            id
            src
          }
          handle
          publishedAt
          tags
          title
          url
        }
      }
    }
  }
`;

module.exports.blogQuery = `
  query GetBlogs($first: Int!, $after: String) {
    blogs(first: $first, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          url
          handle
        }
      }
    }
  }
`;
