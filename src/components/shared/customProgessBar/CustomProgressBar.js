import React from 'react';
import './CustomProgressBar.scss';
import { Link } from 'gatsby';
import 'react-dynamic-swiper/lib/styles.css';
import { BannerData } from './CustomProgressData';

const CustomProgressBar = () => {
  function createMarkup(data) {
    return {
      __html: data,
    };
  }
  return (
    <div className="valentine-banner">
      <Link to={BannerData.handle}>
        <div className="detail">
          <div className="left">
            <h2 className="tt">{BannerData.title}</h2>
            <p className="text">{BannerData.description}</p>
          </div>
          <div className="right">
            {BannerData.child.map((item, key) => (
              <div className="text" key={key}>
                <p>{item.title}</p>
                <span>{item.bottom}</span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CustomProgressBar;
