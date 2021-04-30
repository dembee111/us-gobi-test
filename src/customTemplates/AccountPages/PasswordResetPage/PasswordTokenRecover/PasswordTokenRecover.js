import React, { useEffect, useState } from 'react';
import './PasswordTokenRecover.scss';
import { useMutation } from '@apollo/client';
import { navigate } from 'gatsby';
import { customerReset } from '../../../../components/shared/mutation/mutation.js';

export default (function PasswordTokenRecover(props) {
  const [formField, setFormField] = useState({
    password: '',
    confirmPassword: '',
  });
  const [customerResetQuery, { data: customerResetData, error: customerReseterror }] = useMutation(customerReset);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleRecovery() {
    if (
      formField.password === '' ||
      formField.confirmPassword === '' ||
      formField.password !== formField.confirmPassword
    ) {
      alert('Confirmation Password is not equal to Password');
      return;
    }

    let remainder = window.location.pathname.replace('/us/', '/');
    remainder = remainder.replace('/account/reset/', '');
    remainder = remainder.split('/');
    if (!remainder[0] || !remainder[1]) {
      alert('Auth is wrong');
      return;
    }
    let id = remainder[0];
    let token = remainder[1];

    customerResetQuery({
      variables: {
        id: btoa(`gid://shopify/Customer/${id}`),
        input: {
          resetToken: token,
          password: formField.password,
        },
      },
    });
  }

  useEffect(() => {
    if (customerReseterror) {
      alert(customerReseterror);
    }
    if (customerResetData) {
      if (customerResetData.customerReset.customerUserErrors.length > 0) {
        // alert("Error something happened");
        alert(customerResetData.customerReset.customerUserErrors[0].message);
      } else {
        alert('Successfully Changed Password');
        navigate('/account/login');
      }
    }
  }, [customerResetData, customerReseterror]);

  return (
    <div className="passWordTokenRecoverMainPage">
      <div className="upperDiv">
        <h1>Reset account password</h1>
        <p>Enter a new password</p>
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
        <button aria-label="Reset Password" type="submit" className="btn btn--full" onClick={handleRecovery}>
          Reset Password
        </button>
      </div>
    </div>
  );
});
