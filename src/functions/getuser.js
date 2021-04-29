const axios = require('axios');

/*
    Shopify Graphql Proxy Middleware
*/
export async function handler(event, context, callback) {
  // Make sure method is POST
  if (event.httpMethod !== 'POST') {
    callback(null, {
      statusCode: 405,
      body: 'Method Not Allowed',
    });
  }
  const id = event.body;

  const gangan = {
    query: `
    {customer(id:"${id}") {
      displayName
      email
  
      orders(first: 10) {
        edges {
          node {
            currencyCode
            name
            createdAt
            totalShippingPrice
            totalRefundedSet{
              presentmentMoney{
                currencyCode
                amount
              }
              shopMoney{
                amount
              }
            }
            currentCartDiscountAmountSet{
              presentmentMoney{
                amount
                currencyCode
              }
            }
            currentSubtotalLineItemsQuantity
            currentSubtotalPriceSet{
              presentmentMoney{
                amount
                currencyCode
              }
            }
            currentTotalDiscountsSet{
              presentmentMoney{
                amount
                currencyCode
              }
            }
            currentTotalPriceSet{
              presentmentMoney{
                currencyCode
                amount
              }
            }
            currentTotalTaxSet{
              presentmentMoney{
                currencyCode
                amount
              }
            }
            currentTotalWeight
            
            lineItems(first: 10) {
              edges {
                node {
                  name
                  title
                  fulfillmentStatus
                  discountedTotalSet {
                    presentmentMoney {
                      amount
                    }
                  }
                  discountedUnitPriceSet {
                    presentmentMoney {
                      amount
                    }
                  }
                  originalTotalSet {
                    presentmentMoney {
                      amount
                    }
                    shopMoney {
                      amount
                    }
                  }
                  product{
                    totalVariants
                    defaultCursor
                    onlineStorePreviewUrl
                    title
                    createdAt
                    images(first:1){
                      edges{
                        node{
                        originalSrc
                        }
                      }
                    }
                
                  }
                }
              }
            }
          }
        }
      }    
    }}`,
  };

  // const shop = event.headers['x-shopify-shop-domain'];
  const shopAccessToken = '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';
  const graphqlEndpoint = `https://gobicashmereus.myshopify.com/admin/api/2021-01/graphql.json`;
  const query = gangan;

  if (!shopAccessToken || !query) {
    callback(null, {
      statusCode: 403,
      body: 'Error mising required headers',
    });
  }

  try {
    await axios({
      method: 'POST',
      url: graphqlEndpoint,
      data: query,
      headers: {
        'X-Shopify-Access-Token': shopAccessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((result) => {
        if (!result) {
          console.error('No data found');
          callback(null, {
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers':
                'Origin, X-Requested-Width, Content-Type, Accept',
            },
            body: 'No data found.',
          });
        }

        callback(null, {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-Width, Content-Type, Accept',
          },
          body: JSON.stringify(result.data),
        });
      })
      .catch((error) => {
        let errorCode = 500;

        if (
          error.response.data.errors.includes('Invalid API key or access token')
        ) {
          console.error('Invalid API key or access token');
          errorCode = 401;
        }

        callback(null, {
          statusCode: errorCode,
          body: error.response && JSON.stringify(error.response.data.errors),
        });
      });
  } catch (error) {
    console.warn(error.response);
    callback(null, {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-Width, Content-Type, Accept',
      },
      body: error.response && JSON.stringify(error.response.data.errors),
    });
  }
}
