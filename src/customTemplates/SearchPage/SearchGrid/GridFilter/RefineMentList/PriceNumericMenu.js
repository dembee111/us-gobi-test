import React, { useEffect } from 'react';
import Collapsible from 'react-collapsible';
import { connectNumericMenu } from 'react-instantsearch-dom';
function PriceNumericMenuShell({ items, refine, mobile, currency, currentRefinement }) {
  useEffect(() => {
    var url = new URL(window.location.href);
    var baseRefinement = url.searchParams.get('multiRange');
    if (baseRefinement) {
      let parsedBaseRefinement = JSON.parse(baseRefinement);
      if (parsedBaseRefinement['price'] && parsedBaseRefinement['price'].length > 0) {
        if (Array.isArray(parsedBaseRefinement['price'])) {
          parsedBaseRefinement['price'] = parsedBaseRefinement['price'][0];
        }
        let singleSort = parsedBaseRefinement['price'];
        if (currentRefinement !== singleSort) {
          refine(singleSort);
        }
      }
    }
  }, []);
  if (mobile) {
    return (
      <div className="collapseOuterShell">
        <div className="refinementTitle">
          <div>Price</div>
        </div>
        <div>
          {items.map((item, key) => {
            let splitItem = item.value.split(':');
            let label;
            if (splitItem[0] == '0') {
              label = 'Under ' + item.value.split(':')[1] + currency.currencySymbol;
            } else if (item.value.split(':')[1]) {
              label =
                item.value.split(':')[0] +
                currency.currencySymbol +
                '-' +
                item.value.split(':')[1] +
                currency.currencySymbol;
            } else {
              label = 'Over ' + item.value.split(':')[0] + currency.currencySymbol;
            }
            if (item.label !== 'All') {
              return (
                <div className="filterColorSingleDiv col-6 col-md-4 col-lg-12" style={{ padding: '0' }} key={key}>
                  <div
                    style={{ display: 'flex' }}
                    className="singleColumnBody"
                    onClick={(event) => {
                      event.preventDefault();
                      if (item.isRefined) {
                        refine('');
                      } else {
                        refine(item.value);
                      }
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                      <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <label
                      className="filterColorLabel"
                      style={{
                        textDecoration: item.isRefined ? 'underline' : 'none',
                      }}
                    >
                      <div>{label}</div>
                    </label>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="collapseOuterShell">
        <Collapsible
          open={true}
          transitionTime={100}
          trigger={
            <div className="refinementTitle">
              <div>Price</div>
              <div className="refinementTitleSvg">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 15L18 21L24 15"
                    stroke="black"
                    strokeOpacity="0.87"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          }
          triggerWhenOpen={
            <div className="refinementTitle">
              <div>Price</div>
              <div className="refinementTitleSvg">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 21L18 15L12 21"
                    stroke="black"
                    strokeOpacity="0.87"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          }
        >
          <div>
            {items.map((item, key) => {
              let splitItem = item.value.split(':');
              let label;
              if (splitItem[0] == '0') {
                label = 'Under ' + currency.currencySymbol + item.value.split(':')[1];
              } else if (item.value.split(':')[1]) {
                label =
                  currency.currencySymbol +
                  item.value.split(':')[0] +
                  '-' +
                  currency.currencySymbol +
                  item.value.split(':')[1];
              } else {
                label = 'Over ' + currency.currencySymbol + item.value.split(':')[0];
              }
              if (item.label !== 'All') {
                return (
                  <div className="filterColorSingleDiv col-6 col-md-4 col-lg-12" style={{ padding: '0' }} key={key}>
                    <div
                      style={{ display: 'flex' }}
                      className="singleColumnBody"
                      onClick={(event) => {
                        event.preventDefault();
                        if (item.isRefined) {
                          refine('');
                        } else {
                          refine(item.value);
                        }
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                        <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <label
                        className="filterColorLabel"
                        style={{
                          textDecoration: item.isRefined ? 'underline' : 'none',
                        }}
                      >
                        <div>{label}</div>
                      </label>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </Collapsible>
      </div>
    );
  }
}

const PriceNumericMenu = connectNumericMenu(PriceNumericMenuShell);

export default PriceNumericMenu;
