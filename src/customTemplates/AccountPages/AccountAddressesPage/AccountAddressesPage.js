import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import AccountSideBar from '../AccountSideBar/AccountSideBar';
import AlertMessage from '../../../components/shared/AlertMessage';
import {
  customerAddressCreate,
  customerDefaultAddressUpdate,
  customerAddressDelete,
  customerAddressUpdate,
} from '../../../components/shared/mutation/mutation.js';
import store from '../../../state/createStore';
import AccountMobileHeader from '../AccountMobileHeader/AccountMobileHeader';
import useLoginHook from '../../../hooks/useLoginHook';
import Swal from 'sweetalert2';
const mapStateToProps = (state) => ({
  customerAccessTokenObject: state.customerAccessTokenObject,
  customer: state.customer,
});

export default connect(mapStateToProps)((props) => {
  useLoginHook();
  const [deteletModal, setdeleteModal] = useState(false);
  const [redBorderFirstname, setRedBorderFirstname] = useState(false);
  const [redBorderLastname, setRedBorderLastname] = useState(false);
  const [redBorderCompany, setRedBorderCompany] = useState(false);
  const [redBorderAddress, setRedBorderAddress] = useState(false);
  const [redBorderAddress2, setRedBorderAddress2] = useState(false);
  const [redBorderCity, setRedBorderCity] = useState(false);
  const [redBorderCountry, setRedBorderCountry] = useState(false);
  const [redBorderProvince, setRedBorderProvince] = useState(false);
  const [redBorderZip, setRedBorderZip] = useState(false);
  const [redBorderPhone, setRedBorderPhone] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [
    customerAddressCreateMutation,
    { data: customerAddressCreateData, error: customerAddressCreateError },
  ] = useMutation(customerAddressCreate);

  const [
    customerDefaultAddressUpdateMutation,
    { data: customerDefaultAddressUpdateData, error: customerDefaultAddressUpdateError },
  ] = useMutation(customerDefaultAddressUpdate);

  const [
    customerAddressUpdateMutation,
    { data: customerAddressUpdateData, error: customerAddressUpdateError },
  ] = useMutation(customerAddressUpdate);

  const [customerAddressDeleteMutation] = useMutation(customerAddressDelete);

  const [addAddressModalState, setAddAddressModalState] = useState(false);
  const [isInsertingAddressDefault, setIsInsertingAddressDefault] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: '',
    firstName: '',
    lastName: '',
    phone: '',
    province: '',
    zip: '',
  });

  const [changeAddressModalState, setChangeAddAddressModalState] = useState(false);
  const [isChangingAddressDefault, setIsChangingAddressDefault] = useState(false);
  const [changingId, setChangingId] = useState();
  const [changingAddress, setChangingAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: '',
    firstName: '',
    lastName: '',
    phone: '',
    province: '',
    zip: '',
  });
  function handleInsert(rowData) {
    setDefaultAddress({
      address1: '',
      address2: '',
      city: '',
      company: '',
      country: '',
      firstName: '',
      lastName: '',
      phone: '',
      province: '',
      zip: '',
    });
    setAddAddressModalState(true);
  }
  function handleEdit(rowData) {
    setChangingId(rowData.id);
    setChangingAddress({
      address1: rowData.address1,
      address2: rowData.address2,
      city: rowData.city,
      company: rowData.company,
      country: rowData.country,
      firstName: rowData.firstName,
      lastName: rowData.lastName,
      phone: rowData.phone,
      province: rowData.province,
      zip: rowData.zip,
    });
    setChangeAddAddressModalState(true);
  }

  function handleDelete(rowData) {
    customerAddressDeleteMutation({
      variables: {
        customerAccessToken: props.customerAccessTokenObject.accessToken,
        id: rowData.id,
      },
    }).then((result) => {
      const clonedCustomer = JSON.parse(JSON.stringify(props.customer));
      for (const [index, singleAddress] of clonedCustomer.addresses.entries()) {
        if (singleAddress.id === rowData.id) {
          clonedCustomer.addresses.splice(index, 1);
          break;
        }
      }
      store().dispatch({
        type: 'UPDATE_CUSTOMER',
        payload: {
          customer: clonedCustomer,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        type: 'success',
        confirmButtonText: 'Close',
        text: 'Successfully delete ',
        footer: '',
      });
    });
  }

  function closeModal() {
    setAddAddressModalState(false);
    setChangeAddAddressModalState(false);
  }
  function addAddress() {
    if (defaultAddress.company === '' || defaultAddress.country === '') {
      !defaultAddress.country && setRedBorderCountry(true);
      !defaultAddress.company && setRedBorderCompany(true);
      !defaultAddress.city && setRedBorderCity(true);
      !defaultAddress.zip && setRedBorderZip(true);
      !defaultAddress.address1 && setRedBorderAddress(true);
      !defaultAddress.address2 && setRedBorderAddress2(true);
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return;
    } else {
      customerAddressCreateMutation({
        variables: {
          customerAccessToken: props.customerAccessTokenObject.accessToken,
          address: defaultAddress,
        },
      });
    }
  }
  function changeAddress() {
    customerAddressUpdateMutation({
      variables: {
        customerAccessToken: props.customerAccessTokenObject.accessToken,
        id: changingId,
        address: changingAddress,
      },
    });
  }

  useEffect(() => {
    if (customerAddressUpdateError) {
      console.log(customerAddressUpdateError);
    }
    if (customerAddressUpdateData) {
      if (isChangingAddressDefault) {
        customerDefaultAddressUpdateMutation({
          variables: {
            customerAccessToken: props.customerAccessTokenObject.accessToken,
            addressId: customerAddressUpdateData.customerAddressUpdate.customerAddress.id,
          },
        });
        setChangeAddAddressModalState(false);
        const clonedCustomer = JSON.parse(JSON.stringify(props.customer));
        for (const singleAddress of clonedCustomer.addresses) {
          if (singleAddress.id === changingId) {
            singleAddress.address1 = changingAddress.address1;
            singleAddress.address2 = changingAddress.address2;
            singleAddress.city = changingAddress.city;
            singleAddress.company = changingAddress.company;
            singleAddress.country = changingAddress.country;
            singleAddress.firstName = changingAddress.firstName;
            singleAddress.lastName = changingAddress.lastName;
            singleAddress.phone = changingAddress.phone;
            singleAddress.province = changingAddress.province;
            singleAddress.zip = changingAddress.zip;
            clonedCustomer.defaultAddress = singleAddress;
          }
        }
        store().dispatch({
          type: 'UPDATE_CUSTOMER',
          payload: {
            customer: clonedCustomer,
          },
        });
      } else {
        setChangeAddAddressModalState(false);
        const clonedCustomer = JSON.parse(JSON.stringify(props.customer));
        for (const singleAddress of clonedCustomer.addresses) {
          if (singleAddress.id === changingId) {
            singleAddress.address1 = changingAddress.address1;
            singleAddress.address2 = changingAddress.address2;
            singleAddress.city = changingAddress.city;
            singleAddress.company = changingAddress.company;
            singleAddress.country = changingAddress.country;
            singleAddress.firstName = changingAddress.firstName;
            singleAddress.lastName = changingAddress.lastName;
            singleAddress.phone = changingAddress.phone;
            singleAddress.province = changingAddress.province;
            singleAddress.zip = changingAddress.zip;
          }
        }
        store().dispatch({
          type: 'UPDATE_CUSTOMER',
          payload: {
            customer: clonedCustomer,
          },
        });
      }
    }
  }, [customerAddressUpdateData, customerAddressUpdateError]);

  useEffect(() => {
    if (customerAddressCreateError) {
      Swal.fire({
        icon: 'error',
        title: 'Sorry',
        type: 'error',
        confirmButtonText: 'Close',
        text: 'Some Error Occured',
        footer: '',
      });
    }
    if (customerAddressCreateData) {
      if (
        customerAddressCreateData.customerAddressCreate.customerUserErrors &&
        customerAddressCreateData.customerAddressCreate.customerUserErrors.length > 0
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          type: 'error',
          confirmButtonText: 'Close',
          text: `${customerAddressCreateData.customerAddressCreate.customerUserErrors[0].message}`,
          footer: '',
        });
      } else {
        if (isInsertingAddressDefault) {
          setAddAddressModalState(false);
          store().dispatch({
            type: 'INSERT_ADDRESS_AND_DEFAULT',
            payload: {
              address: {
                ...defaultAddress,
                ...{
                  id: customerAddressCreateData.customerAddressCreate.customerAddress.id,
                },
              },
            },
          });
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            type: 'success',
            confirmButtonText: 'Close',
            text: 'Successfully changed your email',
            footer: '',
          });
          customerDefaultAddressUpdateMutation({
            variables: {
              customerAccessToken: props.customerAccessTokenObject.accessToken,
              addressId: customerAddressCreateData.customerAddressCreate.customerAddress.id,
            },
          });
        } else {
          setAddAddressModalState(false);
          store().dispatch({
            type: 'INSERT_ADDRESS',
            payload: {
              address: {
                ...defaultAddress,
                ...{
                  id: customerAddressCreateData.customerAddressCreate.customerAddress.id,
                },
              },
            },
          });
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            type: 'success',
            confirmButtonText: 'Close',
            text: 'Successfully save address',
            footer: '',
          });
        }

        setDefaultAddress({
          address1: '',
          address2: '',
          city: '',
          company: '',
          country: '',
          firstName: '',
          lastName: '',
          phone: '',
          province: '',
          zip: '',
        });
      }
    }
  }, [customerAddressCreateData, customerAddressCreateError]);

  const whenFinish = (name) => {
    const number = '[^0-10]';
    const letters = '[^A-Za-z_][^A-Za-z_]+';
    const string = '[^A-Za-z_0-9_][^A-Za-z0-9]+';

    switch (name) {
      case 'firstName':
        if (defaultAddress.firstName.match(letters) || !defaultAddress.firstName) {
          setRedBorderFirstname(true);
        } else {
          setRedBorderFirstname(false);
        }

        break;
      case 'lastName':
        if (defaultAddress.lastName.match(letters) || !defaultAddress.lastName) {
          setRedBorderLastname(true);
        } else {
          setRedBorderLastname(false);
        }

        break;
      case 'Company':
        if (defaultAddress.company.match(string) || !defaultAddress.company) {
          setRedBorderCompany(true);
        } else {
          setRedBorderCompany(false);
        }
        break;
      case 'Address1':
        if (defaultAddress.address1.match(string) || !defaultAddress.address1) {
          setRedBorderAddress(true);
        } else {
          setRedBorderAddress(false);
        }
        break;
      case 'Address2':
        if (defaultAddress.address2.match(string) || !defaultAddress.address2) {
          setRedBorderAddress2(true);
        } else {
          setRedBorderAddress2(false);
        }
        break;
      case 'City':
        if (defaultAddress.city.match(letters) || !defaultAddress.city) {
          setRedBorderCity(true);
        } else {
          setRedBorderCity(false);
        }
        break;
      case 'Country':
        if (defaultAddress.country.match(letters) || !defaultAddress.country) {
          setRedBorderCountry(true);
        } else {
          setRedBorderCountry(false);
        }
        break;
      case 'Province':
        if (defaultAddress.province.match(letters) || !defaultAddress.province) {
          setRedBorderProvince(true);
        } else {
          setRedBorderProvince(false);
        }
        break;
      case 'Zip':
        if (defaultAddress.zip.match(number) || !defaultAddress.zip) {
          setRedBorderZip(true);
        } else {
          setRedBorderZip(false);
        }
        break;
      case 'Phone':
        if (defaultAddress.phone.match(number) || !defaultAddress.phone) {
          setRedBorderPhone(true);
        } else {
          setRedBorderPhone(false);
        }
        break;
      default:
    }
  };

  return (
    <div key={2}>
      <section id="Profile">
        <div className="account-page">
          <AccountSideBar />
          <div className="account-main">
            <div className="grid full">
              <div className="tc-breadcrumb">
                <ul>
                  <li>
                    <span className="p">View Addresses</span>
                  </li>
                </ul>
              </div>
              <div className="big_card">
                <div className="card-header">
                  <h1 className="md_tt bold uppercase">View Addresses</h1>
                  <div className="btn_list">
                    <div className="add_btn" onClick={() => setAddAddressModalState(true)}>
                      <div className="icon">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.30127 3.53223V12.8656"
                            stroke="white"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.63477 8.19922H12.9681"
                            stroke="white"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span>Add Address</span>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {props.customer.addresses.length > 0 ? (
                    <>
                      <div className="cs_table">
                        <div className="head list_address">
                          <div className="list">
                            <h1 className="tt bold">Address</h1>
                          </div>
                          <div className="list">
                            <h1 className="tt bold">First Name</h1>
                          </div>
                          <div className="list">
                            <h1 className="tt bold">Last Name</h1>
                          </div>
                          <div className="list">
                            <h1 className="tt bold">Phone</h1>
                          </div>
                          <div className="list"></div>
                          <div className="list"></div>
                          <div className="list"></div>
                        </div>
                        {props.customer.addresses &&
                          props.customer.addresses.map((item, i) => (
                            <div className="tbody list_address" key={i}>
                              <div className="table_grid">
                                <div className="items">
                                  <span className="sub_tt">Address 1</span>
                                  <span>{item.address1}</span>
                                </div>
                                <div className="items">
                                  <span className="sub_tt">First name</span>
                                  <span>{item.firstName}</span>
                                </div>
                                <div className="items">
                                  <span className="sub_tt">Last name</span>
                                  <span>{item.lastName}</span>
                                </div>
                                <div className="items">
                                  <span className="sub_tt">Phone</span>
                                  <span>{item.phone}</span>
                                </div>
                                <div className="items flex">
                                  {props.customer.defaultAddress && item.id === props.customer.defaultAddress.id ? (
                                    <div className="unfulfilled">
                                      <span>default</span>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </div>
                                <div
                                  className="items flex"
                                  onClick={() => {
                                    setChangeAddAddressModalState(true), handleEdit(item);
                                  }}
                                >
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
                                <div className="items flex" onClick={() => handleDelete(item)}>
                                  <div className="delete">
                                    <div className="icon">
                                      <svg
                                        width="18"
                                        height="17"
                                        viewBox="0 0 18 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M2.94336 4.5127H4.28434H15.0122"
                                          stroke="#111111"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M6.29614 4.51237V3.17904C6.29614 2.82541 6.43742 2.48628 6.68891 2.23623C6.94039 1.98618 7.28147 1.8457 7.63712 1.8457H10.3191C10.6747 1.8457 11.0158 1.98618 11.2673 2.23623C11.5188 2.48628 11.6601 2.82541 11.6601 3.17904V4.51237M13.6715 4.51237V13.8457C13.6715 14.1993 13.5303 14.5385 13.2788 14.7885C13.0273 15.0386 12.6862 15.179 12.3306 15.179H5.62565C5.27 15.179 4.92892 15.0386 4.67743 14.7885C4.42595 14.5385 4.28467 14.1993 4.28467 13.8457V4.51237H13.6715Z"
                                          stroke="#111111"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M7.63721 7.8457V11.8457"
                                          stroke="#111111"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M10.3188 7.8457V11.8457"
                                          stroke="#111111"
                                          strokeWidth="1.33333"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                    <span>Delete</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="tc_Order-mobile">
                        <div className="table_header">
                          <span>My Addresses</span>
                        </div>
                        {props.customer &&
                          props.customer.addresses &&
                          props.customer.addresses.map((item, i) => (
                            <div className="table_grid address" key={i}>
                              <div className="detail">
                                <span className="sub_tt">Address 1</span>
                                <span className="address_txt">{item.address1}</span>
                              </div>

                              <div className="default">
                                {props.customer.defaultAddress && item.id === props.customer.defaultAddress.id ? (
                                  <div className="box">
                                    <span>default</span>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                              <div
                                className="tc_row"
                                onClick={() => {
                                  setChangeAddAddressModalState(true), handleEdit(item);
                                }}
                              >
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
                                  <span>edit</span>
                                </div>
                                <div
                                  className="delete"
                                  onClick={() => {
                                    handleDelete(item), setdeleteModal(true);
                                  }}
                                >
                                  <div className="icon">
                                    <svg
                                      width="18"
                                      height="17"
                                      viewBox="0 0 18 17"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2.94336 4.5127H4.28434H15.0122"
                                        stroke="#111111"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M6.29614 4.51237V3.17904C6.29614 2.82541 6.43742 2.48628 6.68891 2.23623C6.94039 1.98618 7.28147 1.8457 7.63712 1.8457H10.3191C10.6747 1.8457 11.0158 1.98618 11.2673 2.23623C11.5188 2.48628 11.6601 2.82541 11.6601 3.17904V4.51237M13.6715 4.51237V13.8457C13.6715 14.1993 13.5303 14.5385 13.2788 14.7885C13.0273 15.0386 12.6862 15.179 12.3306 15.179H5.62565C5.27 15.179 4.92892 15.0386 4.67743 14.7885C4.42595 14.5385 4.28467 14.1993 4.28467 13.8457V4.51237H13.6715Z"
                                        stroke="#111111"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M7.63721 7.8457V11.8457"
                                        stroke="#111111"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M10.3188 7.8457V11.8457"
                                        stroke="#111111"
                                        strokeWidth="1.33333"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </div>
                                  <span>Delete</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </>
                  ) : (
                    <AlertMessage
                      type={'warning'}
                      message="No Address Have been found"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={addAddressModalState === true ? 'ac-tc_modal open' : 'ac-tc_modal'}>
            <div
              className="modal_back"
              onClick={() => {
                setAddAddressModalState(false);
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
                            id="addFirstName"
                            type="text"
                            placeholder="First Name"
                            value={defaultAddress.firstName}
                            className={`${redBorderFirstname === true ? 'invalid' : 'valid'} `}
                            onChange={(event) =>
                              setDefaultAddress({
                                ...defaultAddress,
                                ...{ firstName: event.target.value },
                              })
                            }
                            onBlur={() => whenFinish('firstName')}
                          />
                        </div>
                        <div className="form_group">
                          <label htmlFor="addLastName">Last Name</label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={defaultAddress.lastName}
                            className={`${redBorderLastname === true ? 'invalid' : 'valid'} `}
                            onChange={(event) =>
                              setDefaultAddress({
                                ...defaultAddress,
                                ...{ lastName: event.target.value },
                              })
                            }
                            onBlur={() => whenFinish('lastName')}
                          />
                        </div>
                      </div>
                      <div className="form_group">
                        <label htmlFor="addCompany">Company</label>
                        <input
                          type="text"
                          placeholder="Company"
                          value={defaultAddress.company}
                          onChange={(event) =>
                            setDefaultAddress({
                              ...defaultAddress,
                              ...{ company: event.target.value },
                            })
                          }
                          onBlur={() => whenFinish('Company')}
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="addAddress">Address</label>
                        <input
                          type="text"
                          placeholder="Address"
                          value={defaultAddress.address1}
                          className={`${redBorderAddress === true ? 'invalid' : 'valid'} `}
                          onChange={(event) =>
                            setDefaultAddress({
                              ...defaultAddress,
                              ...{ address1: event.target.value },
                            })
                          }
                          onBlur={() => whenFinish('Address1')}
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="addAddressa">Address 2</label>
                        <input
                          type="text"
                          placeholder="Address 2"
                          value={defaultAddress.address2}
                          onChange={(event) =>
                            setDefaultAddress({
                              ...defaultAddress,
                              ...{ address2: event.target.value },
                            })
                          }
                        // onBlur={() => whenFinish('Address2')}
                        />
                      </div>
                      <div className="form_grid">
                        <div className="form_group">
                          <label htmlFor="addCity">City</label>
                          <input
                            type="text"
                            placeholder="City"
                            value={defaultAddress.city}
                            className={`${redBorderCity === true ? 'invalid' : 'valid'} `}
                            onChange={(event) =>
                              setDefaultAddress({
                                ...defaultAddress,
                                ...{ city: event.target.value },
                              })
                            }
                            onBlur={() => whenFinish('City')}
                          />
                        </div>
                        <div className="form_group">
                          <label htmlFor="addCountry">Country</label>
                          <input
                            type="text"
                            placeholder="Country"
                            value={defaultAddress.country}
                            className={`${redBorderCountry === true ? 'invalid' : 'valid'} `}
                            onChange={(event) =>
                              setDefaultAddress({
                                ...defaultAddress,
                                ...{ country: event.target.value },
                              })
                            }
                            onBlur={() => whenFinish('Country')}
                          />
                        </div>
                      </div>
                      <div className="form_group">
                        <label htmlFor="addProvince">Province</label>
                        <input
                          type="text"
                          placeholder="Province"
                          value={defaultAddress.province}
                          className={`${redBorderProvince === true ? 'invalid' : 'valid'} `}
                          onChange={(event) =>
                            setDefaultAddress({
                              ...defaultAddress,
                              ...{ province: event.target.value },
                            })
                          }
                          onBlur={() => whenFinish('Province')}
                        />
                      </div>
                      <div className="form_grid">
                        <div className="form_group">
                          <label htmlFor="addZip">Post/Zip Code</label>
                          <input
                            type="text"
                            placeholder="Post/Zip Code"
                            value={defaultAddress.zip}
                            className={`${redBorderZip === true ? 'invalid' : 'valid'} `}
                            onChange={(event) =>
                              setDefaultAddress({
                                ...defaultAddress,
                                ...{ zip: event.target.value },
                              })
                            }
                            onBlur={() => whenFinish('Zip')}
                          />
                        </div>
                        <div className="form_group">
                          <label htmlFor="addPhone">Phone</label>
                          <label className="pr_phone_code" htmlFor="pr_phone_code">
                            <p style={{ marginLeft: '40px' }}>+1</p>
                          </label>

                          <input
                            id="pr_phone"
                            type="text"
                            // value={profile.phone}
                            className={`pr_phone_input ${redBorderPhone === true ? 'invalid' : 'valid'} `}
                            placeholder="Phone"
                            name="phone"
                            onChange={(event) => {
                              setDefaultAddress({
                                ...defaultAddress,
                                ...{ phone: event.target.value },
                              });
                            }}
                            // onBlur={() => whenFinish('Phone')}
                            maxLength="10"
                          />
                          {redBorderPhone && (
                            <span className="errorMessage">Please this field only Sweden phone number</span>
                          )}
                        </div>
                      </div>
                      <div className="form_grid">
                        <div className="checkout_line">
                          <input
                            onChange={() => {
                              setIsInsertingAddressDefault(!isInsertingAddressDefault);
                            }}
                            style={{
                              width: 'fit-content',
                              border: '1px solid #D2DDEC',
                              borderRadius: '4px',
                              background: '#fff',
                              width: '24px',
                              height: '24px',
                            }}
                            type="checkbox"
                            id="scales"
                            name="scales"
                            checked={isInsertingAddressDefault}
                          />
                          <span>Set as default address</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn_list address_section">
                    <div className="p btn tc_black" onClick={addAddress}>
                      Add Address
                    </div>
                    <div
                      className="p btn"
                      onClick={() => {
                        setAddAddressModalState(false);
                      }}
                    >
                      Close
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={changeAddressModalState === true ? 'ac-tc_modal open' : 'ac-tc_modal'}>
            <div
              className="modal_back"
              onClick={() => {
                setChangeAddAddressModalState(false);
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
                            type="text"
                            placeholder="First Name"
                            value={changingAddress.firstName}
                            onChange={(event) => {
                              setChangingAddress({
                                ...changingAddress,
                                ...{ firstName: event.target.value },
                              });
                            }}
                          />
                        </div>
                        <div className="form_group">
                          <label htmlFor="addLastName">Last Name</label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={changingAddress.lastName}
                            onChange={(event) => {
                              setChangingAddress({
                                ...changingAddress,
                                ...{ lastName: event.target.value },
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form_group">
                        <label htmlFor="addCompany">Company</label>
                        <input
                          type="text"
                          placeholder="Company"
                          value={changingAddress.company}
                          onChange={(event) => {
                            setChangingAddress({
                              ...changingAddress,
                              ...{ company: event.target.value },
                            });
                          }}
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="addAddress">Address</label>
                        <input
                          type="text"
                          placeholder="Address"
                          value={changingAddress.address1}
                          onChange={(event) => {
                            setChangingAddress({
                              ...changingAddress,
                              ...{ address1: event.target.value },
                            });
                          }}
                        />
                      </div>
                      <div className="form_group">
                        <label htmlFor="addAddressa">Address 2</label>
                        <input
                          type="text"
                          placeholder="Address 2"
                          value={changingAddress.address2}
                          onChange={(event) => {
                            setChangingAddress({
                              ...changingAddress,
                              ...{ address2: event.target.value },
                            });
                          }}
                        />
                      </div>
                      <div className="form_grid">
                        <div className="form_group">
                          <label htmlFor="addCity">City</label>
                          <input
                            type="text"
                            placeholder="City"
                            value={changingAddress.city}
                            onChange={(event) => {
                              setChangingAddress({
                                ...changingAddress,
                                ...{ city: event.target.value },
                              });
                            }}
                          />
                        </div>
                        <div className="form_group">
                          <label htmlFor="addCountry">Country</label>
                          <input
                            type="text"
                            placeholder="Country"
                            value={changingAddress.country}
                            onChange={(event) => {
                              setChangingAddress({
                                ...changingAddress,
                                ...{ country: event.target.value },
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="form_group">
                        <label htmlFor="addProvince">Province</label>
                        <input
                          type="text"
                          placeholder="Province"
                          value={changingAddress.province}
                          onChange={(event) => {
                            setChangingAddress({
                              ...changingAddress,
                              ...{ province: event.target.value },
                            });
                          }}
                        />
                      </div>
                      <div className="form_grid">
                        <div className="form_group">
                          <label htmlFor="addZip">Post/Zip Code</label>
                          <input
                            type="text"
                            placeholder="Post/Zip Code"
                            value={changingAddress.zip}
                            onChange={(event) => {
                              setChangingAddress({
                                ...changingAddress,
                                ...{ zip: event.target.value },
                              });
                            }}
                          />
                        </div>
                        <div className="form_group">
                          <label htmlFor="addPhone">Phone</label>

                          <label className="pr_phone_code" htmlFor="pr_phone_code">
                            <p style={{ marginLeft: '40px' }}>+47</p>
                          </label>

                          <input
                            id="pr_phone"
                            type="text"
                            // value={profile.phone}
                            className={`pr_phone_input ${redBorderPhone === true ? 'invalid' : 'valid'} `}
                            placeholder="Phone"
                            name="phone"
                            value={changingAddress.phone}
                            onChange={(event) => {
                              setChangingAddress({
                                ...changingAddress,
                                ...{ phone: event.target.value },
                              });
                            }}
                            //onBlur={() => whenFinish('Phone')}
                            maxLength="10"
                          />
                        </div>
                      </div>
                      <div className="form_grid">
                        <div className="checkout_line">
                          <input
                            onChange={() => {
                              setIsChangingAddressDefault(!isChangingAddressDefault);
                            }}
                            style={{
                              width: 'fit-content',
                              border: '1px solid #D2DDEC',
                              borderRadius: '4px',
                              background: '#fff',
                              width: '24px',
                              height: '24px',
                            }}
                            type="checkbox"
                            id="scales"
                            name="scales"
                            checked={isChangingAddressDefault}
                          />
                          <span>Set as default address</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn_list address_section">
                    <div className="p btn tc_black" onClick={changeAddress}>
                      Add Address
                    </div>
                    <div
                      className="p btn"
                      onClick={() => {
                        setChangeAddAddressModalState(false);
                      }}
                    >
                      Close
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={deteletModal === true ? 'ac-tc_modal open' : 'ac-tc_modal'}>
            <div
              className="modal_back"
              onClick={() => {
                setdeleteModal(false);
              }}
            ></div>
            <div className="modal_body">
              <div className="card pd_lg">
                <div className="card-header">
                  <div className="delete_alert">
                    <div>
                      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12.1963 22.1914C17.7191 22.1914 22.1963 17.7143 22.1963 12.1914C22.1963 6.66856 17.7191 2.19141 12.1963 2.19141C6.67344 2.19141 2.19629 6.66856 2.19629 12.1914C2.19629 17.7143 6.67344 22.1914 12.1963 22.1914Z"
                          stroke="#776906"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.1963 16.1914V12.1914"
                          stroke="#776906"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.1963 8.19141H12.2063"
                          stroke="#776906"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>{' '}
                    <div> Are you sure?</div>
                  </div>
                </div>

                <div className="address_section">
                  <div className="p btn tc_black" onClick={() => setDeleteData(true)}>
                    {' '}
                    Ok
                  </div>
                  <div
                    className="p btn"
                    onClick={() => {
                      setdeleteModal(false);
                    }}
                  >
                    Close
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});
