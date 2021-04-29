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

  const [profileDropDownState, setProfileDropDownState] = useState(false);
  const [leftNavigationState, setLeftNavigationState] = useState(false);
  const [clickedPage, setClickedPage] = useState([
    {
      label: 'My Account',
      link: '/account',
      checked: false,
    },
    {
      label: 'Account Settings',
      link: '/account/settings',
      checked: false,
    },
    {
      label: 'Order History',
      link: '/account/orders',
      checked: false,
    },
    {
      label: 'View Addresses',
      link: '/account/addresses',
      checked: false,
    },
    {
      label: 'Notifications',
      link: '/account/notifications',
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

  useEffect(() => {
    const clonedClickedPage = JSON.parse(JSON.stringify(clickedPage));
    for (const singleNavigation of clonedClickedPage) {
      if (window.location.pathname.includes(singleNavigation.link)) {
        singleNavigation.checked = true;
      } else {
        singleNavigation.checked = false;
      }
    }
    setClickedPage(clonedClickedPage);
  }, []);

  return [<div key={0} className="mobileAccountHeaderFiller"></div>];
});
