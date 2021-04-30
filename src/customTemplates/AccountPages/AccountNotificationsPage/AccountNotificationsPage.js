import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import store from '../../../state/createStore';
import AccountSideBar from '../AccountSideBar/AccountSideBar';
import { customerUpdate } from '../../../components/shared/mutation/mutation.js';
import AccountMobileHeader from '../AccountMobileHeader/AccountMobileHeader';
import useLoginHook from '../../../hooks/useLoginHook';

const mapStateToProps = (state) => ({
  customerAccessTokenObject: state.customerAccessTokenObject,
  customer: state.customer,
});

export default connect(mapStateToProps)((props) => {
  useLoginHook();

  const [customerUpdateQuery, { data: customerUpdateData, error: customerUpdateError }] = useMutation(customerUpdate);

  function handleSub() {
    if (props.customer.acceptsMarketing) {
      customerUpdateQuery({
        variables: {
          customerAccessToken: props.customerAccessTokenObject.accessToken,
          customer: {
            acceptsMarketing: false,
          },
        },
      });
    } else {
      customerUpdateQuery({
        variables: {
          customerAccessToken: props.customerAccessTokenObject.accessToken,
          customer: {
            acceptsMarketing: true,
          },
        },
      });
    }
  }
  useEffect(() => {
    if (customerUpdateError) {
      console.log(customerUpdateError);
    }
    if (customerUpdateData) {
      const clonedCustomer = JSON.parse(JSON.stringify(props.customer));
      clonedCustomer.acceptsMarketing = !clonedCustomer.acceptsMarketing;
      store().dispatch({
        type: 'UPDATE_CUSTOMER',
        payload: {
          customer: clonedCustomer,
        },
      });
    }
  }, [customerUpdateData, customerUpdateError]);

  return [
    <section id="Profile" key={1}>
      <div className="account-page">
        <AccountSideBar />
      </div>
    </section>,
  ];
});
