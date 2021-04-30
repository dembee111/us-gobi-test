import React, { useState, useEffect } from 'react';
import './GridFilterTrigger.scss';
import { headerCategories } from '../../../../components/shared/data/headerCategories';
import { menuSearching } from '../../../CollectionPage/CollectionHelper';
import CurrentRefinements from './RefineMentList/CurrentRefinements';
import SortBy from './RefineMentList/SortBy';
import { Stats } from 'react-instantsearch-dom';

function CollectionFilter(props) {
  const [filterTitle, setFilterTitle] = useState();

  const [filterNumber, setFilterNumber] = useState(1);
  useEffect(() => {
    const result = menuSearching(headerCategories, props.matchParam);

    if (result) {
      setFilterTitle(result.label);
    }
  }, []);

  // useEffect(() => {
  //   if(props.customFilter && props.customFilter !== ""){

  //   }
  // }, [props.customFilter])

  const fixedText = 'fixed';
  const whenNotFixed = ' not a fixed';
  const [headerText, setHeaderText] = useState(whenNotFixed);
  useEffect(() => {
    const stickyFilter = document.getElementById('stickyTest');
    const sticky = stickyFilter.offsetTop;
    const scrollCallBack = window.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        stickyFilter.classList.add('sticky');
        if (headerText !== fixedText) {
          setHeaderText(fixedText);
        }
      } else {
        stickyFilter.classList.remove('sticky');
        if (headerText !== whenNotFixed) {
          setHeaderText(whenNotFixed);
        }
      }
    });
    return () => {
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);
  return (
    <div
      className="mobile-m-14"
      style={{
        position: 'relative',
        marginLeft: '0px',
        marginRight: '0px',
        paddingBottom: '18px',
      }}
    >
      <div className="collection-header" style={{ position: 'relative' }}>
        <div className="d-lg-none filterTriggerMobile" style={{ height: '100%' }}>
          <div className="mobile-flex-s">
            <div className="filterTriggerTitle">
              <p>{filterTitle} </p>
            </div>
            <div onClick={props.triggerFilter}>
              <div className="trans-icon-lay">
                <div className={props.filterEnabled ? 'new-filter-icon' : 'trans-icon'}></div>
                <div className={props.filterEnabled ? 'new-filter-icon2' : 'trans-icon2'}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-none d-lg-block filterTriggerDesktop">
          <div className="filter-sticky1">
            <div id="stickyTest" className="stickyFilter">
              <div className="sticky-fix">
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <div>
                    <CurrentRefinements
                      setFilterNumber={setFilterNumber}
                      filterNumber={filterNumber}
                      setCustomFilter={props.setCustomFilter}
                      customFilter={props.customFilter}
                    ></CurrentRefinements>
                  </div>
                  <div
                    className="filterTriggerInner"
                    style={{
                      height: filterNumber > 1 || props.customFilter !== '' ? '0px' : '36px',
                    }}
                  >
                    {filterNumber === 1 && props.customFilter === '' && (
                      <div className="filterTriggerTitle">
                        <p>{filterTitle} </p>
                      </div>
                    )}
                    {props.source && props.source.origin === 'search' && filterNumber === 0 && (
                      <div className="searchResultTitle">
                        <div>{'Result:'}</div>
                        <label style={{ marginLeft: '5px' }}>{props.source.handle}</label>
                        <div className="breadCrumbSingleStat">
                          <label>(</label>

                          <Stats
                            translations={{
                              stats(nbHits, timeSpentMS) {
                                return `${nbHits}`;
                              },
                            }}
                          ></Stats>
                          <label style={{ marginLeft: '2px' }}>Products)</label>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="filterTriggerTriggerRight" style={{ margin: '0 0 0 auto' }}>
                    <div className="new-fileterRight-box" onClick={props.triggerFilter}>
                      {props.filterEnabled ? <p>Hide Filters</p> : <p>Show Filters</p>}
                      <div className="trans-icon-lay">
                        <div className={props.filterEnabled ? 'new-filter-icon' : 'trans-icon'}></div>
                        <div className={props.filterEnabled ? 'new-filter-icon2' : 'trans-icon2'}></div>
                      </div>
                    </div>
                    <div>
                      <SortBy
                        defaultRefinement={'us_products'}
                        mobile={false}
                        items={[
                          { value: 'us_products', label: 'Default' },
                          {
                            value: 'us_productsPriceDesc',
                            label: 'Price: High - Low',
                          },
                          {
                            value: 'us_productsPriceAsc',
                            label: 'Price: Low - High',
                          },
                        ]}
                      ></SortBy>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionFilter;
