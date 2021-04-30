import React, { useState } from 'react';
import './shippStyle.scss';
import EmailSend from '../EmailSend/EmailSend';
import ShippSlider from './ShippSlide';
import { Link } from 'gatsby';
import _ from 'lodash';
import moment from 'moment';
import { giftBox } from './data';
import CopyBtn from '../copyBtn/copyBtn';
import ProductData from '../ProductData/ProductData';
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&^*+/=?^-`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
export default function Shipp() {
  let mnt = moment().format();
  // let Selectday = moment(mnt).format('D');
  let Selectday = '21';
  const [addToCart, setAddToCard] = useState(false);
  const [state, setState] = useState({
    email: null,
    isChecked: false,
    onClick: null,
    text: null,
    formErrors: {
      email: '',
      isChecked: '',
    },
  });

  let toggleChange = () => {
    setState({ ...state, isChecked: !state.isChecked });
  };

  let getData = (data) => {
    let arr = [];
    data.map((item) => {
      arr.push(getTest(item.day));
    });
    return arr;
  };

  let getTest = (day) => {
    if (day === Selectday) {
      var data1 = _.find(giftBox, function (o) {
        return o.day == day;
      });
      return data1.handle;
    }
  };

  let handleSubmit = (e) => {
    let handle = getData(giftBox);
    let handleList =
      handle[0] === undefined
        ? handle[1] === undefined
          ? handle[2] === undefined
            ? handle[3] === undefined
              ? ''
              : handle[3]
            : handle[2]
          : handle[1]
        : handle[0];

    // console.log('handleList', handleList);
    e.preventDefault();
    setState({ ...state, onClick: 'on' });
    if (state.email && state.isChecked) {
      setState({ ...state, text: handleList });
    }
  };

  let handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = state.formErrors;
    switch (name) {
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
        break;
      default:
        break;
    }
    setState({ ...state, formErrors, [name]: value });
  };

  let AddToCard = (data) => {
    if (data) {
      setAddToCard(true);
    }
  };

  const [copySuccess, setCopySuccess] = useState('');
  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('');
    }
  };

  const [codeList, setCodeList] = useState({
    code: [
      { day: '7', code: '2ADVENT1-BOX' },
      { day: '14', code: '3ADVENT14-BOX' },
      { day: '21', code: '4ADVENT01-BOX' },
    ],
  });
  return (
    <div>
      {state.text === null ? (
        <div className="shipp-container">
          <div className="shipp-title">
            Today Prize<span>Gift Box</span>
          </div>
          <EmailSend
            handleSubmit={handleSubmit}
            formErrors={state.formErrors}
            handleChange={handleChange}
            toggleChange={toggleChange}
          />
          <div className="btn-text">
            <p> Spielen Sie gleich mit und gewinnen Sie Ihren Preis! Bis zu 50% Rabatt auf unser Produkt der Woche.</p>
          </div>
        </div>
      ) : addToCart === false ? (
        <div className="shippSlider-container">
          <ProductData handle={state.text} AddToCard={AddToCard} />
          {/* <ShippSlider Selectday={Selectday} handle={state.text} AddToCard={AddToCard} /> */}
        </div>
      ) : (
        <div className="shipp-container">
          <div className="shipp-title">
            Today Prize<span>Gift Box</span>
            <div className="shipp-box-title">Your ‘ Gift Box ’ code:</div>
          </div>
          <CopyBtn
            copyToClipBoard={copyToClipBoard}
            copySuccess={copySuccess}
            codeList={codeList}
            Selectday={Selectday}
          />
          <Link to="#" className="shipp-btn">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
