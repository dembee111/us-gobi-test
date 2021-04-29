import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { Link } from 'gatsby';
import './About2Page.scss';
import { menuList, whoList } from './Data';
import Collapsible from 'react-collapsible';
export default (function AboutHeaderPage(props) {
  const [showMenu, setShowMenu] = useState(false);
  const mobShow = () => {
    setShowMenu(!showMenu);
  };
  return (
    <section className="about-page-header">
      <div className="about-page-menu">
        {menuList.map((cat, index) => {
          return (
            <div key={index} className="about-page-menu-item">
              <Link to={cat.handle} activeClassName="m-active">
                {cat.label}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="about-page-mobile-menu">
        <div className={showMenu ? 'drop-open' : 'drop-hide'}>
          <div
            className="mobile-menu-btn"
            onClick={() => {
              mobShow();
            }}
          >
            <div className="m-label">
              <p>Who we are</p>
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2256 6.5L7.22559 0.5L1.22559 6.5" stroke="#4F5255" />
              </svg>
            </div>
          </div>
          <div className="drop-menu">
            <div mobShow={mobShow}>
              {menuList.map((cat, index) => {
                return (
                  <div key={index} className="drop-menu-item">
                    <Link to={cat.handle} className={cat.style} activeClassName="mobile-m-active">
                      {cat.label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <Collapsible trigger="Who we are">
          {menuList.map((cat, index) => {
          return (
            <div key={index} className="about-page-menu-item">
              <Link to={cat.handle} className={cat.style}>
                {cat.label}
              </Link>
            </div>
          );
        })}
          </Collapsible> */}
      </div>
    </section>
  );
});
