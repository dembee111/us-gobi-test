import './DealsLandingPage.scss';
import React from 'react';
import { Link } from 'gatsby';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { sec1Data, sec2Data, sec3Data, sec4Data, sec6Data, sec7Data, secText } from './DealsLandingPageData';
import InfiniteHitsCustom from '../../../CollectionPage/InfiniteHitsCustom/InfiniteHitsCustom';
import GiftsCardPage from '../GiftsLandingPage/GiftsCardPage/GiftsCardPage';
const DealsLandingPage = (props) => {
  return (
    <div className="deals-landing-main">
      <section className="deal-sec1">
        <div className="l-header">
          <Link to={sec1Data.handle}>
            <div className="header-bg">
              <div className="img-desktop">
                <img
                  alt={sec1Data.altText}
                  data-sizes="auto"
                  src={sec1Data.imgCover.replace('.jpg', '_120x.jpg')}
                  data-src={sec1Data.imgCover.replace('.jpg', '_1780x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
              <div className="img-mobile">
                <img
                  alt={sec1Data.altText}
                  data-sizes="auto"
                  src={sec1Data.imgCoverMobile.replace('.jpg', '_120x.jpg')}
                  data-src={sec1Data.imgCoverMobile.replace('.jpg', '_984x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
            </div>
            <div className="desc-box">
              <div className="details">
                <h1>{sec1Data.title}</h1>
                <p className="center-text">{sec1Data.centerText}</p>
                <div className="end-text">
                  <p>{sec1Data.bottomText1}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="l-collection">
          <div className="sec-width col-box-s">
            <div className="view-more">
              <Link to={sec1Data.handle}>{secText.moreBtn}</Link>
            </div>
            <InfiniteHitsCustom
              source={{
                origin: 'homeCollection',
                handle: 'trending-dresses-cardigans',
              }}
              currencyTable={props.currencyTable}
              currency={props.currency}
            />
          </div>
        </div>
      </section>
      <section className="deal-sec2">
        <div className="l-header">
          <Link to={sec2Data.handle}>
            <div className="header-bg">
              <div className="img-desktop">
                <img
                  alt={sec2Data.altText}
                  data-sizes="auto"
                  src={sec2Data.imgCover.replace('.jpg', '_120x.jpg')}
                  data-src={sec2Data.imgCover.replace('.jpg', '_1780x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
              <div className="img-mobile">
                <img
                  alt={sec2Data.altText}
                  data-sizes="auto"
                  src={sec2Data.imgCoverMobile.replace('.jpg', '_120x.jpg')}
                  data-src={sec2Data.imgCoverMobile.replace('.jpg', '_984x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
            </div>
            <div className="desc-box">
              <div className="details">
                <h1>{sec2Data.title}</h1>
                <p className="center-text">{sec2Data.centerText}</p>
                <div className="end-text">
                  <p>{sec2Data.bottomText1}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="l-collection">
          <div className="sec-width col-box-s">
            <div className="view-more">
              <Link to={sec2Data.handle}>{secText.moreBtn}</Link>
            </div>
            <InfiniteHitsCustom
              source={{
                origin: 'homeCollection',
                handle: 'trending-printed-shawls',
              }}
              currencyTable={props.currencyTable}
              currency={props.currency}
            />
          </div>
        </div>
      </section>
      <section className="deal-sec3">
        <div className="l-header">
          <Link to={sec3Data.handle}>
            <div className="header-bg">
              <div className="img-desktop">
                <img
                  alt={sec3Data.altText}
                  data-sizes="auto"
                  src={sec3Data.imgCover.replace('.jpg', '_120x.jpg')}
                  data-src={sec3Data.imgCover.replace('.jpg', '_1780x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
              <div className="img-mobile">
                <img
                  alt={sec3Data.altText}
                  data-sizes="auto"
                  src={sec3Data.imgCoverMobile.replace('.jpg', '_120x.jpg')}
                  data-src={sec3Data.imgCoverMobile.replace('.jpg', '_984x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
            </div>
            <div className="desc-box">
              <div className="details">
                <h1>{sec3Data.title}</h1>
                <p className="center-text">{sec3Data.centerText}</p>
                <div className="end-text">
                  <p>{sec3Data.bottomText1}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="l-collection">
          <div className="sec-width col-box-s">
            <div className="view-more">
              <Link to={sec3Data.handle}>{secText.moreBtn}</Link>
            </div>
            <InfiniteHitsCustom
              source={{
                origin: 'homeCollection',
                handle: 'trending-scarf',
              }}
              currencyTable={props.currencyTable}
              currency={props.currency}
            />
          </div>
        </div>
      </section>
      <section className="deal-sec4">
        <div className="l-header">
          <Link to={sec4Data.handle}>
            <div className="header-bg">
              <div className="img-desktop">
                <img
                  alt={sec4Data.altText}
                  data-sizes="auto"
                  src={sec4Data.imgCover.replace('.jpg', '_120x.jpg')}
                  data-src={sec4Data.imgCover.replace('.jpg', '_1780x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
              <div className="img-mobile">
                <img
                  alt={sec4Data.altText}
                  data-sizes="auto"
                  src={sec4Data.imgCoverMobile.replace('.jpg', '_120x.jpg')}
                  data-src={sec4Data.imgCoverMobile.replace('.jpg', '_984x.jpg')}
                  className="lazyload blur-up"
                />
              </div>
            </div>
            <div className="desc-box">
              <div className="details">
                <h1>{sec4Data.title}</h1>
                <p className="center-text">{sec4Data.centerText}</p>
                <div className="end-text">
                  <p>{sec4Data.bottomText1}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="l-collection">
          <div className="sec-width col-box-s">
            <div className="view-more">
              <Link to={sec4Data.handle}>{secText.moreBtn}</Link>
            </div>
            <InfiniteHitsCustom
              source={{
                origin: 'homeCollection',
                handle: 'trending-hat',
              }}
              currencyTable={props.currencyTable}
              currency={props.currency}
            />
          </div>
        </div>
      </section>
      <section className="deal-sec5">
        <GiftsCardPage />
      </section>
      <section className="deal-sec6">
        <div className="sec-width">
          <div className="box-lay">
            <div className="grid-col">
              <div className="img-box">
                <img className="border-l" src={sec6Data.imgCover} alt={sec6Data.title}></img>
              </div>
              <div className="details-box border-r">
                <h1>{sec6Data.title}</h1>
                <p>{sec6Data.centerText}</p>
                <div className="read-btn">
                  <Link to={sec6Data.handle}>{sec6Data.btnText}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="deal-sec7">
        <div className="sec-width">
          <div className="box-lay">
            <div className="grid-col">
              <div className="details-box border-l">
                <h1>{sec7Data.title}</h1>
                <p>{sec7Data.centerText}</p>
                <div className="read-btn">
                  <Link to={sec7Data.handle}>{sec7Data.btnText}</Link>
                </div>
              </div>
              <div className="img-box grid-box-end">
                <img className="border-r" src={sec7Data.imgCover} alt={sec7Data.title}></img>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DealsLandingPage;
