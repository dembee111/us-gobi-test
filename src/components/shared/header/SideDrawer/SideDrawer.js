import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import './SideDrawer.scss';
import { connect } from 'react-redux';
import SubMenu2 from '../SubMenu/SubMenu2';
import { headerCategories } from '../../data/headerCategories';
import LocationPopUp from '../LocationPopUp/LocationPopUp';
import SigninPopup from './../SigninPopup/SigninPopup';
import { approvedCountryList } from '../../data/approvedCountryList';

const SideDrawer = (props) => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  const [SubMenuShow, setSubMenuShow] = useState(false);
  const [node, setNode] = useState();
  const [menuClasses, setMenuClasses] = useState('sub-menu');
  const [langState, setLangState] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState('');
  const [shippingCountryText, setShippingCountryText] = useState('International');

  useEffect(() => {
    if (props.currency && props.currency.chosenShippingCountry) {
      for (let singleCountry of approvedCountryList) {
        if (singleCountry.countryCode === props.currency.chosenShippingCountry) {
          setShippingCountryText(singleCountry.countryName);
          break;
        }
      }
    }
  }, [props.currency.chosenShippingCountry]);

  useEffect(() => {
    if (props.show) setMenuClasses('sub-menu open');
  }, [props.show]);

  function openSignModal() {
    setOpenSignInModal('open_modal');
  }

  return (
    <div className={drawerClasses}>
      <div className="menu-close-btn">
        <button
          aria-label="Close Side Drawer"
          className="close-button"
          onClick={() => {
            props.setSideDrawerOpen(false);
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 1L13 13" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="drawer">
        <div className="mobile-menu-nav left-width">
          <div className="side_top">
            <div className="m-head-c">
              <div className="mobile-menu-header">
                <div className="icon">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19"
                      stroke="#4F5255"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
                      stroke="#4F5255"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="links" onClick={openSignModal}>
                  <Link to="/" className="Ilink">
                    Sign In
                  </Link>{' '}
                  /{' '}
                  <Link to="/" className="IIlink">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
            <div className="left-menu-body">
              <ul>
                {headerCategories.map((headerCategory, index) => {
                  if (headerCategory.data_single === 'link') {
                    return (
                      <li key={index}>
                        <div className="mobile-nav-item">
                          <div className="mobile-nav-sublist">
                            <div className="mobile-nav-toggle">
                              <Link to={headerCategory.link} className="collapsible-trigger">
                                <span>{headerCategory.label}</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index}>
                        <div className="mobile-nav-item">
                          <div className="mobile-nav-sublist">
                            <div className="mobile-nav-toggle">
                              <button
                                aria-label="Show sub menu"
                                type="button"
                                className="collapsible-trigger"
                                onClick={() => {
                                  setNode(headerCategory);
                                  setSubMenuShow(true);
                                }}
                              >
                                <span>{headerCategory.label}</span>
                                <svg
                                  width="8"
                                  height="14"
                                  viewBox="0 0 8 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M1 13L7 7L1 1"
                                    stroke="#4F5255"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          {SubMenuShow && (
                            <div className={menuClasses}>
                              <SubMenu2
                                setSubMenuShow={setSubMenuShow}
                                setSideDrawerOpen={props.setSideDrawerOpen}
                                node={node}
                              />
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
          <div className="side_bottom">
            <div className="location_cus_btn">
              <button
                aria-label="Shipping country"
                className="loc__btn"
                onClick={() => {
                  setLangState(true);
                }}
              >
                <span className="loc__icon">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 0C1.79444 0 0 1.79445 0 4.00001C0 4.66212 0.165539 5.3186 0.480233 5.90088L3.78126 11.8711C3.8252 11.9507 3.90895 12 4 12C4.09105 12 4.1748 11.9507 4.21874 11.8711L7.52099 5.89891C7.83446 5.3186 8 4.66209 8 3.99998C8 1.79445 6.20556 0 4 0ZM4 6C2.89722 6 2.00001 5.10279 2.00001 4.00001C2.00001 2.89723 2.89722 2.00002 4 2.00002C5.10278 2.00002 5.99999 2.89723 5.99999 4.00001C5.99999 5.10279 5.10278 6 4 6Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <span className="tt">United States</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <SigninPopup openSignInModal={openSignInModal} setOpenSignInModal={setOpenSignInModal} />
      {langState && (
        <LocationPopUp
          langState={langState}
          setLangState={setLangState}
          updateCheckoutCurrencyMutation={props.updateCheckoutCurrencyMutation}
        />
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    customerAccessTokenObject: state.customerAccessTokenObject,
    currency: state.currency,
  };
};
export default connect(mapStateToProps)(SideDrawer);
