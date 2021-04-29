import './GiftsCardPage.scss';
import React from 'react';
import { Link } from 'gatsby';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { giftCardData } from './GiftsCardPageData';

const GiftsCardPage = (props) => {
  return (
    <section className="landing-sec3">
      <Link to={giftCardData.handle}>
        <div className="digital-gift-card">
          <div className="card-box">
            <img
              alt={giftCardData.title}
              data-sizes="auto"
              src={giftCardData.imgSrc.replace('.jpg', '_120x.jpg')}
              data-src={giftCardData.imgSrc.replace('.jpg', '_1200x.jpg')}
              className="lazyload blur-up"
            />
          </div>
          <div className="text-box">
            <p className="top-text">{giftCardData.topText}</p>
            <h1>{giftCardData.title}</h1>
            <div className="end-text">
              <p>{giftCardData.endTextTop}</p>
              <p className="btn-text">{giftCardData.endTextBottom}</p>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default GiftsCardPage;
