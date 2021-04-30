import React, { useState, useEffect } from 'react';
import './NotifyWhenAvailable.scss';
import Icon from '../../../../components/shared/icon/icon';

export default function NotifyWhenAvailable(props) {
  const [variant, setVariant] = useState(undefined);
  const [isVariantDropdownOpen, setIsVariantDropdownOpen] = useState(false);
  const [variantDropdownStyle, setVariantDropdownStyle] = useState({});
  const [dropdownName, setDropdownName] = useState('dropdown-down');
  const [variantButtonStyle, setVariantButtonStyle] = useState({});
  const [emailId, setEmailId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState(undefined);
  const [responseStyle, setResponseStyle] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setResponseMessage('');
  }, []);

  useEffect(() => {
    setVariant(props.product.variants.edges[props.chosenSizeVariant]);
  }, [props.chosenSizeVariant]);

  function selectOption(variant) {
    setVariant(variant);
    closeVariantDropdown();
  }

  function closeVariantDropdown() {
    setIsVariantDropdownOpen(false);
  }

  function toggleVariantDropdown() {
    setIsVariantDropdownOpen(!isVariantDropdownOpen);
  }

  function handleChange(e) {
    setEmailId(e.target.value);
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function notifyMe() {
    if (validateEmail(emailId)) {
      setIsLoading(true);
      setResponseMessage('');
      const timezoneOffset = new Date().getTimezoneOffset();
      const Http = new XMLHttpRequest();
      const variantId = atob(variant.node.id).replace('gid://shopify/ProductVariant/', '');
      const url =
        `https://us-central1-shopify-webhook-e9cea.cloudfunctions.net/registerEmail?variantId=${variantId}&emailId=${encodeURIComponent(
          emailId,
        )}&region=` + 'EU';
      Http.open('POST', url);
      Http.send();

      Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
          setIsLoading(false);
          if (Http.status === 200 && Http.status < 300) {
            setResponseStatus('successful');
            setResponseMessage('Your Notification has been registered.');
          } else {
            setResponseStatus('unsuccessful');
            setResponseMessage('An unexpected error occurred. Please try again later.');
          }
        }
      };
    } else {
      setResponseStatus('unsuccessful');
      setResponseMessage('Please enter a valid email.');
    }
  }

  useEffect(() => {
    if (responseStatus === 'successful') {
      setResponseStyle({
        color: '#3C763D',
      });
    } else if (responseStatus === 'unsuccessful') {
      setResponseStyle({
        color: 'red',
      });
    }
  }, [responseStatus]);

  useEffect(() => {
    if (isVariantDropdownOpen) {
      setVariantDropdownStyle({
        display: 'block',
      });
      setDropdownName('dropdown-up');
      setVariantButtonStyle({ border: 'black 1px solid' });
    } else {
      setVariantDropdownStyle({
        display: 'none',
      });
      setDropdownName('dropdown-down');
      setVariantButtonStyle({ border: '#e3e3e3 1px solid' });
    }
  }, [isVariantDropdownOpen]);

  return props.isOpen ? (
    <div className="modal-notify-when-available">
      <div onClick={props.closeModal} id="notify-when-available-background" />
      <div className="modal-content-notify-when-available">
        <div className="modal-header-notify-when-available">
          <span onClick={props.closeModal} className="close-notify-when-available">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.7656 0.234597C15.4528 -0.078199 14.9472 -0.078199 14.6344 0.234597L8.0001 6.86892L1.36578 0.234597C1.05299 -0.078199 0.547393 -0.078199 0.234597 0.234597C-0.078199 0.547393 -0.078199 1.05299 0.234597 1.36578L6.86892 8.0001L0.234597 14.6344C-0.078199 14.9472 -0.078199 15.4528 0.234597 15.7656C0.390595 15.9216 0.595393 16 0.800191 16C1.00499 16 1.20979 15.9216 1.36578 15.7656L8.0001 9.13129L14.6344 15.7656C14.7904 15.9216 14.9952 16 15.2 16C15.4048 16 15.6096 15.9216 15.7656 15.7656C16.0784 15.4528 16.0784 14.9472 15.7656 14.6344L9.13129 8.0001L15.7656 1.36578C16.0784 1.05299 16.0784 0.547393 15.7656 0.234597Z"
                fill="black"
              />
            </svg>
          </span>
        </div>
        <div className="modal-body-notify-when-available">
          <h1 className="title">Notify When Available</h1>
          <h2 className="subtitle">{props.product.title}</h2>
          {variant
            ? [
                <div key="0" className="background" onClick={() => closeVariantDropdown()} />,
                <button
                  aria-label="Variant"
                  key="1"
                  className="variant-input rounded-edges"
                  value={variant.node.id}
                  onClick={() => toggleVariantDropdown()}
                  style={variantButtonStyle}
                >
                  {variant.node.title}
                  <Icon name={dropdownName} />
                </button>,
              ]
            : null}
          <div className="options" style={variantDropdownStyle}>
            {props.product &&
              props.product.variants.edges.map((singleVariant, index) => {
                if (!singleVariant.node.availableForSale) {
                  return (
                    <div
                      key={index}
                      className="option"
                      value={singleVariant.node.id}
                      onClick={() => selectOption(singleVariant)}
                    >
                      {singleVariant.node.title}
                    </div>
                  );
                }
              })}
          </div>
          <label>
            <input
              className="email-input rounded-edges"
              type="text"
              placeholder="Enter your email"
              name="name"
              value={emailId}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <button aria-label="Notify Me" className="notifyMeButton rounded-edges" onClick={() => notifyMe()}>
            {isLoading ? <div className="loader" /> : 'Notify Me'}
          </button>
          {responseStatus ? (
            <div style={responseStyle} className="response-message">
              {responseMessage}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
}
