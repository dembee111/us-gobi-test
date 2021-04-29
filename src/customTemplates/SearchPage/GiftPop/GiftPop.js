import React, { useEffect, useState } from 'react';
import './GiftPop.scss';
import { Link } from 'gatsby';
import { popGiftData } from './Data';
import store from '../../../state/createStore';

export default (function GiftPop({ callBack, ...props }) {
  return (
    <div>
      <div className="gift-pop-bg" onClick={callBack}></div>
      <section className="gift-pop-section">
        <div className="gift-pop-title">
          <h1>Gifts of warm comfort</h1>
          <span>from us to you</span>
        </div>
        <div className="gift-pop-grid">
          {popGiftData.map((list, index) => {
            return (
              <div key={index} className="gift-pop-grid-item">
                <div className="gift-pop-name">
                  <p>{list.name}</p>
                </div>
                <div className="gift-pop-price">
                  <p>{list.price}</p>
                </div>
                <div className="gift-pop-product">
                  <h1>{list.productName}</h1>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="gift-pop-btn">
          <Link to="/pages/gift">Learn more</Link>
        </div> */}
        <div className="close_btn" onClick={callBack}>
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 1L1 17" stroke="#212121" />
            <path d="M1 1L17 17" stroke="#212121" />
          </svg>
        </div>
      </section>
    </div>
  );
});
