const { collectionQuery, productQuery, blogQuery, articleQuery } = require('./queries');
const { queryAll, createNodes } = require('./lib');

exports.sourceNodes = async ({ actions }, { siteName, accessToken }) => {
  const client = require('graphql-client')({
    url: `https://${siteName}.myshopify.com/api/2020-04/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
  });

  const collectionResponse = await queryAll(client, 'collections', collectionQuery, 250);

  await createNodes(actions.createNode, collectionResponse, 'GobiShopifyCollection');

  const productResponse = await queryAll(client, 'products', productQuery, 100);

  await createNodes(actions.createNode, productResponse, 'GobiShopifyProduct');

  const blogResponse = await queryAll(client, 'blogs', blogQuery, 250);

  await createNodes(actions.createNode, blogResponse, 'GobiShopifyBlog');

  const articleResponse = await queryAll(client, 'articles', articleQuery, 250);

  await createNodes(actions.createNode, articleResponse, 'GobiShopifyArticle');

  return;
};
