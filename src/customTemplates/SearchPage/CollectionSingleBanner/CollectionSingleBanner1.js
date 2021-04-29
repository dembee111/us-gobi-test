import './CollectionSingleBanner.scss';
import React from 'react';
import { Link } from 'gatsby';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { banner1Data } from './CollectionSingleBannerData';
const CollectionSingleBanner1 = (props) => {
  return (
    <div className="collection-single-banner">
      <Link to={banner1Data.handle}>
        <div className="bg-img">
          <img src={banner1Data.imgCover} alt={banner1Data.title}></img>
        </div>
        <div className="details">
          <h1 style={{ margin: '0' }}>{banner1Data.topTitle}</h1>
          <h1>{banner1Data.title}</h1>
          <p>{banner1Data.bottonTitle}</p>
          <div className="read-btn">
            <Link to={banner1Data.handle}>{banner1Data.btnText}</Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CollectionSingleBanner1;
