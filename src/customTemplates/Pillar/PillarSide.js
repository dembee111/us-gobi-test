import React, { Component } from 'react';
import { Link } from 'react-scroll';
import { Sticky } from 'react-sticky';

export default class PillarSide extends Component {
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
              <h2>FEATURED ARTICLES</h2>
            </div>
            <div className="sidebar is-affixed" style={{ height: '212px', position: 'relative' }}>
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
                      <Link className="smscroll" to="our-story" spy smooth offsetTop={30} duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        1. Our Story
                      </Link>
                    </li>
                    <li className="pilla_side_link" activeClass="active" onSetActive={this.handleSetActive}>
                      <Link className="smscroll" to="manufacturing" offsetTop={30} spy smooth duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        2. Manufacturing
                      </Link>
                    </li>
                    <li className="pilla_side_link">
                      <span className="dot">
                        <span />
                      </span>
                      <Link className="smscroll" to="sustainability" offsetTop={30} spy smooth duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        3. Sustainability
                      </Link>
                    </li>
                    <li className="pilla_side_link">
                      <span className="dot">
                        <span />
                      </span>
                      <Link className="smscroll" to="our-brand" offsetTop={30} spy smooth duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        4. Our Brand
                      </Link>
                    </li>
                    <li className="pilla_side_link">
                      <span className="dot">
                        <span />
                      </span>
                      <Link className="smscroll" to="global-presence" offsetTop={130} spy smooth duration={1000}>
                        <span className="dot">
                          <span />
                        </span>
                        5. Global Presence
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
