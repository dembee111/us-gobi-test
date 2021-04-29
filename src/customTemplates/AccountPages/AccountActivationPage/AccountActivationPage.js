import React, { useEffect, useState } from 'react';
import './AccountActivationPage.scss';
import { useMutation } from '@apollo/client';
import { navigate } from 'gatsby';
import { customerActivate } from '../../../components/shared/mutation/mutation.js';

export default (function AccountActivationPage(props) {
  const [formField, setFormField] = useState({
    password: '',
    confirmPassword: '',
  });
  const [customerActivateQuery, { data: customerActivateData, error: customerActivateError }] = useMutation(
    customerActivate,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleConfirm() {
    if (
      formField.password === '' ||
      formField.confirmPassword === '' ||
      formField.password !== formField.confirmPassword
    ) {
      alert('Confirmation Password is not equal to Password');
      return;
    }
    let remainder = window.location.pathname.replace('/us/', '/');
    remainder = remainder.replace('/account/activate/', '');
    remainder = remainder.split('/');
    if (!remainder[0] || !remainder[1]) {
      alert('Auth is wrong');
      return;
    }
    let id = remainder[0];
    let token = remainder[1];

    customerActivateQuery({
      variables: {
        id: btoa(`gid://shopify/Customer/${id}`),
        input: {
          activationToken: token,
          password: formField.password,
        },
      },
    });
  }

  useEffect(() => {
    if (customerActivateError) {
      alert(customerActivateError);
    }
    if (customerActivateData) {
      if (customerActivateData.customerActivate.customerUserErrors.length > 0) {
        alert(customerActivateData.customerActivate.customerUserErrors[0].message);
      } else {
        alert('Successfully Activated Account');
        navigate('/account/login');
      }
    }
  }, [customerActivateData, customerActivateError]);

  return (
    <div className="passWordTokenRecoverMainPage">
      <div className="upperDiv">
        <h1>Activate account</h1>
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setFormField({
              ...formField,
              ...{ password: event.target.value },
            });
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(event) => {
            setFormField({
              ...formField,
              ...{ confirmPassword: event.target.value },
            });
          }}
        />
      </div>
      <div>
        <button aria-label="Reset Password" type="submit" className="btn btn--full" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
});
