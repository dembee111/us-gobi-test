import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, navigate } from 'gatsby';
import store from '../../../state/createStore';
import useLoginHook from '../../../hooks/useLoginHook';

const mapStateToProps = (state) => ({
  customerAccessTokenObject: state.customerAccessTokenObject,
  customer: state.customer,
});

export default connect(mapStateToProps)((props) => {
  useLoginHook();

  const [navExpand, setNavExpand] = useState('');

  const [clickedPage, setClickedPage] = useState([
    {
      label: 'My Account',
      link: '/account',
      icon: `
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.3171 14.2354V12.902C14.3171 12.1948 14.0361 11.5165 13.536 11.0164C13.0359 10.5163 12.3576 10.2354 11.6504 10.2354H6.31706C5.60981 10.2354 4.93154 10.5163 4.43144 11.0164C3.93134 11.5165 3.65039 12.1948 3.65039 12.902V14.2354" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.98307 7.56869C10.4558 7.56869 11.6497 6.37478 11.6497 4.90202C11.6497 3.42926 10.4558 2.23535 8.98307 2.23535C7.51031 2.23535 6.31641 3.42926 6.31641 4.90202C6.31641 6.37478 7.51031 7.56869 8.98307 7.56869Z" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>      
      `,
      checked: false,
      ignore: true,
    },
    {
      label: 'Account Settings',
      link: '/account/settings',
      icon: `
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
          <path d="M8.9834 10.2354C10.088 10.2354 10.9834 9.33992 10.9834 8.23535C10.9834 7.13078 10.088 6.23535 8.9834 6.23535C7.87883 6.23535 6.9834 7.13078 6.9834 8.23535C6.9834 9.33992 7.87883 10.2354 8.9834 10.2354Z" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.9171 10.2357C13.8283 10.4368 13.8018 10.6598 13.8411 10.8761C13.8803 11.0923 13.9834 11.2919 14.1371 11.449L14.1771 11.489C14.301 11.6128 14.3994 11.7599 14.4665 11.9218C14.5336 12.0836 14.5681 12.2571 14.5681 12.4323C14.5681 12.6076 14.5336 12.7811 14.4665 12.9429C14.3994 13.1048 14.301 13.2518 14.1771 13.3757C14.0532 13.4996 13.9062 13.598 13.7443 13.6651C13.5824 13.7322 13.4089 13.7667 13.2337 13.7667C13.0585 13.7667 12.885 13.7322 12.7231 13.6651C12.5613 13.598 12.4142 13.4996 12.2904 13.3757L12.2504 13.3357C12.0933 13.182 11.8937 13.0789 11.6774 13.0397C11.4612 13.0005 11.2381 13.0269 11.0371 13.1157C10.8399 13.2002 10.6717 13.3405 10.5533 13.5194C10.4348 13.6982 10.3712 13.9078 10.3704 14.1223V14.2357C10.3704 14.5893 10.2299 14.9284 9.97987 15.1785C9.72982 15.4285 9.39068 15.569 9.03706 15.569C8.68344 15.569 8.3443 15.4285 8.09425 15.1785C7.8442 14.9284 7.70372 14.5893 7.70372 14.2357V14.1757C7.69856 13.955 7.62714 13.741 7.49873 13.5615C7.37033 13.3819 7.19088 13.2452 6.98372 13.169C6.78265 13.0803 6.5596 13.0538 6.34333 13.093C6.12707 13.1322 5.92751 13.2353 5.77039 13.389L5.73039 13.429C5.60656 13.553 5.45951 13.6513 5.29764 13.7184C5.13578 13.7855 4.96228 13.8201 4.78706 13.8201C4.61184 13.8201 4.43833 13.7855 4.27647 13.7184C4.11461 13.6513 3.96755 13.553 3.84372 13.429C3.71976 13.3052 3.62141 13.1581 3.55431 12.9963C3.48721 12.8344 3.45268 12.6609 3.45268 12.4857C3.45268 12.3105 3.48721 12.137 3.55431 11.9751C3.62141 11.8132 3.71976 11.6662 3.84372 11.5423L3.88372 11.5023C4.03742 11.3452 4.14051 11.1457 4.17973 10.9294C4.21894 10.7131 4.19247 10.4901 4.10372 10.289C4.01922 10.0918 3.87889 9.92367 3.70003 9.80522C3.52117 9.68677 3.31158 9.6232 3.09706 9.62234H2.98372C2.6301 9.62234 2.29096 9.48187 2.04091 9.23182C1.79087 8.98177 1.65039 8.64263 1.65039 8.28901C1.65039 7.93539 1.79087 7.59625 2.04091 7.3462C2.29096 7.09615 2.6301 6.95568 2.98372 6.95568H3.04372C3.26439 6.95052 3.47839 6.87909 3.65792 6.75068C3.83745 6.62228 3.9742 6.44283 4.05039 6.23568C4.13913 6.0346 4.16561 5.81155 4.12639 5.59528C4.08718 5.37902 3.98408 5.17946 3.83039 5.02234L3.79039 4.98234C3.66642 4.85851 3.56808 4.71146 3.50098 4.5496C3.43388 4.38773 3.39934 4.21423 3.39934 4.03901C3.39934 3.86379 3.43388 3.69029 3.50098 3.52842C3.56808 3.36656 3.66642 3.21951 3.79039 3.09568C3.91422 2.97171 4.06127 2.87336 4.22314 2.80626C4.385 2.73917 4.5585 2.70463 4.73372 2.70463C4.90894 2.70463 5.08245 2.73917 5.24431 2.80626C5.40618 2.87336 5.55323 2.97171 5.67706 3.09568L5.71706 3.13568C5.87418 3.28937 6.07373 3.39247 6.29 3.43168C6.50626 3.47089 6.72931 3.44442 6.93039 3.35568H6.98372C7.1809 3.27117 7.34907 3.13085 7.46752 2.95199C7.58597 2.77313 7.64954 2.56353 7.65039 2.34901V2.23568C7.65039 1.88206 7.79087 1.54292 8.04092 1.29287C8.29096 1.04282 8.6301 0.902344 8.98372 0.902344C9.33735 0.902344 9.67648 1.04282 9.92653 1.29287C10.1766 1.54292 10.3171 1.88206 10.3171 2.23568V2.29568C10.3179 2.5102 10.3815 2.71979 10.4999 2.89865C10.6184 3.07751 10.7865 3.21784 10.9837 3.30234C11.1848 3.39109 11.4079 3.41756 11.6241 3.37835C11.8404 3.33913 12.0399 3.23604 12.1971 3.08234L12.2371 3.04234C12.3609 2.91838 12.5079 2.82003 12.6698 2.75293C12.8317 2.68583 13.0052 2.65129 13.1804 2.65129C13.3556 2.65129 13.5291 2.68583 13.691 2.75293C13.8528 2.82003 13.9999 2.91838 14.1237 3.04234C14.2477 3.16617 14.346 3.31323 14.4131 3.47509C14.4802 3.63695 14.5148 3.81046 14.5148 3.98568C14.5148 4.1609 14.4802 4.3344 14.4131 4.49626C14.346 4.65813 14.2477 4.80518 14.1237 4.92901L14.0837 4.96901C13.93 5.12613 13.8269 5.32569 13.7877 5.54195C13.7485 5.75821 13.775 5.98127 13.8637 6.18234V6.23568C13.9482 6.43286 14.0886 6.60102 14.2674 6.71947C14.4463 6.83792 14.6559 6.90149 14.8704 6.90234H14.9837C15.3373 6.90234 15.6765 7.04282 15.9265 7.29287C16.1766 7.54292 16.3171 7.88206 16.3171 8.23568C16.3171 8.5893 16.1766 8.92844 15.9265 9.17849C15.6765 9.42853 15.3373 9.56901 14.9837 9.56901H14.9237C14.7092 9.56987 14.4996 9.63343 14.3207 9.75188C14.1419 9.87033 14.0016 10.0385 13.9171 10.2357V10.2357Z" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="16" height="16" fill="white" transform="translate(0.983398 0.235352)"/>
          </clipPath>
          </defs>
        </svg>
      `,
      checked: false,
    },
    {
      label: 'Order History',
      link: '/account/orders',
      icon: `
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
          <path d="M10.3171 1.56836H4.98372C4.6301 1.56836 4.29096 1.70884 4.04091 1.95888C3.79087 2.20893 3.65039 2.54807 3.65039 2.90169V13.5684C3.65039 13.922 3.79087 14.2611 4.04091 14.5112C4.29096 14.7612 4.6301 14.9017 4.98372 14.9017H12.9837C13.3373 14.9017 13.6765 14.7612 13.9265 14.5112C14.1766 14.2611 14.3171 13.922 14.3171 13.5684V5.56836L10.3171 1.56836Z" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.3164 1.56836V5.56836H14.3164" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.6497 8.90234H6.31641" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.6497 11.5684H6.31641" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.64974 6.23535H6.98307H6.31641" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="16" height="16" fill="white" transform="translate(0.983398 0.235352)"/>
          </clipPath>
          </defs>
        </svg>
      `,
      checked: false,
    },
    {
      label: 'View Addresses',
      link: '/account/addresses',
      icon: `
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
          <path d="M14.9834 6.87988C14.9834 11.5465 8.9834 15.5465 8.9834 15.5465C8.9834 15.5465 2.9834 11.5465 2.9834 6.87988C2.9834 5.28858 3.61554 3.76246 4.74076 2.63724C5.86598 1.51202 7.3921 0.879883 8.9834 0.879883C10.5747 0.879883 12.1008 1.51202 13.226 2.63724C14.3513 3.76246 14.9834 5.28858 14.9834 6.87988Z" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.9834 8.87988C10.088 8.87988 10.9834 7.98445 10.9834 6.87988C10.9834 5.77531 10.088 4.87988 8.9834 4.87988C7.87883 4.87988 6.9834 5.77531 6.9834 6.87988C6.9834 7.98445 7.87883 8.87988 8.9834 8.87988Z" stroke="#4F5255" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="16" height="16" fill="white" transform="translate(0.983398 0.212891)"/>
          </clipPath>
          </defs>
        </svg>
      `,
      checked: false,
    },
  ]);

  function handleLogout() {
    store().dispatch({
      type: 'UPDATE_CUSTOMER',
      payload: {
        customer: {
          id: '',
          displayName: '',
          defaultAddress: {
            address1: '',
            address2: '',
          },
        },
      },
    });

    store().dispatch({
      type: 'CUSTOMERTOKEN_UPDATE',
      payload: {
        customerAccessTokenObject: {
          accessToken: '',
          expiresAt: '',
        },
      },
    });

    store().dispatch({ type: 'SIGN_OUT' });

    navigate('/');
  }

  function handleExpand() {
    if (navExpand === 'expand') {
      setNavExpand('');
    } else {
      setNavExpand('expand');
    }
  }

  function createMarkup(data) {
    return {
      __html: data,
    };
  }

  useEffect(() => {
    const clonedClickedPage = JSON.parse(JSON.stringify(clickedPage));
    let defaultChecker = false;
    for (const singleNavigation of clonedClickedPage) {
      if (!singleNavigation.ignore) {
        if (window.location.pathname.includes(singleNavigation.link)) {
          singleNavigation.checked = true;
          defaultChecker = true;
        } else {
          singleNavigation.checked = false;
        }
      }
    }
    if (!defaultChecker) {
      for (const singleNavigation of clonedClickedPage) {
        if (singleNavigation.ignore) {
          singleNavigation.checked = true;
        }
      }
    }
    setClickedPage(clonedClickedPage);
  }, []);

  return (
    <div className={`sidebar ${navExpand}`}>
      <div className="sidebar_nav desktop">
        <div className="side_header">
          <div className="img">
            <img
              src="https://cdn.shopify.com/s/files/1/0473/8377/3350/files/user.svg?v=1603937496"
              alt="Account Image"
            />
          </div>
          <div className="name">
            <p>{props.customer.displayName}</p>
          </div>
        </div>
        <div className="side_body">
          <ul>
            {clickedPage.map((item, index) => {
              let returnedData;
              if (item.checked) {
                returnedData = (
                  <li key={index} className="active">
                    <Link to={item.link} title={item.label}>
                      <div className="side_item">
                        {item.icon ? (
                          <div className="icon" dangerouslySetInnerHTML={createMarkup(item.icon)}></div>
                        ) : null}
                        <span className="tt">{item.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              } else {
                returnedData = (
                  <li key={index}>
                    <Link to={item.link} title={item.label}>
                      <div className="side_item">
                        {item.icon ? (
                          <div className="icon" dangerouslySetInnerHTML={createMarkup(item.icon)}></div>
                        ) : null}
                        <span className="tt">{item.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              }
              return returnedData;
            })}
            <li>
              <div className="side_item" onClick={handleLogout}>
                <div className="icon">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.9834 14.1904H4.31673C3.96311 14.1904 3.62397 14.05 3.37392 13.7999C3.12387 13.5499 2.9834 13.2107 2.9834 12.8571V3.52376C2.9834 3.17014 3.12387 2.831 3.37392 2.58095C3.62397 2.33091 3.96311 2.19043 4.31673 2.19043H6.9834"
                      stroke="#4F5255"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.6504 11.5241L14.9837 8.19076L11.6504 4.85742"
                      stroke="#4F5255"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.9834 8.19043H6.9834"
                      stroke="#4F5255"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="tt">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar_nav tablet">
        <div className="nav_btn" onClick={handleExpand}>
          <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.9199 10.9697C16.4722 10.9697 16.9199 11.4174 16.9199 11.9697C16.9199 12.522 16.4722 12.9697 15.9199 12.9697H1.91992C1.36764 12.9697 0.919922 12.522 0.919922 11.9697C0.919922 11.4174 1.36764 10.9697 1.91992 10.9697H15.9199ZM10.2949 5.96973C10.6401 5.96973 10.9199 6.41744 10.9199 6.96973C10.9199 7.52201 10.6401 7.96973 10.2949 7.96973H1.54492C1.19974 7.96973 0.919922 7.52201 0.919922 6.96973C0.919922 6.41744 1.19974 5.96973 1.54492 5.96973H10.2949ZM15.9199 0.969727C16.4722 0.969727 16.9199 1.41744 16.9199 1.96973C16.9199 2.52201 16.4722 2.96973 15.9199 2.96973H1.91992C1.36764 2.96973 0.919922 2.52201 0.919922 1.96973C0.919922 1.41744 1.36764 0.969727 1.91992 0.969727H15.9199Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="side_header">
          <div className="img">
            <img
              src="https://cdn.shopify.com/s/files/1/0473/8377/3350/files/user.svg?v=1603937496"
              alt="Account Image"
            />
          </div>
          <div className="name">
            <p>{props.customer.displayName}</p>
          </div>
        </div>
        <div className="side_body">
          <ul>
            {clickedPage.map((item, index) => {
              let returnedData;
              if (item.checked) {
                returnedData = (
                  <li key={index} className="active">
                    <Link to={item.link} title={item.label}>
                      <div className="side_item">
                        {item.icon ? (
                          <div className="icon" dangerouslySetInnerHTML={createMarkup(item.icon)}></div>
                        ) : null}
                        <span className="tt">{item.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              } else {
                returnedData = (
                  <li key={index}>
                    <Link to={item.link} title={item.label}>
                      <div className="side_item">
                        {item.icon ? (
                          <div className="icon" dangerouslySetInnerHTML={createMarkup(item.icon)}></div>
                        ) : null}
                        <span className="tt">{item.label}</span>
                      </div>
                    </Link>
                  </li>
                );
              }
              return returnedData;
            })}
          </ul>
          <div className="logout" onClick={handleLogout}>
            <div className="icon">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.9834 14.1904H4.31673C3.96311 14.1904 3.62397 14.05 3.37392 13.7999C3.12387 13.5499 2.9834 13.2107 2.9834 12.8571V3.52376C2.9834 3.17014 3.12387 2.831 3.37392 2.58095C3.62397 2.33091 3.96311 2.19043 4.31673 2.19043H6.9834"
                  stroke="#4F5255"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6504 11.5241L14.9837 8.19076L11.6504 4.85742"
                  stroke="#4F5255"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.9834 8.19043H6.9834"
                  stroke="#4F5255"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="tt">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
});
