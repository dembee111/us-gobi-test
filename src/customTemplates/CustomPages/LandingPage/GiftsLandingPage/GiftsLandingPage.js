import './GiftsLandingPage.scss';
import React from 'react';
import { Link } from 'gatsby';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { sec1Data, sec2Data, sec3Data, sec4Data, sec5Data, secText } from './GiftsLandingPageData';
import InfiniteHitsCustom from '../../../CollectionPage/InfiniteHitsCustom/InfiniteHitsCustom';
import GiftsCardPage from './GiftsCardPage/GiftsCardPage';

const GiftsLandingPage = (props) => {
  return (
    <div className="gifts-landing-main">
      <section className="landing-sec1">
        <div className="ln-container">
          <div className="grid-col">
            {sec1Data.map((list, index) => {
              return (
                <div className="grid-col-item" key={index}>
                  <Link to={list.handle}>
                    <div className="col-items">
                      <h1>{list.title}</h1>
                      <div className="img-box">
                        <img
                          alt={list.altText}
                          data-sizes="auto"
                          src={list.imgCover.replace('.jpg', '_120x.jpg')}
                          data-src={list.imgCover.replace('.jpg', '_1700x.jpg')}
                          className="lazyload blur-up"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="landing-sec2">
        <div className="ln-container">
          <div className="grid-col m-grid-gap">
            {sec2Data.map((list, index) => {
              return (
                <div className="grid-col-item" key={index}>
                  <Link to={list.handle}>
                    <div className="col-items-2">
                      <h1>{list.title}</h1>
                      <h2>{list.price}</h2>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <GiftsCardPage />
      <section className="landingsec4">
        <div className="ln-container">
          <div className="collection-widget">
            <div className="collection-head">
              <h1>Gifts People Love</h1>
              <Link to="/collections/all-best-sellers">View All</Link>
            </div>
            <InfiniteHitsCustom
              source={{
                origin: 'homeCollection',
                handle: 'gift-people-love',
              }}
              currencyTable={props.currencyTable}
              currency={props.currency}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GiftsLandingPage;
