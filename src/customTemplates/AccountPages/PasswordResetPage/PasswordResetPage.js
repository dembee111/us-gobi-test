import React, { useEffect, useState } from 'react';
import '../Style/auth.scss';
import { useMutation } from '@apollo/client';
import { Link } from 'gatsby';
import { customerRecover } from '../../../components/shared/mutation/mutation.js';
import LazyLoad from 'react-lazyload';
import AlertMessage from '../../../components/shared/AlertMessage';
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&^*+/=?^-`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const img1 = 'https://cdn.shopify.com/s/files/1/1953/2845/files/resizer.jpg?v=1600420934';
export default (function RegisterPage(props) {
  const [formField, setFormField] = useState({
    email: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageSuccess, setAlertMessageSuccess] = useState('');
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [redBorder, setRedBorder] = useState(false);
  const [customerRecoverQuery, { data: customerRecoverData, error: customerRecoverError }] = useMutation(
    customerRecover,
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (customerRecoverError) {
      console.log(customerRecoverError);
    }
    if (customerRecoverData) {
      if (customerRecoverData.customerRecover.customerUserErrors.length > 0) {
        setAlertMessage(customerRecoverData.customerRecover.customerUserErrors[0].message);
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      } else {
        setAlertMessageSuccess('Successfully Sent Recovey Email');
        setTimeout(() => {
          setAlertMessageSuccess('');
        }, 3000);
      }
    }
  }, [customerRecoverData, customerRecoverError]);

  function handleConfirm() {
    if (formField.email === '') {
      setAlertMessage('Empty email address');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    }
    if (emailRegex.test(formField.email)) {
      customerRecoverQuery({
        variables: {
          email: formField.email,
        },
      });
    } else {
      whenFinish();
      return;
    }
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
              <header className="section-header">
                <h1 className="section-header__title">Recovery Account</h1>
              </header>

              <div id="RecoverPasswordForm">
                <AlertMessage type={'danger'} message={alertMessage} />
                <AlertMessage type={'success'} message={alertMessageSuccess} />
                <form className="form-vertical">
                  <p style={{ textAlign: 'center', marginBottom: '10px' }}>
                    We will send you an email to reset your password.
                  </p>
                  <div>
                    <input
                      style={{ marginTop: '5px' }}
                      placeholder="Email address"
                      type="email"
                      name="customer[email]"
                      id="Email"
                      className={`input-full ${redBorder === true ? 'invalid' : 'valid'} `}
                      autoCorrect="off"
                      autoCapitalize="off"
                      onChange={(event) => {
                        setFormField({
                          ...formField,
                          ...{ email: event.target.value },
                        });
                      }}
                      onBlur={whenFinish}
                    />
                    {checkedEmail && <span className="errorMessage">Please this field only email address</span>}
                  </div>

                  <div className="txt">
                    <p>
                      By sign in, you agree to our <Link to="/pages/privacy-policy">Privacy Policy</Link> and{' '}
                      <Link to="/pages/terms-of-service">Terms & Conditions.</Link>
                    </p>
                  </div>
                  <div className="cus_btn">
                    <div onClick={handleConfirm} className="btn login_cus_btn">
                      Send
                    </div>
                  </div>
                </form>
              </div>
              <span className="req_tt">
                New user?{' '}
                <Link style={{ color: '#46A3F9', fontWeight: '600' }} to="/account/register">
                  {' '}
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
