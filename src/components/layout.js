import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import algoliasearch from 'algoliasearch/lite';
import getSymbolFromCurrency from 'currency-symbol-map';
import countryCurrencyMap from 'country-currency-map';
import { useMutation, useLazyQuery, useApolloClient } from '@apollo/client';
import store from '../state/createStore';

import Header from './shared/header/header';

import Footer from './shared/footer/footer';

import { approvedCountryList } from './shared/data/approvedCountryList';

import { approvedCurrencyList } from './shared/data/approvedCurrency';
import { getWishlist, setWishlist } from '../customTemplates/WishlistPage/WishlistHelpers';

import { getCustomer, getCheckout } from './shared/query/query';

import { createCheckout, checkoutLineItemsReplace } from './shared/mutation/mutation';
import './layout.scss';

import { initCurrency } from './shared/cart/CartHelpers';

import { Helmet } from 'react-helmet';

import { CookieBanner } from '@palmabit/react-cookie-law';


const mapStateToProps = (state) => ({
  customer: state.customer,
  signedIn: state.signedIn,
  currency: state.currency,
  myWishlist: state.myWishlist,
  checkout: state.checkout,
  customerAccessTokenObject: state.customerAccessTokenObject,
  justAdded: state.justAdded,
});

function Layout(props) {
  const [
    createCheckoutMutation,
    { data: createCheckoutMutationData, error: createCheckoutMutationError },
  ] = useMutation(createCheckout, {
    errorPolicy: 'all',
  });

  const [searchInput, setSearchInput] = useState('');

  const [
    updateCheckoutCurrencyMutation,
    { data: updateCheckoutCurrencyMutationData, error: updateCheckoutCurrencyMutationError },
  ] = useMutation(createCheckout, { errorPolicy: 'all' });

  const [getCustomerQuery, { data: getCustomerData, error: getCustomerError }] = useLazyQuery(getCustomer, {
    errorPolicy: 'all',
  });

  const [
    checkoutLineItemsReplaceMutation,
    {
      data: checkoutLineItemsReplaceMutationData,
      loading: checkoutLineItemsReplaceLoading,
      error: checkoutLineItemsReplaceError,
    },
  ] = useMutation(checkoutLineItemsReplace);

  const [getCheckoutQuery, { data: getCheckoutData, error: getCheckoutError }] = useLazyQuery(getCheckout, {
    errorPolicy: 'all',
  });
  const client = useApolloClient();

  useEffect(() => {
    if (checkoutLineItemsReplaceError) {
      console.log(checkoutLineItemsReplaceError);
      callCreateCheckout();
    } else if (checkoutLineItemsReplaceMutationData) {
      try {
        if (
          checkoutLineItemsReplaceMutationData.checkoutLineItemsReplace &&
          checkoutLineItemsReplaceMutationData.checkoutLineItemsReplace.userErrors &&
          checkoutLineItemsReplaceMutationData.checkoutLineItemsReplace.userErrors.length > 0
        ) {
          callCreateCheckout();
        }
        let { webUrl } = checkoutLineItemsReplaceMutationData.checkoutLineItemsReplace.checkout;
        const { lineItems } = checkoutLineItemsReplaceMutationData.checkoutLineItemsReplace.checkout;

        store().dispatch({
          type: 'UPDATE_QUANTITY_IN_CART',
          payload: {
            checkout: {
              lineItems,
              id: checkoutLineItemsReplaceMutationData.checkoutLineItemsReplace.checkout.id,
              webUrl,
              totalTax: checkoutLineItemsReplaceMutationData.checkoutLineItemsReplace.checkout.totalTax,
              subtotalPriceV2: checkoutLineItemsReplaceMutationData.checkoutLineItemsReplace.checkout.subtotalPriceV2,
              totalPriceV2: checkoutLineItemsReplaceMutationData.checkoutLineItemsReplace.checkout.totalPriceV2,
            },
          },
        });
      } catch (e) {
        callCreateCheckout();
      }
    }
  }, [checkoutLineItemsReplaceMutationData, checkoutLineItemsReplaceError]);

  useEffect(() => {
    if (getCheckoutError) {
      console.log('getCheckoutError', getCheckoutError);
      callCreateCheckout();
    } else if (getCheckoutData) {
      if (getCheckoutData.node && !getCheckoutData.node.completedAt && getCheckoutData.node.lineItems) {
        try {
          let webUrl = getCheckoutData.node.webUrl;
          let lineItems = getCheckoutData.node.lineItems;
          store().dispatch({
            type: 'CHECKOUT-INIT',
            payload: {
              checkout: {
                lineItems,
                id: getCheckoutData.node.id,
                webUrl,
                totalTax: getCheckoutData.node.totalTax,
                subtotalPriceV2: getCheckoutData.node.subtotalPriceV2,
                totalPriceV2: getCheckoutData.node.totalPriceV2,
                currencyCode: getCheckoutData.node.currencyCode,
              },
            },
          });
        } catch (e) {
          callCreateCheckout();
        }
      } else if (getCheckoutData.node && getCheckoutData.node.completedAt) {
        callCreateCheckout();
      }
    }
  }, [getCheckoutData, getCheckoutError]);

  function callCreateCheckout() {
    let input = {};
    let currencyCode = 'USD';
    if (props.currency && props.currency.currencyCode) {
      currencyCode = props.currency.currencyCode;
    }
    input = {
      presentmentCurrencyCode: currencyCode,
    };
    createCheckoutMutation({
      variables: {
        input,
        currencyCode,
      },
    });
  }

  useEffect(() => {
    setTimeout(() => {
      if (!(navigator.userAgent.includes('googlebot') || navigator.userAgent.includes('google.com/bot.html'))) {
        const chosenCountry = localStorage.getItem('myChosenCountryUs');
        if (!chosenCountry) {
          const http = new XMLHttpRequest();
          const url = 'https://get.geojs.io/v1/ip/country.json';
          http.open('GET', url);
          http.send();
          http.onreadystatechange = (e) => {
            if (http.responseText) {
              const response = JSON.parse(http.responseText);
              let chosenCountryObject;

              if (response.country === 'KR' && location.pathname === '/us/') {
                window.location.href = 'https://www.google.co.kr/';
              }
              if (response.country === 'TR' && location.pathname === '/us/') {
                window.location.href = 'https://www.google.com/';
              }

              for (const singleCountryObject of approvedCountryList) {
                if (singleCountryObject.countryCode === `${response.country}`) {
                  chosenCountryObject = singleCountryObject;
                }
              }

              if (!chosenCountryObject) {
                chosenCountryObject = {
                  countryCode: 'US',
                  countryName: 'United States',
                  redirect: '/us/',
                };
              }

              let redirectApproved = localStorage.getItem('redirectApproved');
              if (redirectApproved) {
                redirectApproved = JSON.parse(redirectApproved);
              }
              if (!redirectApproved) {
                if (
                  chosenCountryObject.redirect &&
                  chosenCountryObject.redirect !== '/us/' &&
                  chosenCountryObject.redirect !== '/fr/'
                ) {
                  if (!location.href.includes('localhost')) {
                    if (location.pathname === '/us/') {
                      window.location.href = chosenCountryObject.redirect + window.location.search;
                      return null;
                    }
                  }
                }
              }

              let chosenCountry;
              if ((redirectApproved && typeof redirectApproved === 'object') || redirectApproved instanceof Object) {
                let approved = false;
                for (let singleCountry of approvedCountryList) {
                  if (singleCountry.countryCode === redirectApproved.country) {
                    approved = true;
                    break;
                  }
                }
                if (!approved) {
                  chosenCountry = 'ALL';
                } else {
                  chosenCountry = redirectApproved.country;
                }
              } else {
                chosenCountry = chosenCountryObject.countryCode;
              }

              let currencyObject = {};
              const tempCurrencyName = countryCurrencyMap.getCountry(chosenCountryObject.countryName);
              if (tempCurrencyName && tempCurrencyName.currency) {
                let triggered = false;
                for (const singleCurrency of approvedCurrencyList['us']) {
                  if (tempCurrencyName.currency === singleCurrency.currencyCode) {
                    triggered = true;
                    if (chosenCountry === 'MN') {
                      currencyObject.currencySymbol = '$';
                      currencyObject.currencyCode = 'USD';
                      currencyObject.chosenShippingCountry = chosenCountry;
                    } else {
                      currencyObject.currencySymbol = singleCurrency.currencySymbol;
                      currencyObject.currencyCode = singleCurrency.currencyCode;
                      currencyObject.chosenShippingCountry = chosenCountry;
                    }

                    break;
                  }
                }
                if (!triggered) {
                  currencyObject.currencySymbol = getSymbolFromCurrency('USD');
                  currencyObject.currencyCode = 'USD';
                  currencyObject.chosenShippingCountry = chosenCountry;
                }
              }
              if (!currencyObject.currencyCode) {
                currencyObject = {
                  currencySymbol: '$',
                  currencyCode: 'USD',
                  chosenShippingCountry: chosenCountry,
                };
              }
              if ((redirectApproved && typeof redirectApproved === 'object') || redirectApproved instanceof Object) {
                if (redirectApproved.currency) {
                  currencyObject.currencyCode = redirectApproved.currency;
                  currencyObject.currencySymbol = getSymbolFromCurrency(redirectApproved.currency);
                }
              }

              for (const singleCurrency of approvedCurrencyList['us']) {
                if (singleCurrency.currencyCode === currencyObject.currencyCode) {
                  currencyObject.currencySymbol = singleCurrency.currencySymbol;
                  break;
                }
              }

              store().dispatch({
                type: 'CURRENCY-INIT',
                payload: {
                  currency: {
                    currencyCode: currencyObject.currencyCode,
                    chosenShippingCountry: currencyObject.chosenShippingCountry,
                    currencySymbol: currencyObject.currencySymbol,
                  },
                },
              });

              localStorage.setItem(
                'myChosenCountryUs',
                JSON.stringify({
                  currencyCode: currencyObject.currencyCode,
                  chosenShippingCountry: currencyObject.chosenShippingCountry,
                  currencySymbol: currencyObject.currencySymbol,
                }),
              );
            }
          };
        } else {
          let parsedObject = JSON.parse(chosenCountry);

          let approved = false;
          for (let singleCountry of approvedCountryList) {
            if (singleCountry.countryCode === parsedObject.chosenShippingCountry) {
              approved = true;
              break;
            }
          }
          if (!approved) {
            parsedObject.chosenShippingCountry = 'ALL';
          }

          for (const singleCurrency of approvedCurrencyList['us']) {
            if (singleCurrency.currencyCode === parsedObject.currencyCode) {
              parsedObject.currencySymbol = singleCurrency.currencySymbol;
              break;
            }
          }

          store().dispatch({
            type: 'CURRENCY-INIT',
            payload: {
              currency: {
                currencyCode: parsedObject.currencyCode,
                chosenShippingCountry: parsedObject.chosenShippingCountry,
                currencySymbol: parsedObject.currencySymbol,
              },
            },
          });
        }
      }

      if (
        store().getState().customerAccessTokenObject.accessToken &&
        store().getState().customerAccessTokenObject.accessToken !== ''
      ) {
        if (new Date(store().getState().customerAccessTokenObject.expiresAt) < new Date()) {
          store().dispatch({
            type: 'CUSTOMERTOKEN-INIT',
            payload: {
              customerAccessTokenObject: {
                accessToken: '',
                expiresAt: '',
              },
            },
          });
          store().dispatch({
            type: 'UPDATE_CUSTOMER',
            payload: {
              customer: {
                id: '',
                displayName: '',
                defaultAddress: {
                  address1: '',
                  address2: '',
                },
              },
            },
          });
        }
      } else {
        store().dispatch({
          type: 'CUSTOMERTOKEN-INIT',
          payload: {
            customerAccessTokenObject: {
              accessToken: '',
              expiresAt: '',
            },
          },
        });
        store().dispatch({
          type: 'UPDATE_CUSTOMER',
          payload: {
            customer: {
              id: '',
              displayName: '',
              defaultAddress: {
                address1: '',
                address2: '',
              },
            },
          },
        });
        store().dispatch({
          type: 'GIFT_CHOICES_INIT',
        });
      }
      initCurrency()
        .then((returnedPrices) => {
          store().dispatch({
            type: 'CURRENY_CONVERTER_INIT',
            payload: {
              currencyTable: returnedPrices,
            },
          });
        })
        .catch((error) => {});
    }, 3000);

    store().dispatch({
      type: 'CHECKOUT_LINEITEMS_REPLACE_MUTATION_INIT',
      payload: {
        checkoutLineItemsReplaceMutation,
        checkoutLineItemsReplaceLoading,
      },
    });

    store().dispatch({
      type: 'CLIENT_INIT',
      payload: {
        client,
      },
    });

    if (!store().getState().checkout || !store().getState().checkout.id || store().getState().checkout.id === '') {
      callCreateCheckout();
    }
  }, []);

  useEffect(() => {
    if (props.justAdded) {
      setTimeout(() => {
        store().dispatch({
          type: 'DISABLE_JUSTADDED',
        });
      }, 3000);
    }
  }, [props.justAdded]);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.text = `
  //     var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@1.3.1";

  //     !function(e,a,t,n,s,i,c){e.AlgoliaAnalyticsObject=s,e[s]=e[s]||function(){
  //     (e[s].queue=e[s].queue||[]).push(arguments)},i=a.createElement(t),c=a.getElementsByTagName(t)[0],
  //     i.async=1,i.src=n,c.parentNode.insertBefore(i,c)
  //     }(window,document,"script",ALGOLIA_INSIGHTS_SRC,"aa");

  //     // Initialize library
  //     aa('init', {
  //       appId: 'TICBT2ZIIK',
  //       apiKey: '09f8bd78c2ed40dcbbd19faba0051925'
  //     });
  //   `;
  //   document.head.appendChild(script);

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

  // useEffect(() => {
  //   getUserToken()
  //     .then((userToken) => {
  //       store().dispatch({
  //         type: 'ALGOLIA_USER_TOKEN',
  //         payload: {
  //           algoliaUserToken: userToken,
  //         },
  //       });
  //     })
  //     .catch((error) => {});
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const script = document.createElement('script');

  //     script.src = 'https://widget.reviews.io/combined/dist.js?RUKcarousel';
  //     script.async = true;

  //     document.body.appendChild(script);
  //   }, 3000);

  //   // return () => {
  //   // 	document.body.removeChild(script);
  //   // };
  // }, []);

  useEffect(() => {
    if (getCustomerError) {
      console.log(getCustomerError);
      return;
    }

    if (getCustomerData && getCustomerData.customer) {
      let tempArray = [];
      const clonedCustomer = JSON.parse(JSON.stringify(getCustomerData.customer));
      for (const singleEdge of clonedCustomer.addresses.edges) {
        tempArray.push(singleEdge.node);
        //
      }
      clonedCustomer.addresses = tempArray;
      tempArray = [];
      for (const singleEdge of clonedCustomer.orders.edges) {
        tempArray.push(singleEdge.node);
        //
      }
      clonedCustomer.orders = tempArray;
      store().dispatch({
        type: 'UPDATE_CUSTOMER',
        payload: {
          customer: clonedCustomer,
        },
      });
    }
  }, [getCustomerData, getCustomerError]);

  useEffect(() => {
    if (createCheckoutMutationError) {
      console.log('error', createCheckoutMutationError);
    } else if (createCheckoutMutationData) {
      const checkoutData = createCheckoutMutationData.checkoutCreate.checkout;

      let { webUrl } = checkoutData;
      const { lineItems } = checkoutData;
      store().dispatch({
        type: 'CHECKOUT-INIT',
        payload: {
          checkout: {
            lineItems,
            id: checkoutData.id,
            webUrl,
            totalTax: checkoutData.totalTax,
            subtotalPriceV2: checkoutData.subtotalPriceV2,
            totalPriceV2: checkoutData.totalPriceV2,
            currencyCode: checkoutData.currencyCode,
          },
        },
      });
    }
  }, [createCheckoutMutationData, createCheckoutMutationError]);

  useEffect(() => {
    if (props.signedIn && props.customer) {
      getWishlist(props.customer.id)
        .then((result) => {
          try {
            let wishlist = [];
            //customer has items in wishlist
            if (result && result !== '') {
              result = JSON.parse(result);
              if (result.products && Array.isArray(result.products)) {
                wishlist = result.products;
              }
            }

            if (props.myWishlist && Array.isArray(props.myWishlist) && props.myWishlist.length > 0) {
              wishlist = wishlist.concat(props.myWishlist);
              //get unique ids
              wishlist = Array.from(new Set(wishlist));
              setWishlist(wishlist);
            } else {
              store().dispatch({
                type: 'SET_WISHLIST',
                payload: {
                  wishlist,
                },
              });
            }
          } catch (e) {
            console.log('Error trying to receive wishlist', e);
          }
        })
        .catch((e) => {
          console.log('Error trying to receive wishlist', e);
        });
    }
  }, [props.signedIn]);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   const secondScript = document.createElement('script');
  //   secondScript.async = true;
  //   secondScript.src = 'https://www.googletagmanager.com/gtag/js?id=UA-145438628-1';
  //   script.text = `
  //     window.dataLayer = window.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments);}
  //     gtag('js', new Date());

  //     gtag('config', 'UA-145438628-1');
  //   `;
  //   document.head.appendChild(script);
  //   document.head.appendChild(secondScript);

  //   return () => {
  //     document.head.removeChild(script);
  //     document.head.removeChild(secondScript);
  //   };
  // }, []);

  useEffect(() => {
    if (updateCheckoutCurrencyMutationError) {
      console.log(updateCheckoutCurrencyMutationError);
    } else if (updateCheckoutCurrencyMutationData) {
      const checkoutData = updateCheckoutCurrencyMutationData.checkoutCreate.checkout;

      if (checkoutData) {
        let { webUrl } = checkoutData;
        const { lineItems } = checkoutData;
        store().dispatch({
          type: 'CHECKOUT-INIT',
          payload: {
            checkout: {
              lineItems,
              id: checkoutData.id,
              webUrl,
              totalTax: checkoutData.totalTax,
              subtotalPriceV2: checkoutData.subtotalPriceV2,
              totalPriceV2: checkoutData.totalPriceV2,
              currencyCode: checkoutData.currencyCode,
            },
          },
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 0);
      }
    }
  }, [updateCheckoutCurrencyMutationData, updateCheckoutCurrencyMutationError]);

  const pathname =
    typeof window !== 'undefined' && window.location && window.location.pathname
      ? window.location.pathname.replace('us/', '')
      : '';

  return (
    <div>
      <Header
        key={0}
        location={props.location}
        checkoutLineItemsReplaceMutation={checkoutLineItemsReplaceMutation}
        checkoutLineItemsReplaceLoading={checkoutLineItemsReplaceLoading}
        createCheckoutMutation={createCheckoutMutation}
        updateCheckoutCurrencyMutation={updateCheckoutCurrencyMutation}
        getCheckoutQuery={getCheckoutQuery}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <div key={1}>
        {React.Children.map(props.children, (child) => {
          if (child) {
            return React.cloneElement(child, {
              checkoutLineItemsReplaceMutation,
              checkoutLineItemsReplaceLoading,
              searchInput,
            });
          }
        })}
      </div>
      <Footer key={2} location={props.location} updateCheckoutCurrencyMutation={updateCheckoutCurrencyMutation} />

      <Helmet key={3}>
        <html lang="en" />
        <link rel="canonical" href={'https://www.gobicashmere.com/us' + pathname} />
        <link rel="alternate" hrefLang="en" href={'https://www.gobicashmere.com' + pathname} />
        <link rel="alternate" hrefLang="en-US" href={'https://www.gobicashmere.com/us' + pathname} />
        <link rel="alternate" hrefLang="de-DE" href={'https://www.gobicashmere.com/de' + pathname} />
        <link rel="alternate" hrefLang="en-GB" href={'https://www.gobicashmere.com/uk' + pathname} />
        <link rel="alternate" hrefLang="ru-RU" href={'https://www.gobicashmere.com/ru' + pathname} />
        <link rel="alternate" hrefLang="pl-PL" href={'https://www.gobicashmere.com/pl' + pathname} />
        <link rel="alternate" hrefLang="fr-FR" href={'https://www.gobicashmere.com/fr' + pathname} />
        <title> GOBI Cashmere | Sharing Comfort & Joy </title>
        <script className="structured-data-list" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'https://gobicashmere.org/',
            logo: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/GOBI_LOGO_FAV_ICON_32x32.jpg?v=1568649183',
          })}
        </script>

        <meta
          name="description"
          content="Designed with everyone in mind, GOBI creates cashmere for everyday wear. 100% Mongolian cashmere that's affordable, sustainable & stylish for all."
        />
        <meta property="og:site_name" content="Gobi Cashmere Europe GmbH" />

        <meta
          property="og:description"
          content="Designed with everyone in mind, GOBI creates cashmere for everyday wear. 100% Mongolian cashmere that's affordable, sustainable & stylish for all."
        />
        <meta property="twitter:site" content="@gobicashmere?lang=en" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content="Designed with everyone in mind, GOBI creates cashmere for everyday wear. 100% Mongolian cashmere that's affordable, sustainable & stylish for all."
        />
        <meta name="p:domain_verify" content="3b5e367f6ac572da98875b480fcd9369" />
      </Helmet>
      <div
        className={
          props.location && props.location.pathname && props.location.pathname.includes('/products/')
            ? 'custom_cookie product'
            : 'custom_cookie other'
        }
        key={4}
      >
        <CookieBanner
          message="This website uses cookies to improve your experience."
          onAccept={() => {}}
          policyLink="https://www.gobicashmere.com/pages/privacy-policy"
          onAcceptPreferences={() => {}}
          onAcceptStatistics={() => {}}
          onAcceptMarketing={() => {}}
          styles={{
            selectPane: { display: 'none' },
          }}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Layout);
