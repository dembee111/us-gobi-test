import React, { useState, useEffect, useRef } from 'react';
import './style-2.scss';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import SizeImgChart from './ProductFrom/SizeChartModal/SizeImgChart';
import { addToCart, convertCurrency } from '../../../components/shared/cart/CartHelpers';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
const SmallModalChange = (props) => {
  let {
    data,
    setSmallModal,
    baseProductData,
    smallModal,
    changeColor,
    ProductPriceHelper,
    changeColorStyle,
    changeSize,
    setChangecolor,
    hasExceededQuantity,
    variant,
  } = props;
  function closeSignModal() {
    setSmallModal('');
    setChangecolor('');
  }
  const [errorState, setErrorState] = useState({
    message: '',
    show: false,
  });
  const [manOrWoman, setManOrWoman] = useState();
  const [productCode, setProductCode] = useState('');

  const [swiper, setSwiper] = useState(null);

  const gift_slide = {
    slidesPerView: 3,
    spaceBetween: 1,
    loop: true,
  };

  return (
    <div className="Shop-Modal-New">
      <div className={'tc_signModal1 ' + smallModal} key="1">
        <div className="modal-home">
          <div className="Modal-clothe-content">
            <div className="close_btn" onClick={closeSignModal}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 1L13 13" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {data && (
              <React.Fragment>
                <div className="img-box">
                  <img
                    alt="Gobi Cashmere"
                    data-sizes="auto"
                    src={data.bigImg && data.bigImg.replace('.jpg', '_400x.jpg')}
                    data-src={data.bigImg && data.bigImg.replace('.jpg', '_828x.jpg')}
                    className="lazyload blur-up"
                  />
                </div>
                <div className="clothe-description">
                  <div>
                    <a className="back-btn" onClick={closeSignModal} style={{ display: 'flex' }}>
                      <div>
                        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M14.1387 25.2925L7.13867 18.2925L14.1387 11.2925"
                            stroke="black"
                            strokeLinecap="round"
                          />
                          <path d="M7.55078 18.2924L29.8751 18.2924" stroke="black" strokeLinecap="round" />
                        </svg>
                      </div>
                      <p style={{ marginTop: '7px', marginLeft: '10px' }}>back</p>
                    </a>
                    {baseProductData.id ? (
                      <div className="clothe-photos">
                        {baseProductData.handle === props.handle && (
                          <Swiper {...gift_slide} getSwiper={setSwiper}>
                            {baseProductData.images.edges.map((item, i) => {
                              return (
                                <span key={i}>
                                  <img
                                    alt={item.node.alt}
                                    data-sizes="auto"
                                    src={item.node.originalSrc && item.node.originalSrc.replace('.jpg', '_100x.jpg')}
                                    data-src={
                                      item.node.originalSrc && item.node.originalSrc.replace('.jpg', '_160x.jpg')
                                    }
                                    className="lazyload blur-up"
                                  />
                                </span>
                              );
                            })}
                          </Swiper>
                        )}
                      </div>
                    ) : (
                      <div className="clothe-photos">
                        {data.originalSrc ? (
                          <img alt="Gobi Cashmere" src={data.originalSrc} />
                        ) : (
                          data.originalImgas.map((item, i) => (
                            <span key={i}>
                              {item.handle === baseProductData.handle && (
                                <img
                                  alt={item.alt}
                                  data-sizes="auto"
                                  src={item.originalSrc && item.originalSrc.replace('.jpg', '_100x.jpg')}
                                  data-src={item.originalSrc && item.originalSrc.replace('.jpg', '_160x.jpg')}
                                  className="lazyload blur-up"
                                />
                              )}
                            </span>
                          ))
                        )}
                      </div>
                    )}

                    <div className="clothe-heading">
                      <span className="clothe-title">
                        <p style={{ textTransform: 'lowercase' }}>
                          {baseProductData.id && baseProductData.variants && baseProductData.title}
                        </p>
                      </span>
                      <div className="clothe-p">
                        {' '}
                        <p>{ProductPriceHelper}</p>
                      </div>
                      <div className="clothe-product">
                        {baseProductData.id && baseProductData.variants && (
                          <div className="productForm" style={{ width: props.formWidth }}>
                            <div className="clothe_color">
                              <div className="colorTitle">
                                <p>
                                  Colour
                                  <span>
                                    -{' '}
                                    {baseProductData.id && baseProductData.variants && baseProductData.chosenColorValue}
                                    {/* {baseProductData.colorValues.map((item, i) =>
                                      item.chosen ? <span key={i}>{item.name}</span> : null,
                                    )} */}
                                  </span>
                                </p>
                              </div>
                              <div className="colorVarientForm">
                                {baseProductData.colorValues.map((item, i) => (
                                  <span key={i}>
                                    {item.chosen ? (
                                      <div
                                        key={i}
                                        className="singleColorVariantBox"
                                        style={{ border: '1px solid #18a0fb' }}
                                      >
                                        <div
                                          className="innerSingleColorBox"
                                          style={{
                                            backgroundImage: `url(https://cdn.shopify.com/s/files/1/1953/2845/t/95/assets/${item.name}_50x.png?v=)`,
                                          }}
                                        ></div>
                                      </div>
                                    ) : (
                                      <div key={i} className="singleColorVariantBox">
                                        <div
                                          className="innerSingleColorBox"
                                          style={{
                                            backgroundImage: `url(https://cdn.shopify.com/s/files/1/1953/2845/t/95/assets/${item.name}_50x.png?v=)`,
                                          }}
                                          onClick={() => changeColor(item.handle)}
                                        />
                                      </div>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="clothe_size">
                              <div className="sizeTitle">
                                <span className="s_tt">
                                  Size
                                  {baseProductData.sizeValues.map((item, index) =>
                                    item.chosen ? (
                                      <div
                                        key={index}
                                        className={`left_size ${item.availableForSale ? '' : 'notAvailable'}`}
                                      >
                                        <span>- {item.value}</span>
                                      </div>
                                    ) : null,
                                  )}
                                </span>
                                <div className="size_chart">
                                  <SizeImgChart productCode={productCode} manOrWoman={manOrWoman} />
                                </div>
                              </div>
                              <div className={'size-section'}>
                                <ul className="sizeLists">
                                  {baseProductData.sizeValues.map((item, index) => (
                                    <li key={index}>
                                      {item.chosen ? (
                                        <div className={`sizeBox ${item.availableForSale ? '' : 'notAvailable'}`}>
                                          <span>{item.value}</span>
                                        </div>
                                      ) : (
                                        <div
                                          onClick={() => changeSize(item.value)}
                                          className={item.availableForSale ? '' : 'notAvailable'}
                                        >
                                          <span>{item.value}</span>
                                        </div>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="modal-price-total">
                        <div className="btn">
                          <button
                            aria-label={'In den Warenkorb'}
                            onClick={() => {
                              if (!variant) {
                                setErrorState({
                                  message: 'Größe auswählen',
                                  show: true,
                                });
                              } else {
                                setErrorState({
                                  message: '',
                                  show: false,
                                });
                                convertCurrency().then((newGifts) => {
                                  props.setHasExceededQuantity(
                                    addToCart(
                                      variant || props.baseProductData.variants.edges[0].node,
                                      props.baseProductData,
                                    ),
                                  );
                                });
                              }
                            }}
                            className="addToCartBtn"
                            disabled={props.hasExceededQuantity}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customerAccessTokenObject: state.customerAccessTokenObject,
  customer: state.customer,
  currency: state.currency,
});

export default connect(mapStateToProps)(SmallModalChange);
