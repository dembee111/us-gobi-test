import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { getProductByHandle } from '../../../components/shared/query/query';
import { primeColorOrder, processSpecialColorName } from '../../ProductPage/ProductHelpers';
import { useLazyQuery } from '@apollo/client';
import ShippSize from './Shipp/shippSize/ShippSize';
import SizeChart from '../../ProductPage/ProductForm/SizeChartModal/SizeChart';
import { allPagesEvent, productDetailViewEvent } from '../../../components/shared/dataLayer/index';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';
import './RouletteMain.scss';
import { addToCart, giftsDefault } from '../../../components/shared/cart/CartHelpers';
import { productDataParser, productSizeParser, getProductGender } from '../../ProductPage/ProductHelpers';
import LazyHero from 'react-lazy-hero';
import { renderLazyImage } from '../../../components/shared/image';
export default function ProductData(props) {
  const [getProductByHandleQuery, { data: getProductByHandleData, error: getProductByHandleError }] = useLazyQuery(
    getProductByHandle,
  );
  const [baseProductData, setBaseProductData] = useState({
    images: {
      edges: [],
    },
  });
  const [colorHandle, setColor] = useState('');
  const [vatTextState, setVatTextState] = useState(false);
  const [manOrWoman, setManOrWoman] = useState();
  const [productCode, setProductCode] = useState('');

  const [hasExceededQuantity, setHasExceededQuantity] = useState(false);
  const [errorState, setErrorState] = useState({
    message: '',
    show: false,
  });
  const [variant, setVariant] = useState();

  useEffect(() => {
    // console.log(props.handle, '--');

    getProductByHandleQuery({
      variables: {
        // handle: '2-sided-scarf-wintermood',
        handle: props.handle,
        currencyCode: props.currency.currencyCode,
      },
    });
  }, [props.handle]);
  useEffect(() => {
    if (baseProductData && baseProductData.tags) {
      baseProductData.tags.map((tag) => {
        if (tag.includes('uniqueTag-')) {
          setProductCode(tag.split('-')[1]);
        }

        tag = getProductGender(tag);

        if (tag) {
          setManOrWoman(tag);
        }
      });
    }
    if (baseProductData && baseProductData.sizeValues && baseProductData.variants) {
      let chosenSizeValue = '';
      for (const sizeValue of baseProductData.sizeValues) {
        if (sizeValue.chosen) {
          chosenSizeValue = sizeValue.value;
        }
      }
      for (let singleVariant of baseProductData.variants.edges) {
        singleVariant = singleVariant.node;
        for (const singleSelectedOptions of singleVariant.selectedOptions) {
          if (singleSelectedOptions.name === 'Size') {
            if (singleSelectedOptions.value === chosenSizeValue) {
              setVariant(singleVariant);
            }
          }
        }
      }
    }
  }, [baseProductData]);

  useEffect(() => {
    if (getProductByHandleData) {
      if (!getProductByHandleData.productByHandle) {
        window.location.replace(`${window.location.origin}/404`);
        return null;
      }

      let product = JSON.parse(JSON.stringify(getProductByHandleData.productByHandle));
      product = handleProductData(product);
      setBaseProductData(product);
      if (
        product &&
        product.variants &&
        product.variants.edges &&
        product.variants.edges[0] &&
        product.variants.edges[0].node
      ) {
        setVariant(product.variants.edges[0].node);
      }
    }
  }, [getProductByHandleData, getProductByHandleError]);

  function handleProductData(product) {
    let firstAvailableSizeFound = false;
    product.sizeValues = [];
    product.variants.edges.map((variant, index) => {
      variant.node.selectedOptions.map((selectedOption) => {
        if (selectedOption.name === 'Size') {
          let chosen = false;
          if (!firstAvailableSizeFound && variant.node.availableForSale) {
            firstAvailableSizeFound = true;
            chosen = true;
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
          handle: `${product.handle}`,
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
              handle: `${handleValue}`,
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
            handle: `${handleValue}`,
            chosen: false,
          });
        }
      }
    }

    if (!selfPicked) {
      product.colorValues.push({
        name: chosenColorValueProcessed,
        handle: `${product.handle}`,
        chosen: true,
      });
    }

    return product;
  }

  let ProductPriceHelper = null;
  let ProductBtnHelper = null;
  if (baseProductData.id) {
    ProductPriceHelper = (
      <div className="tc_product_price">
        {baseProductData.variants.edges[0].node.presentmentPrices &&
          baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice && (
            <div className="gr_left">
              {baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount &&
              baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount &&
              parseInt(baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount) >
                parseInt(baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount) ? (
                <div className="productPrice">
                  <div className="pr_price">
                    <p className="current_price">
                      {'€'}
                      {parseInt(
                        baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount,
                        10,
                      )}
                    </p>
                    {vatTextState === true && <span> inkl. MwSt. exkl. Versand </span>}
                  </div>
                </div>
              ) : (
                <div className="productPrice current">
                  <p>
                    {'€'}
                    {parseInt(baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount, 10)}
                  </p>
                  {vatTextState === true && <span> inkl. MwSt. exkl. Versand</span>}
                </div>
              )}
            </div>
          )}
      </div>
    );
    // ProductBtnHelper = (
    //   <div className="tc_product_btns">

    //     <div className="addCart_btn">
    //       {props.baseProductData.chosenSizeAvailability ? (
    //         props.justAdded ? (
    //           <div>
    //             <button aria-label="Adding to bag" className="addToCartBtn" disabled={true}>
    //               Adding...
    //             </button>
    //           </div>
    //         ) : (
    //           <div>
    //             <button
    //               aria-label="Add to bag"
    //               onClick={() => {
    //                 if (!variant) {
    //                   setErrorState({
    //                     message: 'Please select a size.',
    //                     show: true,
    //                   });
    //                   cartref && cartref.current && cartref.current.scrollIntoView({ behavior: 'smooth' });
    //                 } else {
    //                   setErrorState({
    //                     message: '',
    //                     show: false,
    //                   });
    //                   convertCurrency().then((newGifts) => {
    //                     props.setHasExceededQuantity(
    //                       addToCart(
    //                         variant || props.baseProductData.variants.edges[0].node,
    //                         newGifts,
    //                         props.baseProductData,
    //                       ),
    //                     );
    //                   });
    //                 }
    //               }}
    //               className="addToCartBtn"
    //               disabled={props.hasExceededQuantity}
    //             >
    //               Add to cart
    //             </button>
    //           </div>
    //         )
    //       ) : (
    //         <div className="add_btn">
    //           <button
    //             aria-label="Notify When Available"
    //             onClick={() => openNotifyWhenAvailable()}
    //             className="addToCartBtn"
    //           >
    //             Notify When Available
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //     <div className="wish_btn">
    //       <button
    //         aria-label="WishList"
    //         className="wishListBtn"
    //         key={props.myWishlist}
    //         onClick={() => {
    //           toggleWishlist(
    //             decodeProductId(props.baseProductData.id),
    //             props.baseProductData.variants.edges[0].node.id,
    //           );
    //         }}
    //       >
    //         <div className="wish_btn-grid">
    //           {props.myWishlist &&
    //           Array.isArray(props.myWishlist) &&
    //           props.myWishlist.includes(decodeProductId(props.baseProductData.id)) ? (
    //             <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    //               <path
    //                 d="M9.75056 15.3707C9.35686 15.6959 8.77837 15.6959 8.38469 15.3707C5.89105 13.3107 0.461226 9.15133 1.13972 5.24056C1.6291 2.23326 3.55398 1.21957 4.92423 1.18578C7.08292 1.10497 8.433 2.34416 8.89184 2.85014C8.98311 2.95079 9.15213 2.95079 9.2434 2.85014C9.70224 2.34416 11.0523 1.10497 13.211 1.18578C14.5813 1.21957 16.5061 2.23326 17.0281 5.24056C17.6771 9.15134 12.2445 13.3108 9.75056 15.3707Z"
    //                 stroke="black"
    //                 fill="black"
    //                 strokeWidth="0.8"
    //                 strokeMiterlimit="10"
    //               />
    //             </svg>
    //           ) : (
    //             <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    //               <path
    //                 d="M9.75056 15.3707C9.35686 15.6959 8.77837 15.6959 8.38469 15.3707C5.89105 13.3107 0.461226 9.15133 1.13972 5.24056C1.6291 2.23326 3.55398 1.21957 4.92423 1.18578C7.08292 1.10497 8.433 2.34416 8.89184 2.85014C8.98311 2.95079 9.15213 2.95079 9.2434 2.85014C9.70224 2.34416 11.0523 1.10497 13.211 1.18578C14.5813 1.21957 16.5061 2.23326 17.0281 5.24056C17.6771 9.15134 12.2445 13.3108 9.75056 15.3707Z"
    //                 stroke="black"
    //                 strokeWidth="0.8"
    //                 strokeMiterlimit="10"
    //               />
    //             </svg>
    //           )}
    //           <span>Add to Wishlist</span>
    //         </div>
    //       </button>
    //     </div>
    //   </div>
    // );
  }

  function changeColor(handle) {
    if (handle) {
      setColor(handle);
      getProductByHandleQuery({
        variables: {
          handle: handle,
          currencyCode: 'EUR',
        },
      });

      let product = JSON.parse(JSON.stringify(getProductByHandleData.productByHandle));
      if (product) {
        let firstAvailableSizeFound = false;
        product.sizeValues = [];
        product.variants.edges.map((variant, index) => {
          variant.node.selectedOptions.map((selectedOption) => {
            if (selectedOption.name === 'Size') {
              let chosen = false;
              if (!firstAvailableSizeFound && variant.node.availableForSale) {
                firstAvailableSizeFound = true;
                chosen = true;
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
              handle: `${product.handle}`,
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
                  handle: `${handleValue}`,
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
                handle: `${handleValue}`,
                chosen: false,
              });
            }
          }
        }

        if (!selfPicked) {
          product.colorValues.push({
            name: chosenColorValueProcessed,
            handle: `${product.handle}`,
            chosen: true,
          });
        }

        return setBaseProductData(product);
      }
    }
  }

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
          setVariant(chosenVariant);
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

  const [selData, setSelData] = useState();

  const okClick = () => {
    if (props.data.id == 2) {
      props.onFinish(baseProductData, 4);
    } else {
      props.onFinish(baseProductData, 5);
    }
  };

  const backClick = () => {
    props.onFinish(false, 3);
  };

  return (
    <div className="white-popup bg2">
      <div className="grid-60">
        <div className="product-slide-box">
          <Swiper
            swiperOptions={{
              slidesPerView: 2,
              spaceBetween: 4,
              freeMode: true,
              breakpoints: {
                1023: {
                  slidesPerView: 2,
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
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            }}
            loop={false}
            navigation={false}
            pagination={false}
          >
            {baseProductData &&
              baseProductData.images.edges.map((item, index) => {
                return (
                  <Slide key={index}>
                    <div className="img-box">
                      <img
                        alt={item.altText}
                        srcSet={
                          `${item.node.originalSrc.replace('.jpg', '_260x.jpg')} 260w,` +
                          `${item.node.originalSrc.replace('.jpg', '_390x.jpg')} 390w,` +
                          `${item.node.originalSrc.replace('.jpg', '_468x.jpg')} 468w,` +
                          `${item.node.originalSrc.replace('.jpg', '_560x.jpg')} 560w,` +
                          `${item.node.originalSrc.replace('.jpg', '_640x.jpg')} 640w,` +
                          `${item.node.originalSrc.replace('.jpg', '_750x.jpg')} 750w,` +
                          `${item.node.originalSrc.replace('.jpg', '_828x.jpg')} 828w,` +
                          `${item.node.originalSrc.replace('.jpg', '_1080x.jpg')} 1080w,` +
                          `${item.node.originalSrc.replace('.jpg', '_1280x.jpg')} 1280w,`
                        }
                      />
                    </div>
                  </Slide>
                );
              })}
          </Swiper>
          <div
            className={
              baseProductData && baseProductData.images.edges.length > 4
                ? 'swiper-button-prev'
                : 'swiper-button-prev hidden'
            }
          ></div>
          <div
            className={
              baseProductData && baseProductData.images.edges.length > 4
                ? 'swiper-button-next'
                : 'swiper-button-next hidden'
            }
          ></div>
        </div>
        <div className="product-detail-box">
          <div className="detail-item">
            {baseProductData.id && baseProductData.variants && (
              <>
                <div className="product-title-box">
                  <h1>{baseProductData.title}</h1>
                </div>
                <div className="product-price-box">
                  <div className="price-sec">
                    <p>
                      {ProductPriceHelper}
                      {/* <span>.00</span> */}
                    </p>
                  </div>
                  <div className="price-desc">
                    <p>incl. Vat excl. Shipping</p>
                  </div>
                </div>
                <div className="product-size-box">
                  <div className="">
                    <div className="size-title">
                      <div className="size">
                        <p>Select Size</p>
                      </div>
                      <div className="size-chart">
                        <SizeChart productCode={productCode} manOrWoman={manOrWoman} />
                      </div>
                    </div>
                    <div className={!errorState.show ? 'size-section' : 'size-section errorSize'}>
                      <ul className="sizeLists">
                        {baseProductData.sizeValues // @ts-ignore
                          .map((item, index) => (
                            <li key={index} className={`${item.value.length > 4 ? 'lengthHigh' : ''}`}>
                              {item.chosen ? (
                                <div className={`sizeBox ${item.availableForSale ? '' : 'notAvailable'}`}>
                                  <span data-size={item.value}>{productSizeParser(item.value, item.gender)}</span>
                                </div>
                              ) : (
                                <div
                                  onClick={() => {
                                    setErrorState({
                                      message: '',
                                      show: false,
                                    });
                                    changeSize(item.value);
                                  }}
                                  className={item.availableForSale ? '' : 'notAvailable'}
                                >
                                  <span data-size={item.value}>{productSizeParser(item.value, item.gender)}</span>
                                </div>
                              )}
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div style={{ display: errorState.show ? 'block' : 'none' }} className="sizeErrorMessage">
                      {errorState.message}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="product-btn-box">
            <button
              aria-label={'Add to Cart'}
              disabled={props.hasExceededQuantity}
              onClick={() => {
                addToCart(variant, giftsDefault, baseProductData);
                okClick();
              }}
            >
              {'Add to Cart'}
            </button>
            {props.data.id == 8 && (
              <>
                <div
                  className="back-btn"
                  onClick={() => {
                    backClick();
                  }}
                >
                  Back
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
