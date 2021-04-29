import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, navigate } from 'gatsby';
import { customerCreate } from '../../../components/shared/mutation/mutation.js';
import '../Style/auth.scss';
import LazyLoad from 'react-lazyload';
const img1 = 'https://cdn.shopify.com/s/files/1/1953/2845/files/resizer.jpg?v=1600420934';
import AlertMessage from '../../../components/shared/AlertMessage';
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&^*+/=?^-`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export default (function RegisterPage(props) {
  const [genderChecked, setGenderChecked] = useState(0);
  const [firstNameBorder, setFirstNameBorder] = useState(false);
  const [lastNameBorder, setLastNameBorder] = useState(false);
  const [registerEmailRedBorder, setRegisterEmailRedBorder] = useState(false);
  const [registerPasswordRedBorder, setRegisterPasswordRedBorder] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageSuccess, setAlertMessageSuccess] = useState('');
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [formField, setFormField] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [customerCreateQuery, { data: customerCreateData, error: customerCreateError }] = useMutation(customerCreate);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      setAlertMessage('Error something happened');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }
    if (!customerCreateData) {
      return;
    }
    if (customerCreateData.customerCreate.customerUserErrors.length > 0) {
      setAlertMessage(customerCreateData.customerCreate.customerUserErrors[0].message);
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }
    navigate('/account/login');
  }, [customerCreateData, customerCreateError]);

  const checkBoolen = (bol) => {
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
  const whenFinish = () => {
    if (emailRegex.test(formField.email)) {
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
              <header className="section-header" style={{ marginBottom: '0px' }}>
                <h1 className="section-header__title" style={{ paddingBottom: alertMessage ? '5px' : '16px' }}>
                  {' '}
                  CREATE ACCOUNT
                </h1>
              </header>

              <div id="CustomerLoginForm" className="form-vertical">
                <AlertMessage type={'danger'} message={alertMessage} />
                <AlertMessage type={'success'} message={alertMessageSuccess} />
                <form id="create_customer">
                  <input
                    placeholder="First Name"
                    type="text"
                    name="customer[first_name]"
                    id="FirstName"
                    className={`input-full ${firstNameBorder === true ? 'invalid' : 'valid'} `}
                    value={formField.firstName}
                    autoCapitalize="words"
                    autoFocus=""
                    onChange={(event) => {
                      setFormField({
                        ...formField,
                        ...{ firstName: event.target.value },
                      }),
                        setFirstNameBorder(false);
                    }}
                  />

                  <input
                    placeholder="Last Name"
                    type="text"
                    name="customer[last_name]"
                    id="LastName"
                    className={`input-full ${lastNameBorder === true ? 'invalid' : 'valid'} `}
                    value={formField.lastName}
                    autoCapitalize="words"
                    onChange={(event) => {
                      setFormField({
                        ...formField,
                        ...{ lastName: event.target.value },
                      }),
                        setLastNameBorder(false);
                    }}
                  />

                  <input
                    placeholder="Email"
                    type="email"
                    name="customer[email]"
                    id="Email"
                    className={`input-full ${registerEmailRedBorder ? 'invalid' : 'valid'} `}
                    value={formField.email}
                    autoCorrect="off"
                    autoCapitalize="off"
                    onChange={(event) => {
                      setFormField({
                        ...formField,
                        ...{ email: event.target.value },
                      }),
                        setRegisterEmailRedBorder(false);
                    }}
                    onBlur={whenFinish}
                    style={{ marginBottom: checkedEmail ? '6px' : '' }}
                  />
                  {checkedEmail && <span className="errorMessage">Please this field only email address</span>}
                  <div className="form-group">
                    <input
                      placeholder="Password"
                      type="password"
                      name="customer[password]"
                      id="CreatePassword"
                      value={formField.password}
                      className={`input-full sh_ps ${registerPasswordRedBorder === true ? 'invalid' : 'valid'} `}
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

                  <div className="txt">
                    <p>
                      By sign in, you agree to our <Link to="/pages/privacy-policy">Privacy Policy</Link> and{' '}
                      <Link to="/pages/terms-of-service">Terms & Conditions.</Link>
                    </p>
                  </div>
                  <div className="cus_btn">
                    <div onClick={handleCreateAccount} className="btn login_cus_btn">
                      Create
                    </div>
                  </div>
                </form>
              </div>
              <span className="req_tt">
                Already have an account?{' '}
                <Link style={{ color: '#46A3F9', fontWeight: '600' }} to="/account/login">
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
