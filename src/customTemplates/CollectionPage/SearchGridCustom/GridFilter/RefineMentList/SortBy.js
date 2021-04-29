import React, { useEffect, useState } from 'react';
import { connectSortBy } from 'react-instantsearch-dom';
import './SortBy.scss';

function SortByShell({ items, refine, currentRefinement, mobile, sortFacet, setFilter }) {
  const [sortState, setSortState] = useState(false);

  // useEffect(() => {
  //   var url = new URL(window.location.href);
  //   var baseRefinement = url.searchParams.get('sortBy');
  //   if (baseRefinement) {
  //     console.log(currentRefinement, baseRefinement);

  //     if (currentRefinement !== baseRefinement) {
  //       refine(baseRefinement);
  //     }
  //   }
  // }, []);

  if (!mobile) {
    return (
      <div className={sortState ? 'new-sort-show' : 'new-sort-hide'}>
        <div
          style={{ cursor: 'pointer' }}
          className="sortByTriggerMain"
          onClick={() => {
            setSortState(!sortState);
          }}
        >
          <p>Sort By</p>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 14L18 22L26 14"
              stroke="black"
              strokeOpacity="0.87"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {sortState && [
          <div
            key={0}
            className="sortByDropDownShell"
            onClick={() => {
              setSortState(false);
            }}
          ></div>,
          <div key={1} className="sortByDropDownMain">
            {items.map((item, index) => {
              return (
                <div
                  className="sortByP"
                  key={index}
                  onClick={() => {
                    setSortState(false);
                    setFilter('sort', item.value);
                    // refine(item.value);
                  }}
                  style={{ fontWeight: item.value === sortFacet ? '600' : '400' }}
                >
                  {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                </div>
              );
            })}
          </div>,
        ]}
      </div>
    );
  } else {
    return (
      <div className="collapseOuterShell" style={{ border: 'none', marginTop: '0px' }}>
        <div className="refinementTitle">
          <div>Sort by</div>
        </div>
        {items.map((item, key) => {
          return (
            <div
              className={
                'filterColorSingleDiv ' + (items.length > 10 ? 'col-6 col-md-4 col-lg-6' : 'col-6 col-md-4 col-lg-12')
              }
              style={{ padding: '0' }}
              key={key}
            >
              <div
                style={{ display: 'flex' }}
                className="singleColumnBody"
                onClick={(event) => {
                  event.preventDefault();
                  // refine(item.value);
                  setFilter('sort', item.value);
                  window.scrollTo(0, 0);
                }}
              >
                <div className={item.value === sortFacet ? 'filterSortBoxChecked' : 'filterSortBox'}>
                  <div className="filterSortBoxCheckedInner" />
                </div>
                <label className="filterColorLabel">{item.label.charAt(0).toUpperCase() + item.label.slice(1)}</label>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SortByShell;
