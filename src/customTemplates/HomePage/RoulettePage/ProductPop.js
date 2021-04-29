import React, { useEffect, useState } from 'react';
import { Link, StaticQuery } from 'gatsby';
import './RouletteMain.scss';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import ProductData from './ProductData';
export default (function ProductPop(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product_slide = {
    slidesPerView: 2,
    spaceBetween: 4,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  return (
    <section className="spin-popup-section">
      <div className="spin-popup-bg"></div>
      <div className="spin-popup bg2">
        <div>
          <ProductData />
        </div>
        <div className="spin-close-btn">
          <img
            src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_62_1.svg?v=1606092354"
            alt="Close Btn"
          ></img>
        </div>
      </div>
    </section>
  );
});
