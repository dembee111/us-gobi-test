import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import './RouletteMain.scss';
import CopyToClipboard from 'react-copy-to-clipboard';
export default (function GiftCodePop({ callBack, ...props }) {
  console.log('🚀 ~ file: GiftCodePop.js ~ line 6 ~ GiftCodePop ~ props', props);
  const [copySuccess, setCopySuccess] = useState('');

  let copyToClipBoard = () => {
    setCopySuccess('Copied!');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="spin-popup-section">
      <div className="spin-popup-bg" onClick={callBack}></div>
      <div className="spin-popup mobile-sec bg2">
        <div className="one-grid">
          <div className="detail-box">
            <div className="top-1">
              <p>You Have Won The</p>
            </div>
            <div className="top-2">
              <h1>{props.addText != null ? props.addText : props.data.text}</h1>
            </div>
            <div className="top-3">
              <p>{`Your ‘ ${props.data.text} ’ code:`}</p>
            </div>
            <div className="use-code">
              <p>Use code:</p>
              <div className="code-gen">
                {copySuccess === 'Copied!' ? <span style={{ color: 'green' }}>{copySuccess}</span> : props.coupon}
              </div>
            </div>
            <div className="alert">Copy code for use at checkout</div>
            <div className="product-btn-box">
              <CopyToClipboard onCopy={copyToClipBoard} text={props.coupon}>
                {props.copySuccess === 'Copied!' ? (
                  <button className="sin-btn-btn-copy" disabled>
                    {' '}
                    COPY CODE
                  </button>
                ) : (
                  <button className="sin-btn-btn-copy ">COPY CODE</button>
                )}
              </CopyToClipboard>{' '}
            </div>
            <div className="continue-shop">
              <Link to="/collections/holiday">Continue Shopping</Link>
            </div>
          </div>
        </div>
        <div className="spin-close-btn" onClick={callBack}>
          {/* <img
            src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_62_1.svg?v=1606092354"
            alt="Close Btn"
          ></img> */}
        </div>
      </div>
    </section>
  );
});
