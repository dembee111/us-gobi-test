/* eslint react/no-unescaped-entities: off */
import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import './PolicyPage.scss';
import { menuList } from './Data';
export default (function PolicyHeader() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showMenu, setShowMenu] = useState(false);
  const mobShow = () => {
    setShowMenu(!showMenu);
  };
  return (
    <section className="policy-page-header">
      <div className="policy-page-menu">
        {menuList.map((cat, index) => {
          return (
            <div key={index} className="policy-page-menu-item">
              <Link to={cat.handle} className={cat.style}>
                {cat.label}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="policy-page-mobile-menu">
        <div className={showMenu ? 'drop-open' : 'drop-hide'}>
          <div
            className="mobile-menu-btn"
            onClick={() => {
              mobShow();
            }}
          >
            <div className="m-label">
              <p>Policy</p>
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
                    <Link to={cat.handle} className={cat.style}>
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
              <div key={index} className="policy-page-menu-item">
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
