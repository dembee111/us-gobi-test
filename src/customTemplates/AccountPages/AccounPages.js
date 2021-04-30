import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './AccountPage.scss';
import { useMutation } from '@apollo/client';
import MetaTags from 'react-meta-tags';
import { Link, navigate } from 'gatsby';
import AccountSideBar from '../AccountPages/AccountSideBar/AccountSideBar';
import useLoginHook from '../../hooks/useLoginHook';
import {
  customerAddressUpdate,
  customerUpdate,
  customerUpdateEmail,
  customerUpdateNewsletter,
} from '../../components/shared/mutation/mutation';
import store from '../../state/createStore';
import Swal from 'sweetalert2';

const mapStateToProps = (state) => ({
  customerAccessTokenObject: state.customerAccessTokenObject,
  customer: state.customer,
});

export default connect(mapStateToProps)((props) => {
  useLoginHook();
  const [tcModal, setTcModal] = useState('');

  const [changeAddressModalState, setChangeAddressModalState] = useState(false);
  const [changeEmailModalState, setChangeEmailModalState] = useState(false);
  const [changePasswordModalState, setChangePasswordModalState] = useState(false);

  // for validation
  const [openChangeAddress, setOpenChangeAddress] = useState(false);
  const [redBorderFirstname, setRedBorderFirstname] = useState(false);
  const [redBorderLastname, setRedBorderLastname] = useState(false);
  const [redBorderCompany, setRedBorderCompany] = useState(false);
  const [redBorderAddress, setRedBorderAddress] = useState(false);
  const [redBorderAddress2, setRedBorderAddress2] = useState(false);
  const [redBorderCity, setRedBorderCity] = useState(false);
  const [redBorderCountry, setRedBorderCountry] = useState(false);
  const [redBorderProvince, setRedBorderProvince] = useState(false);
  const [redBorderZip, setRedBorderZip] = useState(false);
  const [redBorderNewpassword, setRedBorderNewpassword] = useState(false);
  const [redBorderRepeatpassword, setRedBorderRepeatpassword] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openChangeEmail, setOpenChangeEmail] = useState(false);
  const [redBorderNewmail, setRedBorderNewmail] = useState(false);
  const [redBorderRepeatmail, setRedBorderRepeatmail] = useState(false);
  const [openChangeNewsletter, setOpenChangeNewsletter] = useState(false);
  const [checked, setChecked] = useState(props.customer.acceptsMarketing);
  const [defaultAddress, setDefaultAddress] = useState({
    address1: '',
    address2: '',
    firstName: '',
    lastName: '',
    company: '',
    city: '',
    zip: '',
    country: '---',
    province: '',
  });

  const [emptyDefault, setEmptyDefault] = useState(true);

  const [newEmail, setNewEmail] = useState({
    newEmail: '',
    repeatNewEmail: '',
  });

  const [newPassword, setNewPassword] = useState({
    newPassword: '',
    repeatNewPassword: '',
  });

  const [
    customerAddressUpdateQuery,
    { data: customerAddressUpdateData, error: customerAddressUpdateError },
  ] = useMutation(customerAddressUpdate);
  const [customerUpdateQuery, { data: customerUpdateData, error: customerUpdateError }] = useMutation(customerUpdate);
  const [customerUpdateEmailQuery, { data: customerUpdateEmailData, error: customerUpdateEmailError }] = useMutation(
    customerUpdateEmail,
  );

  const [
    customerUpdateNewsletterQuery,
    { data: customerUpdateNewsletterData, error: customerUpdateNewsletterError },
  ] = useMutation(customerUpdateNewsletter);

  useEffect(() => {
    if (props.customer.defaultAddress) {
      setEmptyDefault(false);
      setDefaultAddress({
        address1: props.customer.defaultAddress.address1 || '',
        address2: props.customer.defaultAddress.address2 || '',
        firstName: props.customer.defaultAddress.firstName || '',
        lastName: props.customer.defaultAddress.lastName || '',
        company: props.customer.defaultAddress.company || '',
        city: props.customer.defaultAddress.city || '',
        zip: props.customer.defaultAddress.zip || '',
        country: props.customer.defaultAddress.country || '---',
        province: props.customer.defaultAddress.province || '',
      });
    }
  }, [props.customer.defaultAddress]);

  function closeModal() {
    setChangePasswordModalState(false);
    setChangeEmailModalState(false);
    setChangeAddressModalState(false);
  }
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

  function handleChangeAddress() {
    if (
      defaultAddress.firstName !== '' ||
      defaultAddress.lastName !== '' ||
      defaultAddress.company !== '' ||
      defaultAddress.address1 !== '' ||
      defaultAddress.address2 !== '' ||
      defaultAddress.city !== '' ||
      defaultAddress.zip !== '' ||
      defaultAddress.country !== '' ||
      defaultAddress.province !== ''
    ) {
      customerAddressUpdateQuery({
        variables: {
          customerAccessToken: props.customerAccessTokenObject.accessToken,
          id: props.customer.defaultAddress.id,
          address: defaultAddress,
        },
      });
    } else {
      setRedBorderFirstname(true);
      setRedBorderLastname(true);
      setRedBorderCompany(true);
      setRedBorderAddress(true);
      setRedBorderAddress2(true);
      setRedBorderCity(true);
      setRedBorderCountry(true);
      setRedBorderProvince(true);
      setRedBorderZip(true);
    }
  }

  function handleChangeEmail() {
    if (newEmail.newEmail === '' || newEmail.repeatNewEmail === '') {
      setRedBorderNewmail(true);
      setRedBorderRepeatmail(true);
      setTimeout(() => {
        setRedBorderNewmail(false);
        setRedBorderRepeatmail(false);
      }, 3000);
    } else if (newEmail.newEmail !== newEmail.repeatNewEmail) {
      setRedBorderRepeatmail(true);
      setTimeout(() => {
        setRedBorderRepeatmail(false);
      }, 3000);
    } else {
      customerUpdateEmailQuery({
        variables: {
          customerAccessToken: props.customerAccessTokenObject.accessToken,
          customer: {
            email: newEmail.newEmail,
          },
        },
      });
    }
  }
  function handleChangePassword() {
    if (newPassword.newPassword === '' || newPassword.repeatNewPassword === '') {
      setRedBorderNewpassword(true);
      setRedBorderRepeatpassword(true);
      setTimeout(() => {
        setRedBorderNewpassword(false);
        setRedBorderRepeatpassword(false);
      }, 3000);
    } else if (newPassword.newPassword !== newPassword.repeatNewPassword) {
      setRedBorderRepeatpassword(true);
      setTimeout(() => {
        setRedBorderRepeatpassword(false);
      }, 3000);
    } else {
      customerUpdateQuery({
        variables: {
          customerAccessToken: props.customerAccessTokenObject.accessToken,
          customer: {
            password: newPassword.newPassword,
          },
        },
      });
    }
  }

  useEffect(() => {
    if (customerUpdateEmailError) {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        type: 'error',
        confirmButtonText: 'Close',
        text: 'Some Error Occured',
        footer: '',
      });
    }

    if (customerUpdateEmailData) {
      if (customerUpdateEmailData.customerUpdate.customerUserErrors.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          type: 'error',
          confirmButtonText: 'Close',
          text: `${customerUpdateEmailData.customerUpdate.customerUserErrors[0].message}`,
          footer: '',
        });
      } else {
        const clonedCustomer = JSON.parse(JSON.stringify(props.customer));
        clonedCustomer.email = newEmail.newEmail;
        store().dispatch({
          type: 'UPDATE_CUSTOMER',
          payload: {
            customer: clonedCustomer,
          },
        });
        setNewEmail({
          newEmail: '',
          repeatNewEmail: '',
        });
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          type: 'success',
          confirmButtonText: 'Close',
          text: 'Successfully changed your email',
          footer: '',
        });
      }
      setTimeout(() => {
        handleLogout();
      }, 3000);
    } else {
      return;
    }
  }, [customerUpdateEmailData, customerUpdateEmailError]);

  useEffect(() => {
    if (customerUpdateError) {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        type: 'error',
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
          type: 'error',
          confirmButtonText: 'Close',
          text: `${customerUpdateData.customerUpdate.customerUserErrors[0].message}`,
          footer: '',
        });
      } else {
        setNewPassword({
          newPassword: '',
          repeatNewPassword: '',
        });
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          type: 'success',
          confirmButtonText: 'Close',
          text: 'Successfully changed your password',
          footer: '',
        });
        setTimeout(() => {
          handleLogout();
        }, 3000);
      }
    } else {
      return;
    }
  }, [customerUpdateData, customerUpdateError]);

  useEffect(() => {
    if (customerAddressUpdateError) {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        type: 'error',
        confirmButtonText: 'Close',
        text: 'Some Error Occured',
        footer: '',
      });
    }
    if (customerAddressUpdateData) {
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        type: 'success',
        confirmButtonText: 'Close',
        text: 'Successfully changed your address',
        footer: '',
      });

      const clonedCustomer = JSON.parse(JSON.stringify(props.customer));
      const newDefault = {
        ...clonedCustomer.defaultAddress,
        ...defaultAddress,
      };

      if (newDefault.country === '---') {
        newDefault.province = '';
      }
      clonedCustomer.defaultAddress = newDefault;
      for (let singleAddress of clonedCustomer.addresses) {
        if (singleAddress.id === newDefault.id) {
          singleAddress = newDefault;
        }
      }
      // clonedCustomer = {};
      store().dispatch({
        type: 'UPDATE_CUSTOMER',
        payload: {
          customer: clonedCustomer,
        },
      });
      setChangeAddressModalState(false);
    }
  }, [customerAddressUpdateData, customerAddressUpdateError]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const whenFinish = (name) => {
    const number = "[^0-11]";
    const letters = "[^A-Za-z_][^A-Za-z_]+";
    const string = "[^A-Za-z_0-9_][^A-Za-z0-9]+";

    switch (name) {
      case "firstName":
        if (
          defaultAddress.firstName.match(letters) ||
          !defaultAddress.firstName
        ) {
          setRedBorderFirstname(true);
        } else {
          setRedBorderFirstname(false);
        }

        break;
      case "lastName":
        if (
          defaultAddress.lastName.match(letters) ||
          !defaultAddress.lastName
        ) {
          setRedBorderLastname(true);
        } else {
          setRedBorderLastname(false);
        }

        break;
      case "Company":
        if (defaultAddress.company.match(string) || !defaultAddress.company) {
          setRedBorderCompany(true);
        } else {
          setRedBorderCompany(false);
        }
        break;
      case "Address1":
        if (defaultAddress.address1.match(string) || !defaultAddress.address1) {
          setRedBorderAddress(true);
        } else {
          setRedBorderAddress(false);
        }
        break;
      case "Address2":
        if (defaultAddress.address2.match(string) || !defaultAddress.address2) {
          setRedBorderAddress2(true);
        } else {
          setRedBorderAddress2(false);
        }
        break;
      case "City":
        if (defaultAddress.city.match(letters) || !defaultAddress.city) {
          setRedBorderCity(true);
        } else {
          setRedBorderCity(false);
        }
        break;
      case "Country":
        if (defaultAddress.country.match(letters) || !defaultAddress.country) {
          setRedBorderCountry(true);
        } else {
          setRedBorderCountry(false);
        }
        break;
      case "Province":
        if (
          defaultAddress.province.match(letters) ||
          !defaultAddress.province
        ) {
          setRedBorderProvince(true);
        } else {
          setRedBorderProvince(false);
        }
        break;
      case "Zip":
        if (defaultAddress.zip.match(number) || !defaultAddress.zip) {
          setRedBorderZip(true);
        } else {
          setRedBorderZip(false);
        }
        break;
      case "Phone":
        if (defaultAddress.phone.match(number) || !defaultAddress.phone) {
          setRedBorderPhone(true);
        } else {
          setRedBorderPhone(false);
        }
        break;
      default:
    }
  };


  const changeCardPassword = () => {
    setOpenChangePassword(!openChangePassword);
  };

  const changeCardEmail = () => {
    setOpenChangeEmail(!openChangeEmail);
  };

  const changeCardNewsletter = () => {
    setOpenChangeNewsletter(!openChangeNewsletter);
  };



  function handleSub() {
    setChecked(!checked);
    if (checked === false) {
      customerUpdateNewsletterQuery({
        variables: {
          customerAccessToken: props.customerAccessTokenObject.accessToken,
          customer: {
            acceptsMarketing: true,
          },
        },
      });
    }
    if (checked === true) {
      customerUpdateNewsletterQuery({
        variables: {
          customerAccessToken: props.customerAccessTokenObject.accessToken,
          customer: {
            acceptsMarketing: false,
          },
        },
      });
    }
  }

  // for Newsletter
  useEffect(() => {
    if (customerUpdateNewsletterError) {
      Swal.fire({
        icon: "error",
        title: "Sorry",
        type: "error",
        confirmButtonText: "Close",
        text: "Some Error Occured",
        footer: "",
      });
    }
    if (customerUpdateNewsletterData) {
      if (
        customerUpdateNewsletterData.customerUpdate.customerUserErrors.length >
        0
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          type: 'error',
          confirmButtonText: 'Close',
          text: `${customerUpdateNewsletterData.customerUpdate.customerUserErrors[0].message}`,
          footer: '',
        });
      } else {
        const clonedCustomer = JSON.parse(JSON.stringify(props.customer));

        clonedCustomer.acceptsMarketing = checked;
        store().dispatch({
          type: "UPDATE_CUSTOMER",
          payload: {
            customer: clonedCustomer,
          },
        });
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          confirmButtonText: 'Close',
          text: 'Successfully changed your email Newsletter',
          footer: '',
        });
      }
    } else {
      return;
    }
  }, [customerUpdateNewsletterData, customerUpdateNewsletterError]);




  return [
    <section id="Profile" key={1}>
      <MetaTags key={0}>
        <title>THIS IS HOW WE PRODUCE YOUR CASHMERE!</title>
        <meta property="og:title" content="Premium Cashmere Brand - Gobi Cashmere " />
        <meta property="og:type" content="website" />
      </MetaTags>

      <div className="account-page">
        <AccountSideBar />
        <div className="account-main">
          <div className="grid small">
            <div className="tc-breadcrumb">
              <ul>
                <li>
                  <span className="p">My Account</span>
                </li>
              </ul>
            </div>
            {openChangeAddress ? (
              <div className="card">
                <div className="card-header">
                  <h1 className="tt bold uppercase">Change Address</h1>
                  <Link to="/account/addresses" className="link">
                    View All
                </Link>
                </div>
                <div className="card-body">
                  <div className="detail">
                    <div className="tc_row address">
                      <div className="list_add">
                        <div className="items">
                          <span className="sub_tt">First name</span>
                          <span>{defaultAddress.firstName}</span>
                        </div>
                        <div className="items">
                          <span className="sub_tt">Address 1</span>
                          <span>{defaultAddress.address1}</span>
                        </div>
                        {!emptyDefault && (
                          <div className="btn_list" onClick={() => setChangeAddressModalState(true)}>
                            <div className="edit">
                              <div className="icon">
                                <svg
                                  width="17"
                                  height="17"
                                  viewBox="0 0 17 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0)">
                                    <path
                                      d="M8.06982 3.4834H3.40316C3.04954 3.4834 2.7104 3.62387 2.46035 3.87392C2.2103 4.12397 2.06982 4.46311 2.06982 4.81673V14.1501C2.06982 14.5037 2.2103 14.8428 2.46035 15.0929C2.7104 15.3429 3.04954 15.4834 3.40316 15.4834H12.7365C13.0901 15.4834 13.4293 15.3429 13.6793 15.0929C13.9293 14.8428 14.0698 14.5037 14.0698 14.1501V9.4834"
                                      stroke="black"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M13.0698 2.48355C13.335 2.21833 13.6948 2.06934 14.0698 2.06934C14.4449 2.06934 14.8046 2.21833 15.0698 2.48355C15.335 2.74877 15.484 3.10848 15.484 3.48355C15.484 3.85862 15.335 4.21833 15.0698 4.48355L8.73649 10.8169L6.06982 11.4836L6.73649 8.81688L13.0698 2.48355Z"
                                      stroke="black"
                                      strokeWidth="1.33333"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0">
                                      <rect
                                        width="16"
                                        height="16"
                                        fill="white"
                                        transform="translate(0.736328 0.816406)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <span>Edit</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-header">
                  <h1 className="tt bold uppercase">Default Address</h1>
                  <Link to="/account/addresses" className="link">
                    View All
                </Link>
                </div>
                <div className="card-body">
                  <p className="p align-center">
                    This email will be used for accessing your private pages as well as for receiving correspondence and
                    newsletters.
                </p>
                  <div
                    className="onModal p btn"
                    onClick={() => {
                      setOpenChangeAddress(true);
                    }}
                  >
                    Create
                </div>
                </div>
              </div>
            )}

            {openChangeEmail ? (
              <div className="modal_body">
                <div className="card">
                  <div className="card-header">
                    <h1 className="tt bold uppercase">Change Email</h1>
                  </div>
                  <div className="card-body">
                    <div className="detail">
                      <div className="tc_row email">
                        <div className="form_grid">
                          <div className="form_group">
                            {/* <label htmlFor="nf_email">New Email</label> */}
                            <input
                              type="text"
                              className={`${redBorderNewmail === true ? 'invalid' : 'valid'} `}
                              placeholder="New Email"
                              // aria-label="First name"
                              onChange={(event) => {
                                setNewEmail({
                                  ...newEmail,
                                  ...{ newEmail: event.target.value },
                                });
                              }}
                            />
                            {redBorderNewmail && <span className="errorMessage ">Please new email</span>}
                          </div>
                          <div className="form_group">
                            {/* <label htmlFor="nf_pr_email">Repeat Email</label> */}
                            <input
                              type="email"
                              className={`${redBorderRepeatmail === true ? 'invalid' : 'valid'} `}
                              placeholder="Repeat Email"
                              // aria-label="Last name"
                              onChange={(event) => {
                                setNewEmail({
                                  ...newEmail,
                                  ...{ repeatNewEmail: event.target.value },
                                });
                              }}
                            />
                            {redBorderRepeatmail && <span className="errorMessage ">Please repeat email</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="btn_list">
                      <div className="p btn tc_black" onClick={handleChangeEmail}>
                        Change
                    </div>
                      <div className="p btn" onClick={changeCardEmail}>
                        Close
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-header">
                  <h1 className="tt bold uppercase">Main Email</h1>
                </div>
                <div className="card-body">
                  <p className="p align-center">
                    This email will be used for accessing your private pages as well as for receiving correspondence and
                    newsletters.
                </p>
                  <div className="onModal p btn" onClick={changeCardEmail}>
                    Change
                </div>
                </div>
              </div>
            )}

            {openChangePassword ? (
              <div className="card">
                <div className="card-header">
                  <h1 className="tt bold uppercase">Change Password</h1>
                </div>
                <div className="card-body">
                  <div className="detail">
                    <div className="tc_row email">
                      <div className="form_grid">
                        <div className="form_group">
                          <label htmlFor="nf_password">New Password</label>
                          <input
                            id="nf_password"
                            type="password"
                            className={`${redBorderNewpassword === true ? 'invalid' : 'valid'} `}
                            placeholder="New Password"
                            aria-label="First name"
                            onChange={(event) => {
                              setNewPassword({
                                ...newPassword,
                                ...{ newPassword: event.target.value },
                              });
                            }}
                          />
                          {redBorderNewpassword && <span className="errorMessage">Please new password</span>}
                        </div>
                        <div className="form_group">
                          <label htmlFor="nf_pr_password">Repeat Password</label>
                          <input
                            id="nf_pr_password"
                            type="password"
                            className={` ${redBorderRepeatpassword === true ? 'invalid' : 'valid'} `}
                            placeholder="Repeat Password"
                            aria-label="Last name"
                            onChange={(event) => {
                              setNewPassword({
                                ...newPassword,
                                ...{ repeatNewPassword: event.target.value },
                              });
                            }}
                          />
                          {redBorderRepeatpassword && (
                            <span className="errorMessage mt-2 ml-2">Please repeat password</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p align-center">This email will be used for accessing your private pages.</div>
                  </div>
                  <div className="btn_list">
                    <div className="p btn tc_black" onClick={handleChangePassword}>
                      Change
                  </div>
                    <div className="p btn" onClick={changeCardPassword}>
                      Close
                  </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-header">
                  <h1 className="tt bold uppercase">Password</h1>
                </div>
                <div className="card-body">
                  <div className="icon">
                    <svg width="41" height="17" viewBox="0 0 41 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.4284 7.76367H4.09505C3.35867 7.76367 2.76172 8.36063 2.76172 9.09701V13.7637C2.76172 14.5001 3.35867 15.097 4.09505 15.097H13.4284C14.1648 15.097 14.7617 14.5001 14.7617 13.7637V9.09701C14.7617 8.36063 14.1648 7.76367 13.4284 7.76367Z"
                        stroke="#4F5255"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.42871 7.76367V5.09701C5.42871 4.21295 5.7799 3.3651 6.40502 2.73998C7.03014 2.11486 7.87799 1.76367 8.76204 1.76367C9.6461 1.76367 10.4939 2.11486 11.1191 2.73998C11.7442 3.3651 12.0954 4.21295 12.0954 5.09701V7.76367"
                        stroke="#4F5255"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="24.2539" cy="9.76367" r="2" fill="#4F5255" />
                      <circle cx="31.2539" cy="9.76367" r="2" fill="#4F5255" />
                      <circle cx="38.2539" cy="9.76367" r="2" fill="#4F5255" />
                    </svg>
                  </div>
                  <p className="p align-center">
                    This email will be used for accessing your private pages as well as for receiving correspondence and
                    newsletters.
                </p>
                  <div className="onModal p btn" onClick={changeCardPassword}>
                    Change
                </div>
                </div>
              </div>
            )}
            {openChangeNewsletter ? (
              <div className="card">
                <div className="card-header">
                  <h1 className="tt bold uppercase">Newsletter</h1>
                </div>
                <div className="card-body">
                  <p className="p align-center">
                    This email will be used for accessing your private pages as well as for receiving correspondence and
                    newsletters.
                </p>
                  <div className="detail">
                    <div className="tc_row subscribe">
                      <div className="switch-button" style={{ color: 'white' }}>
                        <input
                          className="switch-button-checkbox"
                          style={{ color: 'white' }}
                          type="checkbox"
                          onChange={handleSub}
                          checked={checked}
                        />
                        <label className="switch-button-label" htmlFor="">
                          <span style={{ color: checked ? 'white' : 'black' }} className="switch-button-label-span">
                            Unsubscribe
                        </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <div className="btn_list">
                  <div
                    className="p btn"
                    type="checkbox"
                    onChange={handleSub}
                    checked={checked}
                  >
                    Close
                  </div>
                </div> */}
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-header">
                  <h1 className="tt bold uppercase">Newsletter Notifications</h1>
                </div>
                <div className="card-body">
                  <p className="email">{props.customer.email}</p>
                  <p className="p align-center">
                    This email will be used for accessing your private pages as well as for receiving correspondence and
                    newsletters.
                </p>
                  <div className="onModal p btn" onClick={changeCardNewsletter}>
                    Change
                </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={changeAddressModalState === true ? 'ac-tc_modal open' : 'ac-tc_modal'}>
          <div
            className="modal_back"
            onClick={() => {
              setChangeAddressModalState(false);
            }}
          ></div>
          <div className="modal_body">
            <div className="card pd_lg">
              <div className="card-header">
                <h1 className="tt bold uppercase">Add Address</h1>
              </div>
              <div className="card-body">
                <div className="detail">
                  <div className="tc_row add_address">
                    <div className="form_grid">
                      <div className="form_group">
                        <label htmlFor="addFirstName">First Name</label>
                        <input
                          style={{ marginTop: '5px' }}
                          placeholder="First name"
                          className={`${redBorderFirstname === true ? 'invalid' : 'valid'} `}
                          type="text"
                          value={defaultAddress.firstName}
                          onChange={(event) => {
                            setDefaultAddress({
                              ...defaultAddress,
                              ...{ firstName: event.target.value },
                            });
                          }}
                          onBlur={() => whenFinish('firstName')}
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="addLastName">Last Name</label>
                        <input
                          style={{ marginTop: '5px' }}
                          placeholder="Last name"
                          className={`${redBorderLastname === true ? 'invalid' : 'valid'} `}
                          type="text"
                          value={defaultAddress.lastName}
                          onChange={(event) => {
                            setDefaultAddress({
                              ...defaultAddress,
                              ...{ lastName: event.target.value },
                            });
                          }}
                          onBlur={() => whenFinish('lastName')}
                        />
                      </div>
                    </div>
                    <div className="form_group">
                      <label htmlFor="addCompany">Company</label>
                      <input
                        style={{ marginTop: '5px' }}
                        placeholder="Company"
                        className={`${redBorderCompany === true ? 'invalid' : 'valid'} `}
                        type="text"
                        value={defaultAddress.company}
                        onChange={(event) => {
                          setDefaultAddress({
                            ...defaultAddress,
                            ...{ company: event.target.value },
                          });
                        }}
                        onBlur={() => whenFinish('Company')}
                      />
                    </div>
                    <div className="form_group">
                      <label htmlFor="addAddress">Address</label>
                      <input
                        style={{ marginTop: '5px' }}
                        placeholder="Address1"
                        className={`${redBorderAddress === true ? 'invalid' : 'valid'} `}
                        type="text"
                        value={defaultAddress.address1}
                        onChange={(event) => {
                          setDefaultAddress({
                            ...defaultAddress,
                            ...{ address1: event.target.value },
                          });
                        }}
                        onBlur={() => whenFinish('Address1')}
                      />
                    </div>
                    <div className="form_group">
                      <label htmlFor="addAddressa">Address 2</label>
                      <input
                        style={{ marginTop: '5px' }}
                        placeholder="Address2"
                        className={`${redBorderAddress2 === true ? 'invalid' : 'valid'} `}
                        type="text"
                        value={defaultAddress.address2}
                        onChange={(event) => {
                          setDefaultAddress({
                            ...defaultAddress,
                            ...{ address2: event.target.value },
                          });
                        }}
                        onBlur={() => whenFinish('Address2')}
                      />
                    </div>
                    <div className="form_grid">
                      <div className="form_group">
                        <label htmlFor="addCity">City</label>
                        <input
                          style={{ marginTop: '5px' }}
                          placeholder="City"
                          className={`${redBorderCity === true ? 'invalid' : 'valid'} `}
                          type="text"
                          value={defaultAddress.city}
                          onChange={(event) => {
                            setDefaultAddress({
                              ...defaultAddress,
                              ...{ city: event.target.value },
                            });
                          }}
                          onBlur={() => whenFinish('City')}
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="addCountry">Country</label>
                        <input
                          style={{ marginTop: '5px' }}
                          placeholder="Country"
                          className={`${redBorderCountry === true ? 'invalid' : 'valid'} `}
                          type="country"
                          value={defaultAddress.country}
                          onChange={(event) => {
                            setDefaultAddress({
                              ...defaultAddress,
                              ...{ country: event.target.value },
                            });
                          }}
                          onBlur={() => whenFinish('Country')}
                        />
                      </div>
                    </div>
                    <div className="form_group">
                      <label htmlFor="addProvince">Province</label>
                      <input
                        style={{ marginTop: '5px' }}
                        placeholder="Province"
                        className={`${redBorderProvince === true ? 'invalid' : 'valid'} `}
                        type="text"
                        value={defaultAddress.province}
                        onChange={(event) => {
                          setDefaultAddress({
                            ...defaultAddress,
                            ...{ province: event.target.value },
                          });
                        }}
                        onBlur={() => whenFinish('Province')}
                      />
                    </div>
                    <div className="form_grid">
                      <div className="form_group">
                        <label htmlFor="addZip">Post/Zip Code</label>
                        <input
                          style={{ marginTop: '5px' }}
                          placeholder="Postal/Zip code"
                          className={`${redBorderZip === true ? 'invalid' : 'valid'} `}
                          type="number"
                          value={defaultAddress.zip}
                          onChange={(event) => {
                            setDefaultAddress({
                              ...defaultAddress,
                              ...{ zip: event.target.value },
                            });
                          }}
                          onBlur={() => whenFinish('Zip')}
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="addPhone">Phone</label>
                        <label
                          className="pr_phone_code_2"
                          htmlFor="pr_phone_code"
                        >
                          <p
                            style={{ marginLeft: "40px" }}
                          // style={{ marginTop: '5px', marginLeft: '40px' }}
                          >+1 </p>
                        </label>
                        <input
                          style={{ marginTop: '5px', paddingLeft: '80px' }}
                          id="pr_phone"
                          type="text"
                          value={defaultAddress.phone}
                          placeholder="Phone"
                          name="phone"
                          onChange={(event) => {
                            setDefaultAddress({
                              ...defaultAddress,
                              ...{ phone: event.target.value },
                            });
                          }}
                          maxLength="8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn_list address_section">
                  <div className="p btn tc_black" onClick={handleChangeAddress}>
                    CHANGE ADDRESS
                </div>
                  <div
                    className="p btn"
                    onClick={() => {
                      setChangeAddressModalState(false);
                    }}
                  >
                    Close
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={tcModal === 'email' ? 'ac-tc_modal open' : 'ac-tc_modal'}>
          <div
            className="modal_back"
            onClick={() => {
              setTcModal('');
            }}
          ></div>
          <div className="modal_body">
            <div className="card">
              <div className="card-header">
                <h1 className="tt bold uppercase">Change Email</h1>
              </div>
              <div className="card-body">
                <p className="p align-center">
                  Enter a new email address. Remember that you are also changing the username with which you enter
              </p>
                <div className="detail">
                  <div className="tc_row email">
                    <div className="form_grid">
                      <div className="form_group">
                        <label htmlFor="nf_email">New Email</label>
                        <input id="nf_email" type="text" placeholder="New Email" />
                      </div>
                      <div className="form_group">
                        <label htmlFor="nf_pr_email">Repeat Email</label>
                        <input id="nf_pr_email" type="text" placeholder="Repeat Email" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn_list">
                  <div className="p btn tc_black">Change</div>
                  <div
                    className="p btn"
                    onClick={() => {
                      setTcModal('');
                    }}
                  >
                    Close
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={tcModal === 'password' ? 'ac-tc_modal open' : 'ac-tc_modal'}>
          <div
            className="modal_back"
            onClick={() => {
              setTcModal('');
            }}
          ></div>
          <div className="modal_body">
            <div className="card">
              <div className="card-header">
                <h1 className="tt bold uppercase">Change Password</h1>
              </div>
              <div className="card-body">
                <div className="detail">
                  <div className="tc_row email">
                    <div className="form_grid">
                      <div className="form_group">
                        <label htmlFor="nf_password">New Password</label>
                        <input id="nf_password" type="text" placeholder="New Password" />
                      </div>
                      <div className="form_group">
                        <label htmlFor="nf_pr_password">Repeat Password</label>
                        <input id="nf_pr_password" type="text" placeholder="Repeat Password" />
                      </div>
                    </div>
                  </div>
                  <div className="p align-center">This email will be used for accessing your private pages.</div>
                </div>
                <div className="btn_list">
                  <div className="p btn tc_black">Change</div>
                  <div
                    className="p btn"
                    onClick={() => {
                      setTcModal('');
                    }}
                  >
                    Close
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={tcModal === 'newsletter' ? 'ac-tc_modal open' : 'ac-tc_modal'}>
          <div
            className="modal_back"
            onClick={() => {
              setTcModal('');
            }}
          ></div>
          <div className="modal_body">
            <div className="card">
              <div className="card-header">
                <h1 className="tt bold uppercase">Newsletter</h1>
              </div>
              <div className="card-body">
                <p className="p align-center">
                  This email will be used for accessing your private pages as well as for receiving correspondence and
                  newsletters.
              </p>
                <div className="detail">
                  <div className="tc_row subscribe">
                    <div className="subscribe_det">
                      <div className="click active">
                        <span>Unsubscribe</span>
                      </div>
                      <div className="click">
                        <span>Subscribe</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn_list">
                  <div
                    className="p btn"
                    onClick={() => {
                      setTcModal('');
                    }}
                  >
                    Close
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={tcModal === 'history' ? 'ac-tc_modal open' : 'ac-tc_modal'}>
          <div
            className="modal_back"
            onClick={() => {
              setTcModal('');
            }}
          ></div>
        </div>
      </div>
    </section>,
  ]
});
