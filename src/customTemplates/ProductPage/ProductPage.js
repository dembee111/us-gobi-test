import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import './ProductPage.scss';
import { useLazyQuery } from '@apollo/client';
import { Controller, Scene } from 'react-scrollmagic';
import ProductForm from './ProductForm/ProductForm';
import ProductImages from './ProductImages/ProductImages';
import ProductRecommendation from './ProductRecommendation/ProductRecommendation';
import ProductRecent from './ProductRecent/ProductRecent';

import { getProductByHandle, getProductRecommendations, getProductsRecent } from '../../components/shared/query/query';
import {
  primeColorOrder,
  processSpecialColorName,
  initMetaTags,
  structuredDataSingle,
  getLocalRecentProduct,
} from './ProductHelpers';
import { giftProductIds } from '../../components/shared/data/giftProductIds';
import Layout from '../../components/layout';
import { allPagesEvent, productDetailViewEvent } from '../../components/shared/dataLayer/index';
import ProductReview from './ProductReview/ProductReview';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';
import ProductWearWith from './ProductWearWith/ProductWearWith';
import { idendtityTitle, idendtityData } from './ProductIdendtityData';

function handleProductData(product) {
  let firstAvailableSizeFound = false;
  product.sizeValues = [];
  product.variants.edges.map((variant, index) => {
    variant.node.selectedOptions.map((selectedOption) => {
      if (selectedOption.name === 'Size' || selectedOption.name === 'Denominations') {
        let chosen = false;
        if (!firstAvailableSizeFound && variant.node.availableForSale) {
          if (product.variants.edges.length === 1) {
            chosen = true;
          }
          firstAvailableSizeFound = true;
          product.chosenSizeAvailability = variant.node.availableForSale;
        }
        product.sizeValues.push({
          chosen,
          value: selectedOption.value,
          availableForSale: variant.node.availableForSale,
          quantityAvailable: variant.node.quantityAvailable,
        });
      } else if (index === 0 && selectedOption.name === 'Color') {
        product.chosenColorValue = selectedOption.value;
      }
      return null;
    });
    return null;
  });

  let chosenColorValueProcessed;

  if (product.chosenColorValue) {
    chosenColorValueProcessed = processSpecialColorName(product.chosenColorValue);
  } else {
    chosenColorValueProcessed = '';
  }
  product.colorValues = [];
  let selfPicked = false;
  for (const singleColorOrder of primeColorOrder) {
    if (chosenColorValueProcessed === singleColorOrder) {
      selfPicked = true;
      product.colorValues.push({
        name: chosenColorValueProcessed,
        handle: `/products/${product.handle}`,
        chosen: true,
      });
    }

    for (const singleTag of product.tags) {
      if (singleTag.includes('handle_')) {
        let colorName = singleTag.replace('handle_', '');
        colorName = colorName.slice(0, colorName.indexOf('+'));
        const handleValue = singleTag.replace(`handle_${colorName}+`, '');

        if (singleColorOrder === colorName) {
          product.colorValues.push({
            name: colorName,
            handle: `/products/${handleValue}`,
            chosen: false,
          });
        }
      }
    }
  }

  for (const singleTag of product.tags) {
    let mark = true;
    if (singleTag.includes('handle_')) {
      let colorName = singleTag.replace('handle_', '');
      colorName = colorName.slice(0, colorName.indexOf('+'));
      const handleValue = singleTag.replace(`handle_${colorName}+`, '');
      for (const singleColorOrder of primeColorOrder) {
        if (singleColorOrder === colorName) {
          mark = false;
          break;
        }
      }
      if (mark) {
        product.colorValues.push({
          name: colorName,
          handle: `/products/${handleValue}`,
          chosen: false,
        });
      }
    }
  }

  if (!selfPicked) {
    product.colorValues.push({
      name: chosenColorValueProcessed,
      handle: `/products/${product.handle}`,
      chosen: true,
    });
  }

  return product;
}
function ProductPage(props) {
  // reference to products main image grid element
  const imageGridElement = useRef(null);

  // reference to products outer form element
  const formGridElement = useRef(null);

  const recommendationGrid = useRef();

  const [recommendationImageWidth, setRecommendationImageWidth] = useState();

  const [giftCard, setGiftCard] = useState(false);

  // products data
  const [baseProductData, setBaseProductData] = useState({
    images: {
      edges: [],
    },
  });

  const [metaTags, setMetaTags] = useState({
    title: '',
    description: '',
    priceAmount: '',
    currency: props.currency.currencyCode,
    image1: '',
    image2: '',
    image3: '',
    secureImage1: '',
    secureImage2: '',
    secureImage3: '',
    color: '',
  });

  // product recommendation data
  const [productRecomendationData, setProductRecomendationData] = useState([]);

  const [imageWidth, setImageWidth] = useState();

  // fixed form's width
  const [formWidth, setFormWidth] = useState();

  const [recentlyCurrencySymbol, setRecentlyCurrencySymbol] = useState('');

  const [hasExceededQuantity, setHasExceededQuantity] = useState(false);

  // product recommendation query
  const [getProductRecommendationsQuery, { data: getProductRecommendationsData }] = useLazyQuery(
    getProductRecommendations,
  );

  // get product from handle query
  const [getProductByHandleQuery, { data: getProductByHandleData, error: getProductByHandleError }] = useLazyQuery(
    getProductByHandle,
  );

  const [handleState, setHandleState] = useState(null);
  const [fitPdpObject, setFitPdpObject] = useState();

  // RECENT VIEW
  const recentlyGrid = useRef();
  const [recentImageWidth, setRecentImageWidth] = useState();
  const [recentlyItemList, setRecentlyItemList] = useState([]);

  const [getProductRecentsQuery, { data: getProductRecentsData, error: getProductRecentsError }] = useLazyQuery(
    getProductsRecent,
  );

  useEffect(() => {
    if (getProductRecommendationsData) {
      const sendingData = [];
      for (const singleData of getProductRecommendationsData.productRecommendations) {
        let marked = false;
        for (const singleGiftProductId of giftProductIds) {
          if (atob(singleData.id).replace('gid://shopify/Product/', '') === singleGiftProductId) {
            marked = true;
            break;
          }
        }
        if (!marked) {
          sendingData.push(singleData);
          if (sendingData.length === 10) {
            break;
          }
        }
      }

      setProductRecomendationData(sendingData);
    }
  }, [getProductRecommendationsData]);

  useEffect(() => {
    if (getProductRecentsData) {
      let products = [];
      for (const node of getProductRecentsData.nodes) {
        if (node && node.id) {
          products.push(node);
        }
      }

      setRecentlyItemList(products);
    }
  }, [getProductRecentsData]);

  useEffect(() => {
    allPagesEvent();
  }, [typeof window !== `undefined` && window && window.dataLayer]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//integrations.fitanalytics.com/shop/gobicashmere/pdp.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    let chosenHandle = '';
    if (props.pageContext && props.pageContext.handle && props.pageContext.handle !== '') {
      chosenHandle = props.pageContext.handle;
    } else {
      const storedUrl = window.location.pathname.replace('/us/', '/');
      chosenHandle = storedUrl.replace('/products/', '');
      while (chosenHandle.includes('/')) {
        chosenHandle = chosenHandle.replace('/', '');
      }
    }
    // if (props.pageContext.product) {
    //   let tempProduct = props.pageContext.product;
    //   tempProduct = handleProductData(tempProduct);
    //   let newMetaTags = {
    //     title: tempProduct.title,
    //     description: tempProduct.description,
    //     currency: props.currency.currencyCode,
    //     color: tempProduct.chosenColorValue,
    //   };

    //   //   image1: '',
    //   // image2: '',
    //   // image3: '',
    //   // secureImage1: '',
    //   // secureImage2: '',
    //   // secureImage3: '',
    //   if (tempProduct.images && tempProduct.images.edges) {
    //     if (tempProduct.images.edges[0]) {
    //       newMetaTags.image1 = tempProduct.images.edges[0].node.originalSrc;
    //       newMetaTags.secureImage1 = tempProduct.images.edges[0].node.originalSrc;
    //     }
    //     if (tempProduct.images.edges[1]) {
    //       newMetaTags.image2 = tempProduct.images.edges[1].node.originalSrc;
    //       newMetaTags.secureImage2 = tempProduct.images.edges[1].node.originalSrc;
    //     }
    //     if (tempProduct.images.edges[2]) {
    //       newMetaTags.image3 = tempProduct.images.edges[2].node.originalSrc;
    //       newMetaTags.secureImage3 = tempProduct.images.edges[2].node.originalSrc;
    //     }
    //   }
    //   // setMetaTags(newMetaTags);
    // }

    getProductByHandleQuery({
      variables: {
        handle: chosenHandle,
        currencyCode: props.currency.currencyCode,
      },
    });

    resizeUpdate();

    setFormWidth(formGridElement.current.offsetWidth);
    window.addEventListener('resize', resizeUpdate);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
      window.removeEventListener('resize', resizeUpdate);
    };
  }, [props.pageContext.handle]);

  useEffect(() => {
    if (getProductByHandleError) {
      console.log(getProductByHandleError);
    }
    if (getProductByHandleData) {
      if (!getProductByHandleData.productByHandle) {
        window.location.replace(`${window.location.origin}/404`);
        return null;
      }

      let product = JSON.parse(JSON.stringify(getProductByHandleData.productByHandle));

      if (!product || !product.id) {
        return;
      }

      if (
        product.images.edges[0] &&
        product.images.edges[1] &&
        product.images.edges[2] &&
        product.images.edges[0].node.originalSrc &&
        product.images.edges[1].node.originalSrc &&
        product.images.edges[2].node.originalSrc
      ) {
        initMetaTags(
          {
            priceAmount: product.priceRange.minVariantPrice.amount,
            currency: product.priceRange.minVariantPrice.currencyCode,
            image1: product.images.edges[0].node.originalSrc,
            image2: product.images.edges[1].node.originalSrc,
            image3: product.images.edges[2].node.originalSrc,
            secureImage1: product.images.edges[0].node.originalSrc,
            secureImage2: product.images.edges[1].node.originalSrc,
            secureImage3: product.images.edges[2].node.originalSrc,
            color: product.chosenColorValue,
          },
          product.id,
          'product',
        )
          .then((result) => {
            setMetaTags(result);
          })
          .catch((error) => {});
      } else if (product.images.edges[0] && product.images.edges[0].node.originalSrc) {
        initMetaTags(
          {
            priceAmount: product.priceRange.minVariantPrice.amount,
            currency: product.priceRange.minVariantPrice.currencyCode,
            image1: product.images.edges[0].node.originalSrc,
            image2: product.images.edges[0].node.originalSrc,
            image3: product.images.edges[0].node.originalSrc,
            secureImage1: product.images.edges[0].node.originalSrc,
            secureImage2: product.images.edges[0].node.originalSrc,
            secureImage3: product.images.edges[0].node.originalSrc,
            color: product.chosenColorValue,
          },
          product.id,
          'product',
        )
          .then((result) => {
            setMetaTags(result);
          })
          .catch((error) => {});
      }
      product = handleProductData(product);

      if (product && product.sizeValues) {
        let rawSizeAvailability = {};
        let rawSizeAll = [];

        product.sizeValues.map((val) => {
          rawSizeAll.push(val.value);

          if (val.availableForSale) {
            rawSizeAvailability[val.value] = true;
          } else {
            rawSizeAvailability[val.value] = false;
          }
        });

        setFitPdpObject({
          shopLanguage: 'en',
          shopCountry: 'US',
          currentProductId: product.id && atob(product.id).replace('gid://shopify/Product/', ''),
          size: {
            values: rawSizeAll,
            availability: rawSizeAvailability,
          },
          operation: {
            addToCart: `function (size) {
              var rawList = document.getElementById('product-sizelist');

              if (rawList) {
                var rawSizes = rawList.getElementsByTagName('li');

                if (rawSizes) {
                  for (var item of rawSizes) {
                    var notAvailable = false;
                    var selDiv = item.getElementsByTagName('div');
                    var sizeFound = false;

                    if (item.innerHTML.includes('class="notAvailable"')) {
                      notAvailable = true;
                    }

                    if (selDiv) {
                      for (var item of selDiv) {
                        var findSizeStr = 'data-size="' + size + '"'
                      };

                      if (item.innerHTML.includes(findSizeStr)) {
                        sizeFound = true;
                      }

                      if (!notAvailable) {
                        if (sizeFound) {
                          item.click();

                          setTimeout(function () {
                            document.getElementById('btn-add-cart').click();
                          }, 1300);

                          return;
                        }
                      }
                    }
                  }
                }
              }
            }`,
          },
        });
      }

      setBaseProductData(product);
      getProductRecommendationsQuery({
        variables: {
          productId: product.id,
          currencyCode: props.currency.currencyCode,
        },
      });

      product.tags &&
        product.tags.map((item) => {
          if (item.match(/^gift_card.*$/)) {
            setGiftCard(true);
          }
        });

      const productIds = getLocalRecentProduct(product.id).map((product) => btoa(`gid://shopify/Product/${product}`));

      getProductRecentsQuery({
        variables: {
          productIds,
          currencyCode: props.currency.currencyCode,
        },
      });

      let variant = product.variants.edges[0].node;
      if (variant && product) {
        let sendingProduct = {
          name: product.title && product.title,
          id: variant.sku || '',
          productId: product.id && atob(product.id).replace('gid://shopify/Product/', ''),
          variantId: (variant.id && atob(variant.id).replace('gid://shopify/ProductVariant/', '')) || '',
          price: variant.priceV2 && parseInt(variant.priceV2.amount),
          compareAtPrice: variant.compareAtPriceV2 && parseInt(variant.compareAtPriceV2.amount),
          category: (product.productType && product.productType.replace("'", '')) || '',
          inventoryCount: variant.quantityAvailable && variant.quantityAvailable,
        };
        productDetailViewEvent(sendingProduct);
      }

      let savedState = JSON.parse(localStorage.getItem('stateUS'));
      if (savedState && savedState.currency && savedState.currency.currencySymbol) {
        setRecentlyCurrencySymbol(JSON.parse(localStorage.getItem('stateUS')).currency.currencySymbol);
      }
    }
  }, [getProductByHandleData, getProductByHandleError]);

  function changeSize(sizeName) {
    setHasExceededQuantity(false);
    const clonedProductData = JSON.parse(JSON.stringify(baseProductData));
    let chosenSize = '';
    for (const singleSize of clonedProductData.sizeValues) {
      singleSize.chosen = false;
      if (singleSize.value === sizeName) {
        singleSize.chosen = true;
        chosenSize = singleSize;
        clonedProductData.chosenSizeAvailability = singleSize.availableForSale;
      }
    }

    setBaseProductData(clonedProductData);

    if (window.dataLayer) {
      let chosenVariant;
      for (let singleVairantEdge of clonedProductData.variants.edges) {
        if (singleVairantEdge.node.selectedOptions[0].value === chosenSize.value) {
          chosenVariant = singleVairantEdge.node;
          break;
        }
      }
      if (chosenVariant) {
        let sendingProduct = {
          name: clonedProductData.title && clonedProductData.title.replace("'", ''),
          id: (chosenVariant && chosenVariant.sku) || '',
          productId: clonedProductData.id && atob(clonedProductData.id).replace('gid://shopify/Product/', ''),
          variantId: (chosenVariant.id && atob(chosenVariant.id).replace('gid://shopify/ProductVariant/', '')) || '',
          price: chosenVariant.priceV2 && parseInt(chosenVariant.priceV2.amount),
          compareAtPrice: chosenVariant.compareAtPriceV2 && parseInt(chosenVariant.compareAtPriceV2.amount),
          variant: (chosenVariant && chosenVariant.title && chosenVariant.title.replace("'", '')) || '',
          category: clonedProductData.productType.replace("'", '') || '',
          inventoryCount: chosenVariant.quantityAvailable,
        };
        productDetailViewEvent(sendingProduct);
      }
    }
  }

  const handleScroll = (e) => {
    setHandleState(e);
  };

  function resizeUpdate() {
    if (window.innerWidth <= 992) {
      setImageWidth(imageGridElement.current.offsetWidth);
    } else {
      setImageWidth(imageGridElement.current.offsetWidth / 2);
    }
    if (window.innerWidth <= 768) {
      setRecommendationImageWidth(recommendationGrid.current.offsetWidth / 2 - 20);
    } else {
      setRecommendationImageWidth(recommendationGrid.current.offsetWidth / 4 - 20);
    }

    if (recentlyGrid && recentlyGrid.current) {
      if (window.innerWidth <= 768) {
        setRecentImageWidth(recentlyGrid.current.offsetWidth / 2 - 20);
      } else {
        setRecentImageWidth(recentlyGrid.current.offsetWidth / 4 - 20);
      }
    }

    setFormWidth(formGridElement.current.offsetWidth);
  }

  let wearWithAllowed = false;
  if (baseProductData && baseProductData.id) {
    for (let singleTag of baseProductData.tags) {
      if (singleTag.includes('wearWith_')) {
        wearWithAllowed = true;
        break;
      }
    }
  }

  return (
    <div className={giftCard ? 'tc_product-page gift_card' : 'tc_product-page'}>
      {metaTags.title !== '' && [
        <Helmet key={0}>
          <title>{metaTags.title}</title>
          <meta name="description" content={metaTags.description} />
          <meta property="og:title" content={metaTags.title} />
          <meta property="og:price:amount" content={metaTags.priceAmount} />
          <meta property="og:price:currency" content={metaTags.currency} />
          <meta property="og:description" content={metaTags.description} />
          <meta property="og:image" content={metaTags.image1.replace('https', 'http')} />
          <meta property="og:image" content={metaTags.image2.replace('https', 'http')} />
          <meta property="og:image" content={metaTags.image3.replace('https', 'http')} />
          <meta property="og:type" content="product" />
          <meta property="og:image:secure_url" content={metaTags.secureImage1} />
          <meta property="og:image:secure_url" content={metaTags.secureImage2} />
          <meta property="og:image:secure_url" content={metaTags.secureImage3} />
        </Helmet>,
        <Helmet key={1}>
          <script className="structured-data-list" type="application/ld+json">
            {structuredDataSingle(
              {
                title: metaTags.title,
                description: metaTags.description,
                currency: metaTags.currency,
                price: metaTags.priceAmount,
              },
              [
                {
                  url: metaTags.secureImage1,
                  name: metaTags.title,
                },
                {
                  url: metaTags.secureImage2,
                  name: metaTags.title,
                },
                {
                  url: metaTags.secureImage3,
                  name: metaTags.title,
                },
              ],
              true,
            )}
          </script>
        </Helmet>,
      ]}
      <div className="mainContentProductPage">
        <div className="productMainDiv" style={{ marginBottom: '40px', minHeight: '700px' }}>
          <div className="tc_col-8">
            <ProductImages
              imageWidth={imageWidth}
              baseProductData={baseProductData}
              imageGridElement={imageGridElement}
            />
          </div>
          <div className="tc_col-4" ref={formGridElement}>
            {imageGridElement.current && (
              <div className="stickyForm">
                <ProductForm
                  scrollState={handleState}
                  baseProductData={baseProductData}
                  formWidth={formWidth}
                  changeSize={changeSize}
                  hasExceededQuantity={hasExceededQuantity}
                  setHasExceededQuantity={setHasExceededQuantity}
                />
              </div>
            )}
          </div>
        </div>

        <div className="product-idendtity">
          <div className="bg_tt">
            <div className="tt">
              <h1>{idendtityTitle.title}</h1>
            </div>
          </div>
          <div className="icon_list">
            {idendtityData.map((item, key) => {
              return (
                <div className="icon_box" key={key}>
                  <div className="icon">
                    <div className="back" style={{ backgroundImage: `url(${item.icon})` }}></div>
                  </div>
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {wearWithAllowed && (
          <div className="product_recommendation">
            <div className="tc_row">
              <div className="bg_tt">
                <h1>Wear with</h1>
              </div>
              <div className="grid_product">
                <ProductWearWith baseProductData={baseProductData} currency={props.currency} />
              </div>
            </div>
          </div>
        )}
        <div className="product_recommendation">
          <div className="tc_row">
            <div className="bg_tt">
              <h1>Product Recommendation</h1>
            </div>
            <div className="grid_product">
              <ProductRecommendation
                recommendationGrid={recommendationGrid}
                productRecomendationData={productRecomendationData}
                recommendationImageWidth={recommendationImageWidth}
                currency={props.currency}
                currencyTable={props.currencyTable}
              />
            </div>
          </div>
        </div>

        <div className="product_recommendation" style={{ marginBottom: '64px' }}>
          <div className="tc_row">
            <div className="bg_tt">
              <h1>Recently Viewed</h1>
            </div>
            <div className="grid_product">
              {recentlyItemList ? (
                <ProductRecent
                  recentlyGrid={recentlyGrid}
                  recentlyItemList={recentlyItemList}
                  recommendationImageWidth={recentImageWidth}
                  currency={props.currency}
                  currencyTable={props.currencyTable}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <ProductReview tags={baseProductData.tags} title={baseProductData.title} />
        </div>
      </div>
      <div style={{ display: 'none' }} id="fitAnalyticsData">
        {fitPdpObject && JSON.stringify(fitPdpObject)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currency: state.currency,
  currencyTable: state.currencyTable,
});

const ProductPageConst = connect(mapStateToProps)(ProductPage);

function ProductPageOuterShell(props) {
  return (
    <Layout location={props.location}>
      <ProductPageConst pageContext={props.pageContext} />
    </Layout>
  );
}

export default ProductPageOuterShell;
