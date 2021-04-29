import React, { useState, useReducer, useEffect, useRef } from 'react';
import TypeRefineMentList from './RefineMentList/TypeRefineMentList';
import PriceNumericMenu from './RefineMentList/PriceNumericMenu';
import SizeRefineMentList from './RefineMentList/SizeRefineMentList';
import ColorRefineMentList from './RefineMentList/ColorRefineMentList';
import TagsRefineMentList from './RefineMentList/TagsRefineMentList';
import { initialStateFilter } from '../SearchGridHelper';
import SortBy from './RefineMentList/SortBy';
import './GridFilterMain.scss';
import IntersectionVisible from 'react-intersection-visible';
import { connectStateResults, connectScrollTo } from 'react-instantsearch-dom';

function GridFilterMain(props) {
  const sentinel = useRef();

  const sentinelTop = useRef();

  const containerBox = useRef();

  const outerShell = useRef();

  const [isLarger, setIsLarger] = useState(true);

  const [enabled, setEnabled] = useState(false);

  const [offset, setOffset] = useState(0);

  const [locked, setLocked] = useState(false);

  const [savedId, getSavedId] = useState();

  const [savedLockedPosition, setSavedLockedPosition] = useState(0);

  const prevPosition = useRef();

  function onShow(entries, direction) {
    if (props.searchResults && window.pageYOffset > 20) {
      if (outerShell.current.clientHeight < containerBox.current.clientHeight + 150) {
        setEnabled(false);
        setOffset(0);
        return;
      }
      if (direction === 'down') {
        setLocked(false);
        let boundedValue = containerBox.current.clientHeight - window.innerHeight + 150;
        setEnabled(true);
        setOffset(-boundedValue);
        setLocked(false);
      } else {
        setLocked(false);
        setOffset(0);
        setEnabled(true);
      }
    }
  }

  function onHide(entries, direction) {
    if (direction === 'down') {
      if (containerBox.current.clientHeight < window.innerHeight) {
        setIsLarger(true);
      }
    }
  }

  useEffect(() => {
    if (props.searchResults && containerBox.current) {
      if (containerBox.current.clientHeight > window.innerHeight) {
        setIsLarger(true);
      } else {
        setIsLarger(false);
      }
      if (props.searchResults.hits[0]) {
        if (savedId && savedId !== props.searchResults.hits[0].objectID) {
          if (window.pageYOffset > 10) {
            setTimeout(() => {
              let boundedValue = containerBox.current.clientHeight - window.innerHeight + 150;
              setOffset(-boundedValue);
              // savedBuffer.current = 0;
              setEnabled(true);
            }, 0);
          }
          getSavedId(props.searchResults.hits[0].objectID);
        } else {
          getSavedId(props.searchResults.hits[0].objectID);
        }
      }

      if (outerShell.current.clientHeight < containerBox.current.clientHeight) {
        setEnabled(false);
      }
    }
  }, [props.searchResults]);

  useEffect(() => {
    if (!props.mobile) {
      const onScroll = () => {
        if (!prevPosition.current) {
          prevPosition.current = window.pageYOffset;
        }
        if (outerShell.current.clientHeight < containerBox.current.clientHeight + 150) {
          setEnabled(false);
          setOffset(0);
          return;
        }

        if (containerBox.current.clientHeight > window.innerHeight) {
          setIsLarger(true);
        } else {
          setIsLarger(false);
        }
        if (isLarger) {
          if (prevPosition.current < window.pageYOffset) {
            if (window.pageYOffset > outerShell.current.getBoundingClientRect().height - 700) {
              if (enabled) {
                setOffset(
                  outerShell.current.getBoundingClientRect().height -
                    containerBox.current.getBoundingClientRect().height +
                    156,
                );
                setEnabled(false);
              }
            } else {
              if (enabled && offset === 0) {
                setEnabled(false);
                setLocked(true);
                setSavedLockedPosition(window.pageYOffset);
                setOffset(window.pageYOffset);
              }
            }
          } else {
            if (enabled && offset !== 0) {
              setEnabled(false);
              setLocked(true);
              setSavedLockedPosition(window.pageYOffset);
              // let newOffSet = -(sentinelTop.current.getBoundingClientRect().top + window.innerHeight + 150 );
              let newOffSet = window.pageYOffset - (containerBox.current.clientHeight - window.innerHeight) - 150;

              setOffset(newOffSet);
            }
          }
        } else {
          if (window.pageYOffset > outerShell.current.getBoundingClientRect().height - 700) {
            if (enabled) {
              setOffset(
                outerShell.current.getBoundingClientRect().height -
                  containerBox.current.getBoundingClientRect().height +
                  150,
              );
              setEnabled(false);
            }
          } else {
            if (window.pageYOffset > 80) {
              setEnabled(true);
              setOffset(0);
            } else {
              setEnabled(false);
              setOffset(0);
            }
          }
        }

        if (window.pageYOffset < 20) {
          setOffset(0);
          setEnabled(false);
        }

        prevPosition.current = window.pageYOffset;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll, { passive: true });
      };
    }
  }, [enabled, offset, isLarger, locked]);

  if (props.mobile) {
    return (
      <div className="gridFilterMainMobile">
        <h3 className="title">Filter</h3>
        <SortBy
          defaultRefinement={'us_products'}
          mobile={true}
          items={[
            { value: 'us_products', label: 'Default' },
            { value: 'us_productsPriceDesc', label: 'Price: High - Low' },
            { value: 'us_productsPriceAsc', label: 'Price: Low - High' },
          ]}
        ></SortBy>
        <TagsRefineMentList attribute="tags" mobile={true} limit={5000}></TagsRefineMentList>
        <TypeRefineMentList attribute="product_type" limit={300} mobile={true}></TypeRefineMentList>
        <SizeRefineMentList
          mobile={true}
          limit={200}
          attribute="options.size"
          sizeFilters={initialStateFilter.sizeFilters}
        ></SizeRefineMentList>
        <ColorRefineMentList
          mobile={true}
          limit={200}
          attribute="options.color"
          colorFilters={initialStateFilter.colorFilters}
          setCustomFilter={props.setCustomFilter}
          customFilter={props.customFilter}
        ></ColorRefineMentList>
        <PriceNumericMenu
          currency={props.currency}
          mobile={true}
          attribute="price"
          items={initialStateFilter.priceFilters}
        ></PriceNumericMenu>
      </div>
    );
  } else {
    return (
      <div
        className="gridFilterMainDesktop"
        style={{ position: 'absolute', height: '100%', width: '100%', left: '0' }}
        ref={outerShell}
      >
        <div>
          <div
            ref={containerBox}
            style={{
              position: enabled ? 'fixed' : 'absolute',
              width: '220px',
              top: offset,
            }}
          >
            <div style={{ zIndex: '-100' }}>
              <IntersectionVisible
                className="popper"
                onShow={(e) => onShow(e, 'up')}
                onHide={(e) => onHide(e, 'up')}
              ></IntersectionVisible>
              {enabled && <div style={{ height: '150px' }}></div>}
            </div>

            <TagsRefineMentList attribute="tags" limit={5000}></TagsRefineMentList>

            <TypeRefineMentList attribute="product_type" limit={300} mobile={false}></TypeRefineMentList>

            <SizeRefineMentList
              mobile={false}
              limit={200}
              attribute="options.size"
              sizeFilters={initialStateFilter.sizeFilters}
            ></SizeRefineMentList>

            <ColorRefineMentList
              mobile={false}
              limit={200}
              attribute="options.color"
              colorFilters={initialStateFilter.colorFilters}
              setCustomFilter={props.setCustomFilter}
              customFilter={props.customFilter}
            ></ColorRefineMentList>

            <PriceNumericMenu
              mobile={false}
              attribute="price"
              items={initialStateFilter.priceFilters}
              currency={props.currency}
            ></PriceNumericMenu>

            <div ref={sentinel}>
              <IntersectionVisible
                onHide={(e) => onHide(e, 'down')}
                onShow={(e) => onShow(e, 'down')}
              ></IntersectionVisible>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connectStateResults(React.memo(GridFilterMain));
