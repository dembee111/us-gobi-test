require("dotenv").config();
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  pathPrefix: process.env.GATSBY_APP_PATH,
  siteMetadata: {
    title: process.env.GATSBY_APP_SITE_TITLE,
    description: process.env.GATSBY_APP_SITE_DESCR,
    author: process.env.GATSBY_APP_SITE_AUTHOR,
    siteUrl: process.env.GATSBY_APP_SITE_URL,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
            pathPrefix
          }
          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }`,
        serialize: ({ site, allSitePage }) => {
          let pages = [];
          allSitePage.edges.map((edge) => {
            if (edge.node.path.charAt(edge.node.path.length - 1) === '/') {
              pages.push({
                url: site.siteMetadata.siteUrl + edge.node.path,
                changefreq: `daily`,
                priority: 0.7,
                lastmod: new Date().toISOString().split('T')[0],
              });
            } else {
              pages.push({
                url: site.siteMetadata.siteUrl + edge.node.path + '/',
                changefreq: `daily`,
                priority: 0.7,
                lastmod: new Date().toISOString().split('T')[0],
              });
            }
          });
          return pages;
        },
      },
    },
    'gatsby-plugin-netlify-cache',
    `gatsby-plugin-sass`,
    'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-plugin-google-tagmanager-delayed',
      options: {
        id: 'GTM-TRCNVMC',
        includeInDevelopment: true,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
    },
    {
      resolve: 'gobi-gatsby-source-shopify',
      options: {
        // Your Shopify instance name (e.g. 'shopify-store-name',
        // if your shopify shop is located at https://shopify-store-name.myshopify.com/)
        siteName: process.env.GATSBY_APP_SHOPIFY_SITE,
        // Your Shopify Storefront API access token
        // generated in the private apps section of your store admin.
        // Refer to Shopify's Storefront API Documentation for more information
        // https://help.shopify.com/api/storefront-api/getting-started
        accessToken: process.env.GATSBY_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN
      },
    },
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: process.env.GATSBY_APP_SHOPIFY_STOREFRONT_URL,
        headers: {
          'X-Shopify-Storefront-Access-Token': process.env.GATSBY_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: './src/state/createStore',
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: true,
        // [optional] - name of key on `window` where serialized state will be stored, default:
        windowKey: '__PRELOADED_STATE__',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gobi-gatsby-us`,
        short_name: `Gobi Us`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/assets/favicon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-next-seo',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-image',
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: process.env.GATSBY_APP_SITE_URL_FULL,
        sitemap: process.env.GATSBY_APP_SITE_URL_FULL + '/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  developMiddleware: (app) => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    );
  },
};
