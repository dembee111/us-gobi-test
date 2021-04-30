// import React, { useState, useEffect } from 'react';
// import { Link } from 'gatsby';
// import { giftBox } from './data';
// import { getProductByHandle, getProductRecommendations } from '../../../../../components/shared/query/query';
// import { primeColorOrder, processSpecialColorName, initMetaTags } from '../../../../ProductPage/ProductHelpers';
// import { useLazyQuery } from '@apollo/client';
// import ShippSize from './shippSize/ShippSize';
// import { allPagesEvent, productDetailViewEvent } from '../../../../../components/shared/dataLayer/index';
// import { Swiper, Slide } from 'react-dynamic-swiper';
// import 'react-dynamic-swiper/lib/styles.css';
// import './shipp-slider.scss';
// import { addToCart } from '../../../../../components/shared/cart/CartHelpers';

// export default function ShippSlider(props) {
//   const [getProductByHandleQuery, { data: getProductByHandleData, error: getProductByHandleError }] = useLazyQuery(
//     getProductByHandle,
//   );
//   const [baseProductData, setBaseProductData] = useState({
//     images: {
//       edges: [],
//     },
//   });
//   const [vatTextState, setVatTextState] = useState(false);
//   const [manOrWoman, setManOrWoman] = useState();
//   const [productCode, setProductCode] = useState('');
//   const [hasExceededQuantity, setHasExceededQuantity] = useState(false);

//   useEffect(() => {
//     let chosenHandle = '';
//     if (props.handle === '') {
//       const storedUrl = window.location.pathname.replace('/de/', '/');
//       chosenHandle = storedUrl.replace('/products/', '');
//       while (chosenHandle.includes('/')) {
//         chosenHandle = chosenHandle.replace('/', '');
//       }
//     } else {
//       chosenHandle = props.handle;
//     }
//     getProductByHandleQuery({
//       variables: {
//         handle: chosenHandle,
//         currencyCode: 'EUR',
//       },
//     });
//   }, [props.handle]);

//   useEffect(() => {
//     if (getProductByHandleError) {
//     }
//     if (getProductByHandleData) {
//       if (!getProductByHandleData.productByHandle) {
//         window.location.replace(`${window.location.origin}/404`);
//         return null;
//       }

//       let product = JSON.parse(JSON.stringify(getProductByHandleData.productByHandle));
//       product = handleProductData(product);
//       setBaseProductData(product);
//     }
//   }, [getProductByHandleData, getProductByHandleError]);

//   function handleProductData(product) {
//     let firstAvailableSizeFound = false;
//     product.sizeValues = [];
//     product.variants.edges.map((variant, index) => {
//       variant.node.selectedOptions.map((selectedOption) => {
//         if (selectedOption.name === 'Size') {
//           let chosen = false;
//           if (!firstAvailableSizeFound && variant.node.availableForSale) {
//             firstAvailableSizeFound = true;
//             chosen = true;
//             product.chosenSizeAvailability = variant.node.availableForSale;
//           }
//           product.sizeValues.push({
//             chosen,
//             value: selectedOption.value,
//             availableForSale: variant.node.availableForSale,
//             quantityAvailable: variant.node.quantityAvailable,
//           });
//         } else if (index === 0 && selectedOption.name === 'Color') {
//           product.chosenColorValue = selectedOption.value;
//         }
//         return null;
//       });
//       return null;
//     });

//     let chosenColorValueProcessed;

//     if (product.chosenColorValue) {
//       chosenColorValueProcessed = processSpecialColorName(product.chosenColorValue);
//     } else {
//       chosenColorValueProcessed = '';
//     }
//     product.colorValues = [];
//     let selfPicked = false;
//     for (const singleColorOrder of primeColorOrder) {
//       if (chosenColorValueProcessed === singleColorOrder) {
//         selfPicked = true;
//         product.colorValues.push({
//           name: chosenColorValueProcessed,
//           handle: `${product.handle}`,
//           chosen: true,
//         });
//       }

//       for (const singleTag of product.tags) {
//         if (singleTag.includes('handle_')) {
//           let colorName = singleTag.replace('handle_', '');
//           colorName = colorName.slice(0, colorName.indexOf('+'));
//           const handleValue = singleTag.replace(`handle_${colorName}+`, '');

//           if (singleColorOrder === colorName) {
//             product.colorValues.push({
//               name: colorName,
//               handle: `${handleValue}`,
//               chosen: false,
//             });
//           }
//         }
//       }
//     }

//     for (const singleTag of product.tags) {
//       let mark = true;
//       if (singleTag.includes('handle_')) {
//         let colorName = singleTag.replace('handle_', '');
//         colorName = colorName.slice(0, colorName.indexOf('+'));
//         const handleValue = singleTag.replace(`handle_${colorName}+`, '');
//         for (const singleColorOrder of primeColorOrder) {
//           if (singleColorOrder === colorName) {
//             mark = false;
//             break;
//           }
//         }
//         if (mark) {
//           product.colorValues.push({
//             name: colorName,
//             handle: `${handleValue}`,
//             chosen: false,
//           });
//         }
//       }
//     }

//     if (!selfPicked) {
//       product.colorValues.push({
//         name: chosenColorValueProcessed,
//         handle: `${product.handle}`,
//         chosen: true,
//       });
//     }

//     return product;
//   }

//   let ProductPriceHelper = null;
//   if (baseProductData.id) {
//     ProductPriceHelper = (
//       <div className="tc_product_price">
//         {baseProductData.variants.edges[0].node.presentmentPrices &&
//           baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice && (
//             <div className="gr_left">
//               {baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount &&
//               baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount &&
//               parseInt(baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount) >
//                 parseInt(baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount) ? (
//                 <div className="productPrice">
//                   <div className="pr_price">
//                     <p className="current_price">
//                       {'€'}
//                       {parseInt(
//                         baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount,
//                         10,
//                       )}
//                     </p>
//                     <p className="sale_price">
//                       {'€'}
//                       {parseInt(
//                         baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount,
//                         10,
//                       )}
//                     </p>
//                     {vatTextState === true && <span> inkl. MwSt. exkl. Versand </span>}
//                   </div>
//                   <div className="salePercentage">
//                     <p>
//                       Sie sparen {'€'}
//                       {parseInt(
//                         baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount,
//                         10,
//                       ) -
//                         parseInt(
//                           baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount,
//                           10,
//                         )}{' '}
//                       (
//                       {100 -
//                         parseInt(
//                           (parseInt(
//                             baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount,
//                             10,
//                           ) *
//                             100) /
//                             parseInt(
//                               baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice
//                                 .amount,
//                               10,
//                             ),
//                         )}
//                       %)
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="productPrice current">
//                   <p>
//                     {'€'}
//                     {parseInt(baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount, 10)}
//                   </p>
//                   {vatTextState === true && <span> inkl. MwSt. exkl. Versand</span>}
//                 </div>
//               )}
//             </div>
//           )}
//       </div>
//     );
//   }

//   function changeSize(sizeName) {
//     setHasExceededQuantity(false);
//     const clonedProductData = JSON.parse(JSON.stringify(baseProductData));
//     let chosenSize = '';
//     for (const singleSize of clonedProductData.sizeValues) {
//       singleSize.chosen = false;
//       if (singleSize.value === sizeName) {
//         singleSize.chosen = true;
//         chosenSize = singleSize;
//         clonedProductData.chosenSizeAvailability = singleSize.availableForSale;
//       }
//     }
//     setBaseProductData(clonedProductData);

//     let chosenVariant;
//   }

//   return (
//     <div className="shipp-slider">
//       <Swiper
//         swiperOptions={{
//           slidesPerView: 3,
//           spaceBetween: 3,
//           breakpoints: {
//             1023: {
//               slidesPerView: 3,
//               spaceBetween: 4,
//             },
//             768: {
//               slidesPerView: 2,
//               spaceBetween: 4,
//             },
//             540: {
//               slidesPerView: 'auto',
//               spaceBetween: 4,
//             },
//           },
//           navigation: {
//             nextEl: '.gift-swiper-button-next-recently',
//             prevEl: '.gift-swiper-button-prev-recently',
//           },
//         }}
//         loop={false}
//         navigation={false}
//         pagination={false}
//       >
//         {baseProductData &&
//           baseProductData.images.edges.map((item, index) => {
//             return (
//               <Slide key={index}>
//                 <div className="shipp-gift_box">
//                   <div className="img">
//                     <div className="first_img">
//                       <img
//                         alt={item.altText}
//                         style={{ width: '100%' }}
//                         srcSet={
//                           `${item.node.originalSrc.replace('.jpg', '_260x.jpg')} 260w,` +
//                           `${item.node.originalSrc.replace('.jpg', '_390x.jpg')} 390w,` +
//                           `${item.node.originalSrc.replace('.jpg', '_468x.jpg')} 468w,` +
//                           `${item.node.originalSrc.replace('.jpg', '_560x.jpg')} 560w,` +
//                           `${item.node.originalSrc.replace('.jpg', '_640x.jpg')} 640w,` +
//                           `${item.node.originalSrc.replace('.jpg', '_750x.jpg')} 750w,` +
//                           `${item.node.originalSrc.replace('.jpg', '_828x.jpg')} 828w,` +
//                           `${item.node.originalSrc.replace('.jpg', '_1080x.jpg')} 1080w,` +
//                           `${item.node.originalSrc.replace('.jpg', '_1280x.jpg')} 1280w,`
//                         }
//                         width="288"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </Slide>
//             );
//           })}
//       </Swiper>
//       <div
//         className={
//           baseProductData && baseProductData.images.edges.length > 4
//             ? 'gift-swiper-button-prev-recently'
//             : 'gift-swiper-button-prev-recently hidden'
//         }
//       ></div>
//       <div
//         className={
//           baseProductData && baseProductData.images.edges.length > 4
//             ? 'gift-swiper-button-next-recently'
//             : 'gift-swiper-button-next-recently hidden'
//         }
//       ></div>
//       <div className="shipp-detail-style">
//         {baseProductData && (
//           <>
//             <p>{baseProductData.title}</p>
//             <div className="shipp-price">{ProductPriceHelper}</div>
//             <div className="clothe-heading">
//               <div className="clothe-product">
//                 {baseProductData.id && baseProductData.variants && (
//                   <div className="clothe_size">
//                     <div className="sizeTitle">
//                       <span className="s_tt">
//                         {`Größe`}
//                         {baseProductData.sizeValues.map((item, index) =>
//                           item.chosen ? (
//                             <div key={index} className={`left_size ${item.availableForSale ? '' : 'notAvailable'}`}>
//                               <span>- {item.value}</span>
//                             </div>
//                           ) : null,
//                         )}
//                       </span>
//                       <div className="size_chart">
//                         <ShippSize productCode={productCode} manOrWoman={manOrWoman} />
//                       </div>
//                     </div>
//                     <div className={'size-section'}>
//                       <ul className="sizeLists">
//                         {baseProductData.sizeValues.map((item, index) => (
//                           <li key={index}>
//                             {item.chosen ? (
//                               <div className={`sizeBox ${item.availableForSale ? '' : 'notAvailable'}`}>
//                                 <span>{item.value}</span>
//                               </div>
//                             ) : (
//                               <div
//                                 onClick={() => changeSize(item.value)}
//                                 className={item.availableForSale ? '' : 'notAvailable'}
//                               >
//                                 <span>{item.value}</span>
//                               </div>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-price-total">
//                 <div className="btn">
//                   <button
//                     aria-label={'In den Warenkorb'}
//                     className="addToCartBtn"
//                     disabled={props.hasExceededQuantity}
//                     onClick={() => props.AddToCard(true)}
//                   >
//                     {'In den Warenkorb'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
