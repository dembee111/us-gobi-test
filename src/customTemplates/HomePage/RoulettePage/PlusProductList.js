import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import './RouletteMain.scss';
// import Swiper from 'react-id-swiper';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';
// import 'swiper/swiper.scss';
import { getProductsFromCollectionHandleInit } from '../../../components/shared/query/query';
import { useLazyQuery } from '@apollo/client';

export default (function PlusProductList(props) {
  const [getProductsFromCollection, { data: getProductByHandleData, error: getProductByHandleError }] = useLazyQuery(
    getProductsFromCollectionHandleInit,
  );

  const [dataCollection, setDataCollection] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);

    getProductsFromCollection({
      variables: {
        currencyCode: props.currency.currencyCode,
        handle: props.handle,
        first: 3,
      },
    });
  }, [props.currency]);

  useEffect(() => {
    if (getProductByHandleError) {
      console.log(getProductByHandleError, '----errr');
    }
    if (getProductByHandleData && getProductByHandleData.collectionByHandle) {
      let tempProductEdges = JSON.parse(JSON.stringify(getProductByHandleData.collectionByHandle.products.edges));

      let pushingData = [];

      for (let singleLoop of tempProductEdges) {
        pushingData.push(singleLoop.node);
      }

      setDataCollection(pushingData);
    }
  }, [getProductByHandleData, getProductByHandleError]);

  const slideOption = {
    slidesPerView: 3,
    spaceBetween: 4,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };
  return (
    <section className="spin-popup-section">
      <div className="spin-popup-bg"></div>
      <div className="spin-popup-white bg3">
        <div className="pop-title2">
          <h1>Buy 1 get 1 free</h1>
        </div>
        <div className="product-list-slider">
          <Swiper
            swiperOptions={{
              slidesPerView: 3,
              spaceBetween: 3,
              breakpoints: {
                1023: {
                  slidesPerView: 3,
                  spaceBetween: 4,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 4,
                },
                320: {
                  slidesPerView: 3,
                  spaceBetween: 4,
                },
              },
              navigation: {
                nextEl: '.gift-swiper-button-next-recently',
                prevEl: '.gift-swiper-button-prev-recently',
              },
            }}
            loop={false}
            pagination={false}
          >
            {dataCollection &&
              dataCollection.map((item, index) => (
                <Slide key={index} className="product-list-box">
                  <Link to="/">
                    <div className="img-box">
                      <img
                        srcSet={
                          `${item.images.edges[0].node.originalSrc.replace('.jpg', '_260x.jpg')} 260w,` +
                          `${item.images.edges[0].node.originalSrc.replace('.jpg', '_390x.jpg')} 390w,` +
                          `${item.images.edges[0].node.originalSrc.replace('.jpg', '_468x.jpg')} 468w,` +
                          `${item.images.edges[0].node.originalSrc.replace('.jpg', '_560x.jpg')} 560w,` +
                          `${item.images.edges[0].node.originalSrc.replace('.jpg', '_640x.jpg')} 640w,` +
                          `${item.images.edges[0].node.originalSrc.replace('.jpg', '_750x.jpg')} 750w,` +
                          `${item.images.edges[0].node.originalSrc.replace('.jpg', '_828x.jpg')} 828w,` +
                          `${item.images.edges[0].node.originalSrc.replace('.jpg', '_1080x.jpg')} 1080w,` +
                          `${item.images.edges[0].node.originalSrc.replace('.jpg', '_1280x.jpg')} 1280w,`
                        }
                        alt={item.images.edges[0].node.altText}
                      ></img>
                    </div>
                    <div className="detail-box">
                      <div className="product-title">
                        <h1>{item.title}</h1>
                      </div>
                      <div className="product-color">
                        <p>+3 colors</p>
                      </div>
                      <div className="product-price">
                        <p>$ {item.variants.edges[0].node.priceV2.amount}</p>
                      </div>
                    </div>
                  </Link>
                </Slide>
              ))}
          </Swiper>
        </div>

        {/* <div className="spin-close-btn">
          <img
            src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_62_1.svg?v=1606092354"
            alt="Close Btn"
          ></img>
        </div> */}
      </div>
    </section>
  );
});
