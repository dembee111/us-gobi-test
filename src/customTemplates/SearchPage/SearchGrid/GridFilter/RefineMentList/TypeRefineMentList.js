import React, { useEffect, useState } from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import Collapsible from 'react-collapsible';

function TypeRefineMentListShell({ items, refine, mobile, currentRefinement }) {
  function compare(a, b) {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    var url = new URL(window.location.href);
    var baseRefinement = url.searchParams.get('refinement');
    if (baseRefinement) {
      let parsedBaseRefinement = JSON.parse(baseRefinement);
      if (parsedBaseRefinement.product_type && parsedBaseRefinement.product_type.length > 0) {
        let refiningArray = [];
        if (!Array.isArray(parsedBaseRefinement.product_type)) {
          parsedBaseRefinement.product_type = [parsedBaseRefinement.product_type];
        }
        for (let singleProductType of parsedBaseRefinement.product_type) {
          let approved = true;
          for (let singleRefinement of currentRefinement) {
            if (singleRefinement === singleProductType) {
              approved = false;
              break;
            }
          }
          if (approved) {
            refiningArray.push(singleProductType);
          }
        }
        if (refiningArray.length > 0) {
          refine(refiningArray);
        }
      }
    }
  }, []);

  if (items.length > 1) {
    if (mobile) {
      return (
        <div>
          <div
            className="collapseOuterShell"
            style={{
              display: items.length > 1 ? 'block' : 'none',
            }}
          >
            <div className="refinementTitle">
              <p>Product Type</p>
            </div>
            <div className="row">
              {items.sort(compare).map((item, key) => {
                return (
                  <div
                    className={
                      // "filterColorSingleDiv " + ((typeof window !== `undefined` && window.innerWidth >= 768) ? "col-6":"col-12")
                      'filterColorSingleDiv col-6'
                    }
                    style={{ padding: '0' }}
                    key={key}
                  >
                    <div
                      style={{ display: 'flex' }}
                      className="singleColumnBody"
                      onClick={(event) => {
                        event.preventDefault();
                        refine(item.value);
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
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
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
                <div>Product Type</div>
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
                <div>Product Type</div>
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
            {items.sort(compare).map((item, key) => {
              return (
                <div
                  className={
                    'filterColorSingleDiv ' +
                    (items.length > 10 ? 'col-6 col-md-4 col-lg-6' : 'col-6 col-md-4 col-lg-12')
                  }
                  style={{ padding: '0' }}
                  key={key}
                >
                  <div
                    style={{ display: 'flex' }}
                    className="singleColumnBody"
                    onClick={(event) => {
                      event.preventDefault();
                      refine(item.value);
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
                      {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                    </label>
                  </div>
                </div>
              );
            })}
          </Collapsible>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
}

const TypeRefineMentList = connectRefinementList(TypeRefineMentListShell);

export default TypeRefineMentList;
