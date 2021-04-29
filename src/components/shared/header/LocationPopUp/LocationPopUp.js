import React, { useState, useEffect } from 'react';
import './LocationPopUp.scss';
import getSymbolFromCurrency from 'currency-symbol-map';
import currencyCodes from 'currency-codes';
import { connect } from 'react-redux';
import { approvedCountryList } from '../../data/approvedCountryList';
import { approvedCurrencyList } from '../../data/approvedCurrency';
import { updateCurrencyCart } from '../../cart/CartHelpers';
import store from '../../../../state/createStore';

// import getSymbolFromCurrency from 'currency-symbol-map'
function LocationPopUp(props) {
  const [chosenCurrency, setChosenCurrency] = useState();
  const [chosenCountry, setChosenCountry] = useState();
  const [showingCurrencies, setShowingCurrencies] = useState([]);

  useEffect(() => {
    if (props.currency) {
      setChosenCurrency(props.currency.currencyCode);
      setChosenCountry(props.currency.chosenShippingCountry);

      for (let singleCountry of approvedCountryList) {
        if (singleCountry.countryCode === props.currency.chosenShippingCountry) {
          let tempo = singleCountry.redirect;
          while (tempo.includes('/')) {
            tempo = tempo.replace('/', '');
          }
          if (tempo === '') {
            setShowingCurrencies(approvedCurrencyList['no']);
          } else {
            for (let [key, singleCurrencyRegion] of Object.entries(approvedCurrencyList)) {
              if (key === tempo) {
                setShowingCurrencies(singleCurrencyRegion);
                break;
              }
            }
          }
        }
      }
    }
  }, [props.currency]);

  function handleCountryChange(event) {
    setChosenCountry(event.target.value);
    for (let singleCountry of approvedCountryList) {
      if (singleCountry.countryCode === event.target.value) {
        let tempo = singleCountry.redirect;
        while (tempo.includes('/')) {
          tempo = tempo.replace('/', '');
        }
        if (tempo === '') {
          setShowingCurrencies(approvedCurrencyList['no']);
        } else {
          for (let [key, singleCurrencyRegion] of Object.entries(approvedCurrencyList)) {
            if (key === tempo) {
              setShowingCurrencies(singleCurrencyRegion);
              break;
            }
          }
        }
      }
    }
  }

  function handleCurrencyChange(event) {
    setChosenCurrency(event.target.value);
  }
  function handleConfirm(event) {
    for (const singleCountry of approvedCountryList) {
      if (singleCountry.countryCode === chosenCountry) {
        if (singleCountry.redirect && singleCountry.redirect !== '/') {
          localStorage.setItem(
            'redirectApproved',
            JSON.stringify({
              country: singleCountry.countryCode,
            }),
          );
          window.location.href = singleCountry.redirect;

          return;
        }
      }
    }

    const newCurrency = {
      currencyCode: chosenCurrency,
      chosenShippingCountry: chosenCountry,
      currencySymbol: getSymbolFromCurrency(chosenCurrency),
    };
    localStorage.setItem('myChosenCountryNorway', JSON.stringify(newCurrency));
    store().dispatch({
      type: 'CURRENCY-INIT',
      payload: {
        currency: newCurrency,
      },
    });

    props.setLangState(!props.langState);
    if (newCurrency && newCurrency.currencyCode) {
      if (props.updateCheckoutCurrencyMutation) {
        updateCurrencyCart(newCurrency.currencyCode, props.updateCheckoutCurrencyMutation);
      }
    }
  }
  return (
    <div
      className="locationPopUpMain"
      onClick={() => {
        props.setLangState(!props.langState);
      }}
    >
      <div
        className="centerMainDiv"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="upperTitleDiv">
          <p>location</p>
          <svg
            onClick={() => {
              props.setLangState(!props.langState);
            }}
            width="37"
            height="36"
            viewBox="0 0 37 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M27.3398 9.20898L9.73375 26.8151" stroke="black" />
            <path d="M27.3398 26.8147L9.73375 9.2086" stroke="black" />
          </svg>
        </div>
        <div className="lowerBodyDiv">
          <div className="lowerBodyLabel">
            <p>Please select your country</p>
          </div>
          <div className="countrySelect">
            <div className="countrySelectSelectDiv">
              <select id="countryList" value={chosenCountry} onChange={handleCountryChange}>
                {[...approvedCountryList]
                  .sort((a, b) => {
                    if (a.countryName === 'International') {
                      return -1;
                    } else if (b.countryName === 'International') {
                      return 1;
                    } else {
                      if (a.countryName < b.countryName) return -1;
                      if (a.countryName > b.countryName) return 1;
                      return 0;
                    }
                  })
                  .map((item, index) => {
                    if (!item.hide) {
                      return (
                        <option key={index} value={item.countryCode}>
                          {item.countryName}
                        </option>
                      );
                    }
                  })}
              </select>
            </div>
            <span className="countrySelectAfterDiv">
              <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.507812 1.07837L6.50781 7.07837L12.5078 1.07837" stroke="black" />
              </svg>
            </span>
            <span className="selectIcon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9.85938" cy="10.2588" r="8.85938" stroke="black" />
                <path
                  d="M10.125 4.97677C12.225 4.82677 13.0417 3.33093 13.1875 2.60177C7.75 -0.183472 2.625 4.09777 2.0625 6.84777L6.1875 10.9143V12.9768L9.125 15.9768C9.04167 16.4143 8.925 18.1478 9.125 18.5978C9.325 19.0478 11.6146 18.7853 12.7812 18.5978L14.875 17.2893L16.1875 16.3518L17.3125 14.9728C16.6125 13.9228 14.625 13.8518 14.125 13.9768V12.9768C14.075 11.3768 12.8542 10.9351 12.25 10.9143H8.125V7.91427C9.925 7.26427 10.2083 5.6851 10.125 4.97677Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>

          <div style={{ marginTop: '30px' }}>
            <button aria-label="Confirm" className="confirmButton" onClick={handleConfirm}>
              CONFIRM
            </button>
            <button
              aria-label="Cancel"
              className="cancelButton"
              onClick={() => {
                props.setLangState(!props.langState);
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currency: state.currency,
});
export default connect(mapStateToProps)(LocationPopUp);
