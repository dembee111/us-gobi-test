import React, { useState, useEffect, useRef } from 'react';
import './SearchGridCustom.scss';
import GridFilterTrigger from './GridFilter/GridFilterTrigger';
import GridFilterMain from './GridFilter/GridFilterMain';
import InnerDesktopSearchGrid from '../../SearchPage/SearchGrid/InnerDesktopSearchGrid';
import InnerMobileSearchGrid from '../../SearchPage/SearchGrid/InnerMobileSearchGrid';
import ClearRefinements from './GridFilter/RefineMentList/ClearRefinements';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  currency: state.currency,
});

function SearchGrid(props) {
  const [filterEnabled, setFilterEnabled] = useState(true);

  const [mobileFilterEnabled, setMobileFilterEnabled] = useState(false);

  const [customFilter, setCustomFilter] = useState('');

  const [gridWidth, setGridWidth] = useState(0);

  const gridRef = useRef();

  function triggerFilter() {
    if (window.innerWidth < 992) {
      setMobileFilterEnabled(!mobileFilterEnabled);
    } else {
      setFilterEnabled(!filterEnabled);
    }
  }

  useEffect(() => {
    if (props.source && props.source.origin && props.source.origin === 'homeCollection') {
      setFilterEnabled(false);
    }
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (filterEnabled) {
        if (window.innerWidth < 992) {
          if (gridWidth == 0) {
            setGridWidth(gridRef.current.clientWidth - 15);
          } else {
            setGridWidth(gridRef.current.clientWidth);
          }
        } else {
          // console.log(" pre popping", gridWidth);
          if (gridWidth == 0) {
            setGridWidth(gridRef.current.clientWidth - 220 - 15);
          } else {
            setGridWidth(gridRef.current.clientWidth - 220);
          }
        }
      } else {
        if (gridWidth == 0) {
          setGridWidth(gridRef.current.clientWidth - 15);
        } else {
          setGridWidth(gridRef.current.clientWidth);
        }
      }
    };
    if (filterEnabled) {
      if (window.innerWidth < 992) {
        if (gridWidth == 0) {
          setGridWidth(gridRef.current.clientWidth - 15);
        } else {
          setGridWidth(gridRef.current.clientWidth);
        }
      } else {
        if (gridWidth == 0) {
          setGridWidth(gridRef.current.clientWidth - 220 - 15);
        } else {
          setGridWidth(gridRef.current.clientWidth - 220);
        }
      }
    } else {
      if (gridWidth == 0) {
        setGridWidth(gridRef.current.clientWidth - 15);
      } else {
        setGridWidth(gridRef.current.clientWidth);
      }
    }

    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize, { passive: true });
    };
  }, [filterEnabled, gridWidth]);

  return (
    <div className="gridMain" ref={gridRef}>
      {!(props.source && props.source.origin && props.source.origin === 'homeCollection') && (
        <div className="new-gridMain-1">
          <GridFilterTrigger
            facets={props.facets}
            source={props.source}
            matchParam={props.source.handle}
            triggerFilter={triggerFilter}
            filterEnabled={filterEnabled}
            setCustomFilter={setCustomFilter}
            customFilter={customFilter}
            setFilter={props.setFilter}
          ></GridFilterTrigger>
        </div>
      )}

      <div className="desktopSearchGrid">
        <div className="new-side-layout">
          <div className={filterEnabled ? 'new-sidebox-left new-sidebox-open' : 'new-sidebox-left'}>
            {typeof window !== `undefined` && window.innerWidth > 992 && props.facets && (
              <GridFilterMain
                facets={props.facets}
                currency={props.currency}
                mobile={false}
                hits={props.hits}
                setCustomFilter={setCustomFilter}
                customFilter={customFilter}
                filter={props.filter}
                setFilter={props.setFilter}
              ></GridFilterMain>
            )}
          </div>
          <div className={filterEnabled ? 'new-sidebox-right close-right-p' : 'new-sidebox-right open-right-p'}>
            <InnerDesktopSearchGrid
              {...props}
              filterEnabled={filterEnabled}
              gridWidth={gridWidth}
            ></InnerDesktopSearchGrid>
          </div>
        </div>
        <div
          className="backToTopMain"
          onClick={(event) => {
            window.scrollTo(0, 0);
          }}
        >
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 19V1" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 6L7 1L13 6" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="mobileSearchGrid">
        <div className={!mobileFilterEnabled ? 'd-none' : ''}>
          <div className="mobileSearchFilterOuter">
            <div
              className="mobileSearchFilterClearFixed"
              onClick={() => {
                setMobileFilterEnabled(false);
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26 10L10 26" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 10L26 26" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {typeof window !== `undefined` && window.innerWidth <= 992 && (
              <GridFilterMain
                facets={props.facets}
                currency={props.currency}
                mobile={true}
                hits={props.hits}
                setCustomFilter={setCustomFilter}
                customFilter={customFilter}
                filter={props.filter}
                setFilter={props.setFilter}
              ></GridFilterMain>
            )}

            <div style={{ width: '100%', height: '60px' }}> </div>
            <div className="mobileSearchFilterBottomFixed">
              <div className="buttonGroup">
                <ClearRefinements
                  facets={props.facets}
                  mobile={true}
                  label={'Clear all filters'}
                  setFilter={props.setFilter}
                ></ClearRefinements>

                <div
                  className="applyButton"
                  onClick={() => {
                    setMobileFilterEnabled(false);
                  }}
                >
                  <p>Apply</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <InnerMobileSearchGrid {...props} gridWidth={gridWidth}></InnerMobileSearchGrid>
        </div>
      </div>
    </div>
  );
}
export default connect(mapStateToProps)(SearchGrid);
