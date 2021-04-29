import React, { useEffect, useState } from 'react';
import { Swiper, Slide } from 'react-dynamic-swiper';
import { getColorAndSize, getPrice } from './BundleHelpers';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import ModifySize from './ModifySize';
import capitalize from 'capitalize';
import { getProductGender } from '../../ProductPage/ProductHelpers';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
function BundleProduct({ product, index, addToSet, removeFromSet, selectedProduct, ...props }) {
  const [selectedVariant, setSelectedVariant] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [gender, setGender] = useState();
  const [fitPdpObject, setFitPdpObject] = useState();
  let [priceBeforeDecimal, priceAfterDecimal] = getPrice(product);

  const fitAnalyticData = useState({
    mainThumbnail: '',
    userId: '',
    currentProductId: '',
    allProductIds: '',
    sizes: [],
  });

  useEffect(() => {
    if (product) {
      if (product.variants && product.variants.edges && product.variants.edges[0] && product.variants.edges[0].node) {
        setSelectedVariant(product.variants.edges[0].node);
        let [newColor, newSize] = getColorAndSize(product);
        setColor(newColor);
        setSize(newSize);
      }
      if (product.tags) {
        product.tags.map((tag) => {
          tag = getProductGender(tag);

          if (tag) {
            setGender(tag);
          }
        });
      }
    }
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
    if (product && product.id && product.variants && product.variants.edges) {
      let rawSizeAvailability = {};
      let rawSizeAll = [];

      for (let variant of product.variants.edges) {
        if (variant && variant.node && variant.node.selectedOptions) {
          for (let selectedOption of variant.node.selectedOptions) {
            if (selectedOption.name === 'Size') {
              rawSizeAll.push(selectedOption.value);
              if (variant.node.availableForSale) {
                rawSizeAvailability[selectedOption.value] = true;
              } else {
                rawSizeAvailability[selectedOption.value] = false;
              }
            }
          }
        }
      }

      setFitPdpObject({
        shopLanguage: 'en',
        shopCountry: 'NO',
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
  }, [product]);

  const sizeSelectOption = (variant, selectedSize, bundleIndex) => {
    setSelectedVariant(variant);
    setSize(selectedSize);
    removeFromSet(bundleIndex);
  };

  return (
    <div className="product-sec">
      <Helmet key={0}>
        {fitAnalyticData.currentProductId && (
          <script>
            {`let fitAnalyticsData = {
                shopLanguage: 'en', 
                shopCountry: 'EU', 
                mainThumbnail: '` +
              fitAnalyticData.mainThumbnail +
              `',
                userId: '` +
              fitAnalyticData.userId +
              `', 
                currentProductId: '` +
              fitAnalyticData.currentProductId +
              `', 
                allProductIds: ` +
              fitAnalyticData.allProductIds +
              `, 
                sizes: ` +
              fitAnalyticData.sizes +
              `,
              };`}
          </script>
        )}
      </Helmet>
      <div className="product-row">
        <div className="tc-col-8">
          <div className="left-widget">
            <div className="sec-title">
              <h1>{index + 1}</h1>
            </div>
            <div className="p-cat">
              <h1>{index + 1}. Select your size</h1>
            </div>
            <div className="p-swiper">
              <Swiper
                swiperOptions={{
                  slidesPerView: 3,
                  spaceBetween: 4,
                  breakpoints: {
                    1023: {
                      slidesPerView: 3,
                      spaceBetween: 4,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 4,
                    },
                    540: {
                      slidesPerView: 'auto',
                      spaceBetween: 4,
                    },
                  },
                  540: {
                    slidesPerView: 1,
                    spaceBetween: 4,
                  },
                }}
                loop={true}
                navigation={true}
                pagination={false}
                prevButton={<div className="swiper-button-prev-recently"></div>}
                nextButton={<div className="swiper-button-next-recently"></div>}
              >
                {product.images &&
                  product.images.edges &&
                  product.images.edges.map((image, i) => {
                    if (image && image.node) {
                      return (
                        <Slide key={i}>
                          <div>
                            <img
                              src={image.node.originalSrc}
                              data-src={image.node.originalSrc.replace('.jpg', '_800x.jpg')}
                              data-sizes="auto"
                              className="lazyload blur-up"
                              alt={image.node.altText}
                            />
                          </div>
                        </Slide>
                      );
                    } else return null;
                  })}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="tc-col-4">
          <div className="right-widget">
            {/* <div className="p-breadcrumb">Men / Hat</div> */}
            <div className="p-cat">
              <h1>{index + 1}. Select your size</h1>
            </div>
            <div className="p-title">
              <p>{capitalize.words(product.title)}</p>
            </div>
            {color ? (
              <div className="p-color">
                <div className="p-color-title">
                  <p>
                    Color:<span>{color}</span>
                  </p>
                </div>
                <div className="color-list">
                  <div className="color-box active">
                    <div
                      className="single-color"
                      style={{
                        backgroundImage: `url(https://cdn.shopify.com/s/files/1/1953/2845/t/95/assets/${color.replace(
                          ' ',
                          '-',
                        )}_15x.png?v=)`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="p-size">
              {/* <div className="p-size-title">
                <p>
                  Size: <span>{size}</span>
                </p>
              </div> */}
              <ModifySize
                product={product}
                size={size}
                gender={gender}
                sizeSelectOption={sizeSelectOption}
                bundleIndex={index}
              />
            </div>
            <div className="tc_product_size"></div>
            <div style={{ display: 'none' }} id="fitAnalyticsData">
              {fitPdpObject && JSON.stringify(fitPdpObject)}
            </div>
            <div className="p-btn">
              {/* <div className="p-btn-item">
                <p>Only 2 Items in Stock</p>
              </div> */}
              {selectedProduct ? (
                <button aria-label="Remove from set" className="removeFromSetBtn" onClick={() => removeFromSet(index)}>
                  <p>Remove From Set</p>
                </button>
              ) : (
                <button
                  aria-label="Add to bag"
                  className="addToSetBtn"
                  onClick={() => addToSet(index, { variant: selectedVariant, product })}
                >
                  <p>Add to Set</p> |{' '}
                  <div className="btn-price">
                    <p>
                      {props.currency && props.currency.currencySymbol} {priceBeforeDecimal}
                      <span>.{priceAfterDecimal}</span>
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="sec-line"></div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currency: state.currency,
});

export default connect(mapStateToProps)(BundleProduct);
