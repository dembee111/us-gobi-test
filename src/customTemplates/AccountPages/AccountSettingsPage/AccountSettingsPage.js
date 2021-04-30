import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import useLoginHook from '../../../hooks/useLoginHook';
import AccountMobileHeader from '../AccountMobileHeader/AccountMobileHeader';
import AccountSideBar from '../AccountSideBar/AccountSideBar';
import { customerAddressUpdate, customerUpdate } from '../../../components/shared/mutation/mutation.js';
import store from '../../../state/createStore';
import { navigate } from 'gatsby';
import Swal from 'sweetalert2';
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&^*+/=?^-`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const mapStateToProps = (state) => ({
  customerAccessTokenObject: state.customerAccessTokenObject,
  customer: state.customer,
});

export default connect(mapStateToProps)((props) => {
  useLoginHook();
  const [redBorderFirstname, setRedBorderFirstname] = useState(false);
  const [redBorderLastname, setRedBorderLastname] = useState(false);
  const [redBorderEmail, setRedBorderEmail] = useState(false);
  const [redBorderPhone, setRedBorderPhone] = useState(false);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [customerUpdateQuery, { data: customerUpdateData, error: customerUpdateError }] = useMutation(customerUpdate);

  function handleChangeProfile() {
    if (profile.firstName !== '' || profile.lastName !== '' || profile.email !== '') {
      customerUpdateQuery({
        variables: {
          customerAccessToken: props.customerAccessTokenObject.accessToken,
          customer: profile,
        },
      });
    } else {
      !profile.phone && setRedBorderPhone(true);
      !profile.email && setRedBorderEmail(true);
      !profile.firstName && setRedBorderFirstname(true);
      !profile.lastName && setRedBorderLastname(true);
      setTimeout(() => {
        setRedBorderPhone(false);
        setRedBorderEmail(false);
        setRedBorderFirstname(false);
        setRedBorderLastname(false);
      }, 3000);
      // alert("Please enter the same email");
    }
  }

  useEffect(() => {
    if (customerUpdateError) {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        confirmButtonText: 'Close',
        text: 'Some Error Occured',
        footer: '',
      });
    }

    if (customerUpdateData) {
      if (customerUpdateData.customerUpdate.customerUserErrors.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          confirmButtonText: 'Close',
          text: `${customerUpdateData.customerUpdate.customerUserErrors[0].message}`,
          footer: '',
        });
        setProfile({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
      } else {
        const clonedCustomer = JSON.parse(JSON.stringify(props.customer));
        clonedCustomer.email = profile.email;
        clonedCustomer.phone = profile.phone;
        clonedCustomer.displayName = profile.firstName + ' ' + profile.lastName;
        store().dispatch({
          type: 'UPDATE_CUSTOMER',
          payload: {
            customer: clonedCustomer,
          },
        });
        setProfile({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          confirmButtonText: 'Close',
          text: 'Successfully changed your email',
          footer: '',
        });
      }
    } else {
      return;
    }
  }, [customerUpdateData, customerUpdateError]);

  const whenFinish = (name) => {
    const number = '[^+0-9]';
    const letters = '[^A-Za-z_][^A-Za-z_]+';
    const string = '[^A-Za-z_0-9_][^A-Za-z0-9]+';

    switch (name) {
      case 'email':
        if (!emailRegex.test(profile.email) || !profile.email) {
          setRedBorderEmail(true);
        } else {
          setRedBorderEmail(false);
        }
        break;

      case 'firstName':
        if (profile.firstName.match(letters) || !profile.firstName) {
          setRedBorderFirstname(true);
        } else {
          setRedBorderFirstname(false);
        }

        break;
      case 'lastName':
        if (profile.lastName.match(letters) || !profile.lastName) {
          setRedBorderLastname(true);
        } else {
          setRedBorderLastname(false);
        }

        break;

      case 'Phone':
        if (profile.phone.match(number) || !profile.phone) {
          setRedBorderPhone(true);
        } else {
          setRedBorderPhone(false);
          let fPhone = '+46' + profile.phone;
          setProfile({
            ...profile,
            ...{ phone: fPhone },
          });
        }
        break;
      default:
        alert('no regonized');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return [
    <section id="Profile" key={1}>
      <div className="account-page">
        <AccountSideBar />
        <div className="account-main">
          <div className="grid small">
            <div className="tc-breadcrumb">
              <ul>
                <li>
                  <span className="p">Dashboard</span>
                </li>
                <li>
                  <span className="p">Profile</span>
                </li>
              </ul>
            </div>
            <div className="profile_form">
              <h1 className="tt bold uppercase full_w"> Profile</h1>
              <div className="profile_header">
                <div className="img">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0473/8377/3350/files/user.svg?v=1603937496"
                    alt="Account Image"
                  />
                </div>
                <div className="det">
                  <h1 className="bg_tt">{props.customer.displayName} </h1>
                  <span className="email_tt">{props.customer.email}</span>
                </div>
              </div>
              <div className="profile_body">
                <div className="tc_row">
                  <div className="form_group" style={{ marginBottom: redBorderFirstname ? '0' : '' }}>
                    <label htmlFor="pr_name">First Name</label>
                    <input
                      id="pr_name"
                      type="text"
                      className={`${redBorderFirstname === true ? 'invalid' : 'valid'} `}
                      placeholder="First Name"
                      value={profile.firstName}
                      name="firstName"
                      onChange={(event) => {
                        setProfile({
                          ...profile,
                          ...{ firstName: event.target.value },
                        });
                      }}
                      onBlur={() => whenFinish('firstName')}
                    />
                    {redBorderFirstname && <span className="errorMessage">Please this field only firstname</span>}
                  </div>
                  <div className="form_group" style={{ marginBottom: redBorderLastname ? '0' : '' }}>
                    <label htmlFor="pr_lname">Last Name</label>
                    <input
                      id="pr_lname"
                      type="text"
                      value={profile.lastName}
                      className={`${redBorderLastname === true ? 'invalid' : 'valid'} `}
                      placeholder="Last Name"
                      name="lastName"
                      onChange={(event) => {
                        setProfile({
                          ...profile,
                          ...{ lastName: event.target.value },
                        });
                      }}
                      onBlur={() => whenFinish('lastName')}
                    />
                    {redBorderLastname && <span className="errorMessage">Please this field only lastname</span>}
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="pr_email">Email</label>
                  <input
                    id="pr_email"
                    type="email"
                    value={profile.email}
                    className={`${redBorderEmail === true ? 'invalid' : 'valid'} `}
                    placeholder="Email"
                    name="email"
                    onChange={(event) => {
                      setProfile({
                        ...profile,
                        ...{ email: event.target.value },
                      });
                    }}
                    onBlur={() => whenFinish('email')}
                  />
                  {redBorderEmail && <span className="errorMessage">Please this field only email</span>}
                </div>
                <div className="form_group">
                  <label className="pr_phone_code" htmlFor="pr_phone_code">
                    <p>+1</p>
                  </label>
                  <input
                    id="pr_phone"
                    type="text"
                    value={profile.phone}
                    className={`pr_phone_input ${redBorderPhone === true ? 'invalid' : 'valid'} `}
                    placeholder="Phone"
                    name="phone"
                    onChange={(event) => {
                      setProfile({
                        ...profile,
                        ...{ phone: event.target.value },
                      });
                    }}
                    onBlur={() => whenFinish('Phone')}
                    maxLength="8"
                  />
                  {redBorderPhone && <span className="errorMessage">Please this field only Sweden phone number</span>}
                </div>
                <div className="btn_list">
                  <button className="update" onClick={handleChangeProfile}>
                    Update
                  </button>
                  <button>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>,
  ];
});
