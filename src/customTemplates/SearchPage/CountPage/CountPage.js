import React, { useEffect, useState } from 'react';
import './CountPage.scss';
import { Link } from 'gatsby';
import HomeCountDown from '../../HomePage/HomeCountDown/HomeCountDown';

export default (function CountPage(props) {
  return (
    <div className="collection-count">
      <Link to="/collections/sale">
        <div className="count-grid-col">
          <div className="count-grid-item1">
            <div className="count-box1">
              <div className="count-timer-title">
                <h1>WINTER SALE</h1>
                <p>{`Upto 60% off`}</p>
              </div>
            </div>
            <div className="count-right">
              <HomeCountDown />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});
