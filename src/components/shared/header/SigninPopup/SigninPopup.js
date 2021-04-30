import React, { useState, useEffect } from 'react';
import './SigninPopup.scss';
import { Link, navigate } from 'gatsby';
import LogoSvg from './../LogoSvg';
import { connect } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/client';
import store from '../../../../state/createStore';
import {
  customerAccessTokenCreate,
  checkoutCustomerAssociateV2,
  checkoutShippingAddressUpdateV2,
} from '../../../../components/shared/mutation/mutation.js';
import { getCustomer } from '../../../../components/shared/query/query.js';
import { customerCreate } from '../../../../components/shared/mutation/mutation.js';
import AlertMessage from '../../AlertMessage';
import Swal from 'sweetalert2';
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&^*+/=?^-`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const stringRegex = RegExp(/^[a-zA-Z0-9.!#$%&^*+/=?^-`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const NavbarMenu = (props) => {
  const [hideRegister, setHideRegister] = useState('');
  const [hideLogin, setLogin] = useState('hide_register');
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [redBorder, setRedBorder] = useState(false);
  const [redBorderPassword, setRedBorderPassword] = useState(false);
  const [registerEmailRedBorder, setRegisterEmailRedBorder] = useState(false);
  const [registerPasswordRedBorder, setRegisterPasswordRedBorder] = useState(false);
  const [genderChecked, setGenderChecked] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [firstNameBorder, setFirstNameBorder] = useState(false);
  const [lastNameBorder, setLastNameBorder] = useState(false);

  const [formField, setFormField] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    acceptsMarketing: false,
  });

  const [customerCreateQuery, { data: customerCreateData, error: customerCreateError }] = useMutation(customerCreate);

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

  function handleCreateAccount() {
    if (formField.email === '' || formField.password === '') {
      setAlertMessage('Sorry, Empty field');
      !formField.email && setRegisterEmailRedBorder(true);
      !formField.password && setRegisterPasswordRedBorder(true);
      !formField.lastName && setLastNameBorder(true);
      !formField.firstName && setFirstNameBorder(true);
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);

      return;
    }

    if (genderChecked === 0) {
      setAlertMessage('Please pick preferred gender');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);

      return;
    }
    customerCreateQuery({
      variables: {
        input: formField,
      },
    });
  }

  useEffect(() => {
    if (customerCreateError) {
      //alert('Error something happened');
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Error something happened',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    if (!customerCreateData) {
      return;
    }
    if (customerCreateData.customerCreate.customerUserErrors.length > 0) {
      const err1 = customerCreateData.customerCreate.customerUserErrors[0].message;
      setAlertMessage(err1);
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }
    // alert('Successfully created');
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Successfully created',
      showConfirmButton: false,
      timer: 2000,
    });
    closeSignModal();
    navigate('/');
  }, [customerCreateData, customerCreateError]);

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
      setAlertMessage('Incorrect username or password');
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

  function closeSignModal() {
    setLogin('hide_register');
    checkBoolen(false);
    setHideRegister('hide_login');
    setLoginEmail('');
    setLoginPassword('');
    setGenderChecked(0);
    setFormField({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      acceptsMarketing: false,
    });
    setRegisterEmailRedBorder(false);
    setRegisterPasswordRedBorder(false);
    setLastNameBorder(false);
    setFirstNameBorder(false);
    props.setOpenSignInModal('');
  }

  function openRegister() {
    setHideRegister('hide_register');
    setLogin('hide_login');
  }
  function openLogin() {
    setLogin('hide_register');
    setHideRegister('hide_login');
  }

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

  const checkBoolenSignup = (bol) => {
    if (bol === false) {
      setCheckedEmail(false);
      setRegisterEmailRedBorder(false);
    } else {
      setCheckedEmail(true);
      setRegisterEmailRedBorder(true);
      setTimeout(() => {
        setCheckedEmail(false);
      }, 3000);
    }
  };

  //
  const whenFinishSignup = () => {
    if (emailRegex.test(formField.email)) {
      checkBoolenSignup(false);
    } else {
      checkBoolenSignup(true);
    }
  };

  return (
    <div className={'tc_signModal ' + props.openSignInModal + ' ' + hideLogin} key="1">
      <div className="tc_modalBody">
        <div className="close_btn" onClick={closeSignModal}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 1L13 13" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="tc_logo">
          <Link to="/" title="Gobi Cashmere">
            <LogoSvg></LogoSvg>
          </Link>
        </div>
        <div className={'detail sign_in ' + hideLogin}>
          <h1 className="tt">Sign in</h1>
          <div className="tc_form-group">
            <AlertMessage type={'danger'} message={alertMessage} />
            <div>
              <div className="group">
                <label>Email</label>
                <input
                  className={`${redBorder === true ? 'invalid' : 'valid'} `}
                  type="email"
                  placeholder="Email address"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    setRedBorder(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                      loginButtonClick();
                    }
                  }}
                  onBlur={whenFinish}
                />
                <br />
                {checkedEmail && <span className="errorMessage">Please this field only email address</span>}
              </div>
              <div className="group">
                <label>password</label>
                <input
                  className={`${redBorderPassword === true ? 'invalid' : 'valid'} `}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setRedBorderPassword(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                      loginButtonClick();
                    }
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
              <div className="tc_btn">
                <button type="submit" value="Submit" onClick={loginButtonClick}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
          <div className="bottom_txt">
            <p>
              New user? <span onClick={openRegister}>Create an account</span>
            </p>
          </div>
        </div>
        <div className={'detail sign_up ' + hideRegister}>
          <h1 className="tt">Create Account</h1>
          <div className="tc_form-group">
            <AlertMessage type={'danger'} message={alertMessage} />
            <div>
              <div className="group">
                <label>First name:</label>
                <input
                  className={`${firstNameBorder === true ? 'invalid' : 'valid'} `}
                  value={formField.firstName}
                  type="text"
                  placeholder="First Name"
                  onChange={(event) => {
                    setFormField({
                      ...formField,
                      ...{ firstName: event.target.value },
                    }),
                      setFirstNameBorder(false);
                  }}
                />
              </div>
              <div className="group">
                <label>Last name:</label>
                <input
                  className={`${lastNameBorder === true ? 'invalid' : 'valid'} `}
                  value={formField.lastName}
                  type="text"
                  placeholder="Last Name"
                  onChange={(event) => {
                    setFormField({
                      ...formField,
                      ...{ lastName: event.target.value },
                    }),
                      setLastNameBorder(false);
                  }}
                />
              </div>
              <div className="group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formField.email}
                  className={`${registerEmailRedBorder ? 'invalid' : 'valid'} `}
                  placeholder="Email address"
                  onChange={(event) => {
                    setFormField({
                      ...formField,
                      ...{ email: event.target.value },
                    }),
                      setRegisterEmailRedBorder(false);
                  }}
                  onBlur={whenFinishSignup}
                />
                {checkedEmail && <span className="errorMessage">Please this field only email address</span>}
              </div>
              <div className="group">
                <label>Password:</label>
                <input
                  type="password"
                  value={formField.password}
                  className={`${registerPasswordRedBorder === true ? 'invalid' : 'valid'} `}
                  placeholder="Password"
                  onChange={(event) => {
                    setFormField({
                      ...formField,
                      ...{ password: event.target.value },
                    }),
                      setRegisterPasswordRedBorder(false);
                  }}
                />
              </div>
              <div className="gender_grid">
                <div
                  className={genderChecked === 1 ? 'gender checked' : 'gender'}
                  onClick={() => {
                    setGenderChecked(1);
                  }}
                >
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L5 9L13 1" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{`Women's Fashion`}</span>
                </div>
                <div
                  className={genderChecked === 2 ? 'gender checked' : 'gender'}
                  onClick={() => {
                    setGenderChecked(2);
                  }}
                >
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L5 9L13 1" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{`Men's Fashion`}</span>
                </div>
              </div>
              <div className="group_grid">
                <div className="checkbox">
                  <label className="checkbox_con">
                    By signing up, you will receive Gobi Cashmere offers, promotions and other commercial messages.
                    <input
                      type="checkbox"
                      onChange={(event) => {
                        setFormField({
                          ...formField,
                          ...{ acceptsMarketing: event.target.checked },
                        });
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="txt">
                <p>
                  By clicking ‘Create’ you agree to our <Link to="/pages/privacy-policy">Privacy Policy</Link> and{' '}
                  <Link to="/pages/terms-of-service">Terms & Conditions.</Link>
                </p>
              </div>
              <div className="tc_btn">
                <button type="submit" value="Submit" onClick={handleCreateAccount}>
                  Create
                </button>
              </div>
            </div>
          </div>
          <div className="bottom_txt">
            <p>
              Already have an account? <span onClick={openLogin}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
      <div className="tcBackdrop" onClick={closeSignModal}></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customerAccessTokenObject: state.customerAccessTokenObject,
  customer: state.customer,
});

export default connect(mapStateToProps)(NavbarMenu);
