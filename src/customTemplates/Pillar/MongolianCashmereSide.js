import React, { Component } from 'react';
import { Link } from 'react-scroll';
import { Sticky } from 'react-sticky';

export default class MongolianCashmereSide extends Component {
  render() {
    return (
      <Sticky relative={true}>
        {() => (
          <div className="pilla_sidebar">
            <div className="custom_scroll_line" />
            <div className="tt">
              <div className="svg">
                <svg width={47} height={47} viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24.4019" cy="24.2551" r="23.5" stroke="#DFE2E3" />
                  <path d="M12.8724 17.2551H35.9313" stroke="#6D6D6D" strokeWidth={2} />
                  <path d="M12.8724 24.2551H35.9313" stroke="#6D6D6D" strokeWidth={2} />
                  <path d="M12.8724 31.2551H35.9313" stroke="#6D6D6D" strokeWidth={2} />
                </svg>
              </div>
              <h2> FEATURED ARTICLES </h2>
            </div>
            <div
              className="sidebar is-affixed"
              style={{
                height: '212px',
                position: 'relative',
              }}
            >
              <div
                className="inner-wrapper-sticky"
                style={{
                  opacity: 1,
                  transition: 'all 0.1s ease 0s',
                  position: 'relative',
                  transform: 'translate3d(0px, 0px, 0px)',
                }}
              >
                <nav className="cus_nav">
                  <ul className="side_lists">
                    <li className="pilla_side_link">
                      <Link className="smscroll" to="mongolia-the-land-of-soft-gold" spy smooth duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        1. Mongolia - The Land of Soft Gold
                      </Link>
                    </li>
                    <li className="pilla_side_link">
                      <Link className="smscroll" to="mongolian-nomads" spy smooth duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        2. Mongolian Nomads
                      </Link>
                    </li>
                    <li className="pilla_side_link">
                      <Link className="smscroll" to="mongolian-goats" spy smooth duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        3. Mongolian Goats
                      </Link>
                    </li>
                    <li className="pilla_side_link">
                      <Link className="smscroll" to="traditional-hand-combing" spy smooth duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        4. Traditional Hand Combing
                      </Link>
                    </li>
                    <li className="pilla_side_link">
                      <Link className="smscroll" to="mongolian-noble-fibre" spy smooth duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        5. Mongolian Noble Fibre
                      </Link>
                    </li>
                    <li className="pilla_side_link">
                      <Link className="smscroll" to="cashmere-quality" spy smooth duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        6. Cashmere Quality
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}
      </Sticky>
    );
  }
}
