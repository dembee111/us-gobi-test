import React, { useEffect, useState } from 'react';
import '../Style/auth.scss';
import { Link, navigate } from 'gatsby';
import { useLazyQuery, useMutation } from '@apollo/client';
import { connect } from 'react-redux';
import {
  customerAccessTokenCreate,
  checkoutCustomerAssociateV2,
  checkoutShippingAddressUpdateV2,
} from '../../../components/shared/mutation/mutation.js';
import { getCustomer } from '../../../components/shared/query/query.js';
import store from '../../../state/createStore';
import LazyLoad from 'react-lazyload';
const img1 = 'https://cdn.shopify.com/s/files/1/1953/2845/files/resizer.jpg?v=1600420934';
import AlertMessage from '../../../components/shared/AlertMessage';
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&^*+/=?^-`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const mapStateToProps = (state) => ({
  customerAccessTokenObject: state.customerAccessTokenObject,
  customer: state.customer,
});

export default connect(mapStateToProps)((props) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageSuccess, setAlertMessageSuccess] = useState('');
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [redBorder, setRedBorder] = useState(false);
  const [redBorderPassword, setRedBorderPassword] = useState(false);
  const [
    checkoutCustomerAssociateV2Mutation,
    { data: checkoutCustomerAssociateV2Data, error: checkoutCustomerAssociateV2Error },
  ] = useMutation(checkoutCustomerAssociateV2);
  const [checkoutShippingAddressUpdateV2Mutation, { }] = useMutation(checkoutShippingAddressUpdateV2);
  const [
    customerAccessTokenCreateQuery,
    { data: customerAccessTokenCreateData, error: customerAccessTokenCreateError },
  ] = useMutation(customerAccessTokenCreate);


  const [getCustomerQuery, { data: getCustomerData, error: getCustomerError }] = useLazyQuery(getCustomer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.customer && props.customer.id !== '') {
      navigate('/account');
    }
  }, []);

  function loginButtonClick(event) {
    if (loginEmail !== '' || loginPassword !== '') {
      customerAccessTokenCreateQuery({
        variables: {
          input: {
            email: loginEmail,
            password: loginPassword,
          },
        },
      });
    } else {
      setAlertMessage('Empty email or password field');
      setRedBorder(true);
      setRedBorderPassword(true);
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
    }
  }

  useEffect(() => {
    if (customerAccessTokenCreateError) {
      console.log(customerAccessTokenCreateError);
      return;
    }
    if (!customerAccessTokenCreateData) {
      return;
    }
    if (customerAccessTokenCreateData.customerAccessTokenCreate.customerUserErrors[0]) {
      setAlertMessage(customerAccessTokenCreateData.customerAccessTokenCreate.customerUserErrors[0].message);
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }

    store().dispatch({
      type: 'CUSTOMERTOKEN_UPDATE',
      payload: {
        customerAccessTokenObject: customerAccessTokenCreateData.customerAccessTokenCreate.customerAccessToken,
      },
    });
    getCustomerQuery({
      variables: {
        customerAccessToken: customerAccessTokenCreateData.customerAccessTokenCreate.customerAccessToken.accessToken,
      },
    });
  }, [customerAccessTokenCreateError, customerAccessTokenCreateData]);

  useEffect(() => {
    if (!getCustomerData) {
      return;
    }
    let tempArray = [];
    const clonedCustomer = JSON.parse(JSON.stringify(getCustomerData.customer));
    for (const singleEdge of clonedCustomer.addresses.edges) {
      tempArray.push(singleEdge.node);
    }
    clonedCustomer.addresses = tempArray;
    tempArray = [];
    for (const singleEdge of clonedCustomer.orders.edges) {
      tempArray.push(singleEdge.node);
    }
    clonedCustomer.orders = tempArray;
    store().dispatch({
      type: 'UPDATE_CUSTOMER',
      payload: {
        customer: clonedCustomer,
      },
    });
    checkoutCustomerAssociateV2Mutation({
      variables: {
        checkoutId: store().getState().checkout.id,
        customerAccessToken: store().getState().customerAccessTokenObject.accessToken,
        currencyCode: store().getState().currency.currencyCode,
      },
    });
    if (clonedCustomer.defaultAddress) {
      checkoutShippingAddressUpdateV2Mutation({
        variables: {
          checkoutId: store().getState().checkout.id,
          shippingAddress: {
            address1: clonedCustomer.defaultAddress.address1,
            address2: clonedCustomer.defaultAddress.address2,
            firstName: clonedCustomer.defaultAddress.firstName,
            lastName: clonedCustomer.defaultAddress.lastName,
            company: clonedCustomer.defaultAddress.company,
            city: clonedCustomer.defaultAddress.city,
            zip: clonedCustomer.defaultAddress.zip,
            country: clonedCustomer.defaultAddress.country,
            province: clonedCustomer.defaultAddress.province,
          },
        },
      });
    }
    store().dispatch({ type: 'SIGN_IN' });
    navigate('/account');
  }, [getCustomerData, getCustomerError]);

  const checkBoolen = (bol) => {
    if (bol === false) {
      setCheckedEmail(false);
      setRedBorder(false);
    } else {
      setCheckedEmail(true);
      setRedBorder(true);
      setTimeout(() => {
        setCheckedEmail(false);
      }, 3000);
    }
  };

  //
  const whenFinish = () => {
    if (emailRegex.test(loginEmail)) {
      checkBoolen(false);
    } else {
      checkBoolen(true);
    }
  };

  return (
    <div className="mainLoginRegisterPage">
      <div className="cus_sign_container">
        <div className="custom_signin">
          <div className="cus_page-content">
            <div className="cus_grid__item">
              <div className="login_img">
                <LazyLoad>
                  <img
                    srcSet={
                      '' +
                      img1.replace('.jpg', '_260x.jpg') +
                      ' 260w,' +
                      '' +
                      img1.replace('.jpg', '_390x.jpg') +
                      ' 390w,' +
                      '' +
                      img1.replace('.jpg', '_468x.jpg') +
                      ' 468w,' +
                      '' +
                      img1.replace('.jpg', '_560x.jpg') +
                      ' 560w,' +
                      '' +
                      img1.replace('.jpg', '_640x.jpg') +
                      ' 640w,' +
                      '' +
                      img1.replace('.jpg', '_750x.jpg') +
                      ' 750w,' +
                      '' +
                      img1.replace('.jpg', '_828x.jpg') +
                      ' 828w,' +
                      '' +
                      img1.replace('.jpg', '_1080x.jpg') +
                      ' 1080w,' +
                      '' +
                      img1.replace('.jpg', '_1280x.jpg') +
                      ' 1280w,' +
                      '' +
                      img1.replace('.jpg', '_1440x.jpg') +
                      ' 1440w,' +
                      '' +
                      img1.replace('.jpg', '_1680x.jpg') +
                      ' 1680w,' +
                      '' +
                      img1.replace('.jpg', '_1920x.jpg') +
                      ' 1920w,'
                    }
                    alt="recovery-photo"
                  ></img>
                </LazyLoad>
              </div>
            </div>
          </div>

          <div className="cus_page-content">
            <div className="cus_grid__item">
              <header className="section-header">
                <h1 className="section-header__title"> Sign In</h1>
              </header>

              <div id="CustomerLoginForm" className="form-vertical">
                <AlertMessage type={'danger'} message={alertMessage} />
                <AlertMessage type={'success'} message={alertMessageSuccess} />
                <form>
                  <div>
                    <input
                      placeholder="Email"
                      type="email"
                      name="customer[email]"
                      id="CustomerEmail"
                      className={`input-full ${redBorder === true ? 'invalid' : 'valid'} `}
                      value={loginEmail}
                      autoCorrect="off"
                      autoCapitalize="off"
                      autoFocus
                      onChange={(e) => {
                        setLoginEmail(e.target.value), setRedBorder(false);
                      }}
                      onBlur={whenFinish}
                      style={{ marginBottom: checkedEmail ? '6px' : '' }}
                    />
                    {checkedEmail && <span className="errorMessage">Please this field only email address</span>}
                  </div>

                  <div>
                    <input
                      placeholder="Password"
                      className={`${redBorderPassword === true ? 'invalid' : 'valid'} `}
                      value={loginPassword}
                      type="password"
                      name="customer[password]"
                      id="CustomerPassword"
                      onChange={(e) => {
                        setLoginPassword(e.target.value), setRedBorderPassword(false);
                      }}
                    />
                  </div>

                  <div className="group_grid">
                    <div className="checkbox">
                      <label className="checkbox_con">
                        Keep me signed in
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="recover_pass">
                      <Link to="/account/reset">Recover Password?</Link>
                    </div>
                  </div>

                  <div className="txt">
                    <p>
                      By sign in, you agree to our <Link to="/pages/privacy-policy">Privacy Policy</Link> and{' '}
                      <Link to="/pages/terms-of-service">Terms & Conditions.</Link>
                    </p>
                  </div>

                  <div className="cus_btn">
                    <button type="button" aria-label="Login" className="btn login_cus_btn" onClick={loginButtonClick}>
                      LOGIN
                    </button>
                  </div>
                </form>
              </div>
              <span className="req_tt">
                New user?{' '}
                <Link
                  style={{
                    color: '#46A3F9',
                    fontWeight: '600',
                  }}
                  to="/account/register"
                >
                  Create an account
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
