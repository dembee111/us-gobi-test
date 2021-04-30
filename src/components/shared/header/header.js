// export default connect(mapStateToProps)(Header);
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
// import {  withRouter } from 'react-router-dom';
import './header.scss';
import './headermobile.css';
import { Link, navigate } from 'gatsby';
import Cart from '../cart/cart';
import store from '../../../state/createStore';
import { connect } from 'react-redux';
import MobileSearchField from './MobileSearchField/MobileSearchField';
import LocationPopUp from './LocationPopUp/LocationPopUp';
import NavbarMenu from './NavbarMenu/NavbarMenu';
import { approvedCountryList } from '../data/approvedCountryList';
import MobileMenu from './MobileMenu';
import LogoSvg from './LogoSvg';
import CustomAutocomplete from './HeaderSearch/AutoComplete';
import SigninPopup from './SigninPopup/SigninPopup';
import HeaderBar from '../customProgessBar/HeaderBar';
import { qtyCount } from '../cart/CartHelpers';

const Header = (props) => {
  const ref = useRef();
  useLayoutEffect(() => { });
  const params = {
    slidesPerView: 1,
    spaceBetween: 1,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
  };

  const [langState, setLangState] = useState(false);
  const [allowHeader, setAllowHeader] = useState(true);
  // const [searchInput, setSearchInput] = useState('');

  function searchHandle() {
    let clonedSearchInput = props.searchInput;
    // props.setSearchInput('');
    // window.location.push('/search/' + clonedSearchInput);
    navigate('/search/' + clonedSearchInput);
  }
  /**
   * Visibility state of bigDropDown 1
   */
  const [bigDropDownStyle1, setBigDropDownStyle1] = useState({
    display: 'none',
    opacity: 0,
  });
  /**
   * Visibility state of bigDropDown 2
   */
  const [bigDropDownStyle2, setBigDropDownStyle2] = useState({
    display: 'none',
    opacity: 0,
  });
  const [bigDropDownStyle3, setBigDropDownStyle3] = useState({
    display: 'none',
    opacity: 0,
  });

  const [showAnnouncementBar, setShowAnnouncementBar] = useState(true);

  const [mobileSearchState, setMobileSearchState] = useState(false);

  const [shippingCountryText, setShippingCountryText] = useState('International');

  const [pathName, setPathName] = useState('/');

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const [openSignInModal, setOpenSignInModal] = useState('');

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
    // window.scrollTo(0, 0);
    if (
      window.innerWidth <= 768 &&
      window.location.pathname.includes('/account') &&
      !window.location.pathname.includes('/login') &&
      !window.location.pathname.includes('/register') &&
      !window.location.pathname.includes('/reset')
    ) {
      setAllowHeader(false);
    } else {
      setAllowHeader(true);
    }
    window.addEventListener('resize', resizeUpdate, { passive: true });
    return () => {
      window.removeEventListener('resize', resizeUpdate);
    };
  }, []);

  useEffect(() => {
    if (props.location) {
      setPathName(props.location.pathname);
    } else {
      setPathName(null);
    }
  }, [props.location]);

  function resizeUpdate() {
    if (
      window.innerWidth <= 768 &&
      window.location.pathname.includes('/account') &&
      !window.location.pathname.includes('/login') &&
      !window.location.pathname.includes('/register') &&
      !window.location.pathname.includes('/reset')
    ) {
      setAllowHeader(false);
    } else {
      setAllowHeader(true);
    }
  }

  /**
   * Visibility state of search
   */

  let arrayBigDropDown = [bigDropDownStyle1, bigDropDownStyle2, bigDropDownStyle3];

  /**
   * Enable bigDropDown of given index
   * @param {number} index given index
   */
  function showBigDropDown(index) {
    if (index === 1) {
      setBigDropDownStyle1({
        display: 'block',
        opacity: 1,
        transitionDelay: '3s',
      });
    } else if (index === 2) {
      setBigDropDownStyle2({
        display: 'block',
        opacity: 1,
      });
    } else if (index === 3) {
      setBigDropDownStyle3({
        display: 'block',
        opacity: 1,
      });
    }
  }

  /**
   * Disable bigDropDown of given index
   * @param {number} index given index
   */

  function hideBigDropDown(index) {
    if (index === 1) {
      setBigDropDownStyle1({
        display: 'none',
        opacity: 0,
      });
    } else if (index === 2) {
      setBigDropDownStyle2({
        display: 'none',
        opacity: 0,
      });
    } else if (index === 3) {
      setBigDropDownStyle3({
        display: 'none',
        opacity: 0,
      });
    }
  }

  /**
   * Listen for enter press on search bar
   */

  function toggleCart() {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  }

  function openCart() {
    setIsCartDrawerOpen(true);
  }

  function closeCart() {
    setIsCartDrawerOpen(false);
  }

  function openSignModal() {
    setOpenSignInModal('open_modal');
  }

  return (
    <div
      className={
        pathName === '/' || pathName === '/us/' || pathName === '/us' ? 'head-height-m home' : 'head-height-m other'
      }
    >
      {/* {console.log(props.location.pathname == "/" )} */}
      {allowHeader && (
        <div>
          <div key="0">
            <Cart
              showAnnouncementBar={showAnnouncementBar}
              checkoutLineItemsReplaceLoading={props.checkoutLineItemsReplaceLoading}
              createCheckoutMutation={props.createCheckoutMutation}
              getCheckoutQuery={props.getCheckoutQuery}
              isCartDrawerOpen={isCartDrawerOpen}
              openCart={openCart}
              closeCart={closeCart}
            />
          </div>
          <div key="1">
            {langState && (
              <LocationPopUp
                langState={langState}
                setLangState={setLangState}
                updateCheckoutCurrencyMutation={props.updateCheckoutCurrencyMutation}
              />
            )}
          </div>
          <div key="2">
            <div
              className={
                pathName === '/' || pathName === '/us/' || pathName === '/us'
                  ? 'header header-sticky home'
                  : 'header header-sticky other'
              }
            >
              <HeaderBar />
              <div className="header-wrapper custom_header" style={{ position: 'relative' }}>
                <div>
                  {mobileSearchState && (
                    <MobileSearchField
                      mobileSearchState={mobileSearchState}
                      setMobileSearchState={setMobileSearchState}
                    />
                  )}
                </div>

                <header className="site-header">
                  <div className="custom_con page-width">
                    <div className="header-layout">
                      <div className="header-item header-item-navigation">
                        <div>
                          <CustomAutocomplete />
                        </div>
                        <div
                          className="site-header-search mobile__search-icon"
                          onClick={() => {
                            setMobileSearchState(!mobileSearchState);
                          }}
                        >
                          <div
                            className="site-header-search mobile__search-icon"
                            onClick={() => {
                              setMobileSearchState(!mobileSearchState);
                            }}
                          >
                            <div className="inputWidthIcon" style={{ margin: '0' }}>
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.26351 2.26358C3.7232 0.803886 5.66394 0 7.72822 0C9.7925 0 11.7332 0.803886 13.1929 2.26358C14.6525 3.72324 15.4565 5.66398 15.4565 7.72822C15.4565 9.61552 14.7841 11.3993 13.5534 12.8068L17.8454 17.0989C18.0515 17.305 18.0515 17.6393 17.8454 17.8455C17.7423 17.9485 17.6072 18.0001 17.4721 18.0001C17.3371 18.0001 17.2019 17.9485 17.0989 17.8454L12.8068 13.5534C11.3993 14.7841 9.61552 15.4565 7.72822 15.4565C5.66391 15.4565 3.72324 14.6526 2.26354 13.1929C0.803885 11.7333 0 9.79253 0 7.72825C0 5.66398 0.80385 3.72324 2.26351 2.26358ZM3.01009 12.4464C5.6117 15.048 9.8447 15.048 12.4463 12.4464C15.0479 9.84481 15.0479 5.61173 12.4463 3.01016C11.1454 1.70923 9.43706 1.05898 7.72818 1.05898C6.01972 1.05898 4.3107 1.70955 3.01005 3.01016C0.408552 5.6117 0.40855 9.84477 3.01009 12.4464Z"
                                  fill="#4F5255"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="mobile__search-icon">
                          <Link
                            to="/wishlist"
                            className="site-nav-link-icon"
                            style={{ margin: '0 0 0 14px' }}
                            aria-label="Wishlist"
                          >
                            <div>
                              <svg
                                width="20"
                                height="18"
                                viewBox="0 0 20 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.6671 17.1277C10.2733 17.4562 9.69541 17.4562 9.30153 17.1277C6.53706 14.8222 0.294293 10.0639 1.06545 5.59283C1.616 2.18965 3.78149 1.04251 5.32302 1.00427C7.78706 0.911482 9.31462 2.35649 9.80858 2.91232C9.89915 3.01423 10.0695 3.01423 10.1601 2.91232C10.6541 2.35649 12.1816 0.911482 14.6456 1.00427C16.1872 1.04251 18.3527 2.18965 18.9399 5.59283C19.6776 10.064 13.4319 14.8223 10.6671 17.1277Z"
                                  stroke="#4F5255"
                                  strokeMiterlimit="10"
                                />
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="header-item header-item-logo">
                        <Link to="/" title="Gobi Cashmere Logo">
                          <LogoSvg></LogoSvg>
                        </Link>
                      </div>

                      <div className="header-item header-item-icons">
                        <div className="site-n">
                          <div className="site-nav-icons">
                            {props.customerAccessTokenObject.accessToken ? (
                              <div
                                className="header_login"
                              // onClick={openSignModal}
                              >
                                <Link to="/account">
                                  <span className="txt">Account</span>
                                </Link>
                              </div>
                            ) : (
                              <div className="header_login" onClick={openSignModal}>
                                <span className="txt">Sign in</span>
                              </div>
                            )}

                            <SigninPopup openSignInModal={openSignInModal} setOpenSignInModal={setOpenSignInModal} />
                            <div className="desktop__search-icon">
                              <Link
                                to="/wishlist"
                                className="site-nav-link-icon"
                                style={{ margin: '0 0 0 14px' }}
                                aria-label="Wishlist"
                              >
                                <div>
                                  <svg
                                    width="20"
                                    height="18"
                                    viewBox="0 0 20 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.6671 17.1277C10.2733 17.4562 9.69541 17.4562 9.30153 17.1277C6.53706 14.8222 0.294293 10.0639 1.06545 5.59283C1.616 2.18965 3.78149 1.04251 5.32302 1.00427C7.78706 0.911482 9.31462 2.35649 9.80858 2.91232C9.89915 3.01423 10.0695 3.01423 10.1601 2.91232C10.6541 2.35649 12.1816 0.911482 14.6456 1.00427C16.1872 1.04251 18.3527 2.18965 18.9399 5.59283C19.6776 10.064 13.4319 14.8223 10.6671 17.1277Z"
                                      stroke="#4F5255"
                                      strokeMiterlimit="10"
                                    />
                                  </svg>
                                </div>
                              </Link>
                            </div>

                            <a href="/cart">
                              <div className="header_cart">
                                <div className="cart-margin">
                                  <svg
                                    width="19"
                                    height="19"
                                    viewBox="0 0 16 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.9965 15.5595L15.0045 3.95332C14.9832 3.69566 14.7742 3.50056 14.5297 3.50056H11.4224C11.394 1.56437 9.87062 -4.95911e-05 8 -4.95911e-05C6.12938 -4.95911e-05 4.60596 1.56437 4.57762 3.50056H1.47028C1.22228 3.50056 1.01679 3.69566 0.995537 3.95332L0.0035429 15.5595C0.0035429 15.5742 0 15.5889 0 15.6036C0 16.9251 1.16559 18 2.60044 18H13.3996C14.8344 18 16 16.9251 16 15.6036C16 15.5889 16 15.5742 15.9965 15.5595ZM8 0.993815C9.34274 0.993815 10.4375 2.11283 10.4658 3.50056H5.53418C5.56253 2.11283 6.65726 0.993815 8 0.993815ZM13.3996 17.0061H2.60044C1.70056 17.0061 0.970738 16.3877 0.956566 15.6257L1.90605 4.49811H4.57408V6.00731C4.57408 6.28339 4.78665 6.50424 5.05236 6.50424C5.31807 6.50424 5.53064 6.28339 5.53064 6.00731V4.49811H10.4658V6.00731C10.4658 6.28339 10.6784 6.50424 10.9441 6.50424C11.2098 6.50424 11.4224 6.28339 11.4224 6.00731V4.49811H14.0904L15.0434 15.6257C15.0293 16.3877 14.2959 17.0061 13.3996 17.0061Z"
                                      fill="#4F5255"
                                    />
                                  </svg>
                                  {props.checkout &&
                                    props.checkout.lineItems &&
                                    props.checkout.lineItems.edges &&
                                    props.checkout.lineItems.edges.length ? (
                                    <div className="cart-link__bubble--visible">
                                      <span>{qtyCount()}</span>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </a>
                            <div
                              className="header_location"
                              onClick={() => {
                                setLangState(true);
                              }}
                            >
                              <div>
                                <svg
                                  width="16"
                                  height="18"
                                  viewBox="0 0 16 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15 7.36364C15 10.0228 13.2461 12.559 11.3902 14.4824C10.4731 15.4328 9.55415 16.2099 8.86391 16.7496C8.5192 17.0191 8.23255 17.2285 8.03305 17.37C8.02175 17.378 8.01073 17.3858 8 17.3934C7.98927 17.3858 7.97825 17.378 7.96695 17.37C7.76745 17.2285 7.4808 17.0191 7.13609 16.7496C6.44585 16.2099 5.52695 15.4328 4.60981 14.4824C2.75394 12.559 1 10.0228 1 7.36364C1 5.54628 1.73523 3.80146 3.04699 2.51354C4.35907 1.22532 6.14055 0.5 8 0.5C9.85945 0.5 11.6409 1.22532 12.953 2.51354C14.2648 3.80146 15 5.54628 15 7.36364Z"
                                    stroke="#4F5255"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M8 10C9.38071 10 10.5 8.88071 10.5 7.5C10.5 6.11929 9.38071 5 8 5C6.61929 5 5.5 6.11929 5.5 7.5C5.5 8.88071 6.61929 10 8 10Z"
                                    fill="#0083C3"
                                  />
                                </svg>
                              </div>
                              <span>United States</span>
                            </div>
                            <div className="header_mobileBtn">
                              <MobileMenu updateCheckoutCurrencyMutation={props.updateCheckoutCurrencyMutation} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="centered_menu">
                      <NavbarMenu />
                    </div>
                  </div>
                </header>
              </div>
            </div>
            <div className="header">{/* extra space for fixed */}</div>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    customerAccessTokenObject: state.customerAccessTokenObject,
    currency: state.currency,
    checkout: state.checkout,
  };
};
export default connect(mapStateToProps)(Header);
