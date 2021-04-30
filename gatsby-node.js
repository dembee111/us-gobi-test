const path = require(`path`);
const instagramProductList = require('./src/customTemplates/CustomPages/Instagram/AddData.json');
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const collectionPages = await graphql(`
    {
      allGobiShopifyCollection {
        edges {
          node {
            id
            handle

            products {
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
  `);
  const productPages = await graphql(`
    {
      allGobiShopifyProduct {
        edges {
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
            options {
              id
              name
              values
            }
            images {
              edges {
                node {
                  altText
                  originalSrc
                }
              }
            }
            variants {
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
  `);

  const blogs = await graphql(`
    {
      allGobiShopifyBlog {
        edges {
          node {
            id
            title
            url
            handle
          }
        }
      }
    }
  `);

  const articles = await graphql(`
    {
      allGobiShopifyArticle {
        edges {
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
  `);

  // creating collection pages
  if (collectionPages.data.allGobiShopifyCollection) {
    collectionPages.data.allGobiShopifyCollection.edges.forEach(({ node }) => {
      const products = node.products.edges;
      let newPushingArray = [];
      for (let singleCollectionProduct of products) {
        for (let singleProduct of productPages.data.allGobiShopifyProduct.edges) {
          if ('' + singleCollectionProduct.node.id === '' + singleProduct.node.id) {
            newPushingArray.push(singleProduct.node);
          }
        }
      }
      createPage({
        path: `/collections/${node.handle}`,
        component: path.resolve(`./src/customTemplates/CollectionPage/CollectionPage.js`),
        context: {
          handle: node.handle,
          products: newPushingArray,
        },
      });
    });
  }

  // creating product pages
  if (productPages.data.allGobiShopifyProduct) {
    productPages.data.allGobiShopifyProduct.edges.forEach(({ node }) => {
      createPage({
        path: `/products/${node.handle}`,
        component: path.resolve(`./src/customTemplates/ProductPage/ProductPage.js`),
        context: {
          handle: node.handle,
          product: node,
        },
      });
    });
  }

  if (blogs.data.allGobiShopifyBlog) {
    for (let nodeBlog of blogs.data.allGobiShopifyBlog.edges) {
      for (let nodeArticle of articles.data.allGobiShopifyArticle.edges) {
        if (nodeArticle.node.blog.id === nodeBlog.node.id) {
          createPage({
            path: `/blogs/${nodeBlog.node.handle}/${nodeArticle.node.handle}`,
            component: path.resolve(`./src/customTemplates/BlogPage/BlogDetailPage.js`),
            context: {
              blogHandle: nodeBlog.node.handle,
              articleHandle: nodeArticle.node.handle,
            },
          });
        }
      }
    }
  }

  if (instagramProductList) {
    createPage({
      path: `/instagram`,
      component: path.resolve(`./src/customTemplates/CustomPages/Instagram/Instagram.js`),
      context: {
        products: instagramProductList,
        currency: {
          chosenShippingCountry: 'ALL',
          currencyCode: 'EUR',
          currencySymbol: 'â‚¬',
        },
      },
    });
  }
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/products/)) {
    page.matchPath = '/products/*';
    createPage(page);
  }
  if (page.path.match(/^\/collections/)) {
    page.matchPath = '/collections/*';
    createPage(page);
  }
  if (page.path.match(/^\/search/)) {
    page.matchPath = '/search/*';
    createPage(page);
  }
  if (page.path.match(/^\/account\/activate/)) {
    page.matchPath = '/account/activate/*/*';
    createPage(page);
  }
  if (page.path.match(/^\/account\/resetToken/)) {
    page.matchPath = '/account/reset/*/*';
    createPage(page);
  }
  if (page.path.match(/^\/bundles/)) {
    page.matchPath = '/bundles/*';
    createPage(page);
  }
};
