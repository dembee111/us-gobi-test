import './HeaderBar.scss';
import React from 'react';
import { Link } from 'gatsby';
import 'react-dynamic-swiper/lib/styles.css';
import Marquee from 'react-fast-marquee';

const CustomProgressBar = () => {
  function createMarkup(data) {
    return {
      __html: data,
    };
  }

  return (
    <div className="header-banner">
      <div className="detail desktop">
        <Marquee pauseOnHover speed={30} gradient={false}>
          <p style={{ width: `840px`, fontSize: `12px`, lineHeight: `16px` }}>
            <Link
              to="/collections/new"
              aria-label="HAPPY MOTHER'S DAY"
            >{`Sweet deal of the week: Make mom happy & get a FRINGE SCARF as a gift. On orders over $79!`}</Link>
          </p>
          <p style={{ width: `840px`, fontSize: `12px`, lineHeight: `16px` }}>
            <Link
              to="/collections/new"
              aria-label="HAPPY MOTHER'S DAY"
            >{`Sweet deal of the week: Make mom happy & get a FRINGE SCARF as a gift. On orders over $79!`}</Link>
          </p>
        </Marquee>
      </div>
      <div className="detail mobile">
        <Marquee pauseOnHover speed={25} gradient={false}>
          <p style={{ width: `840px`, fontSize: `12px`, lineHeight: `16px` }}>
            <Link
              to="/collections/new"
              aria-label="HAPPY MOTHER'S DAY"
            >{`Sweet deal of the week: Make mom happy & get a FRINGE SCARF as a gift. On orders over $79!`}</Link>
          </p>
          <p style={{ width: `840px`, fontSize: `12px`, lineHeight: `16px` }}>
            <Link
              to="/collections/new"
              aria-label="HAPPY MOTHER'S DAY"
            >{`Sweet deal of the week: Make mom happy & get a FRINGE SCARF as a gift. On orders over $79!`}</Link>
          </p>
        </Marquee>
      </div>
    </div>
  );
};

export default CustomProgressBar;
