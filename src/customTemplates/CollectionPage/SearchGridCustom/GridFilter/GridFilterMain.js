import React, { useState, useReducer, useEffect, useRef } from 'react';
import TypeRefineMentList from './RefineMentList/TypeRefineMentList';
import PriceNumericMenu from './RefineMentList/PriceNumericMenu';
import SizeRefineMentList from './RefineMentList/SizeRefineMentList';
import ColorRefineMentList from './RefineMentList/ColorRefineMentList';
import TagsRefineMentList from './RefineMentList/TagsRefineMentList';
import { initialStateFilter } from '../../../SearchPage/SearchGrid/SearchGridHelper';
import SortBy from './RefineMentList/SortBy';
import './GridFilterMain.scss';
import IntersectionVisible from 'react-intersection-visible';
// import { connectStateResults, connectScrollTo } from 'react-instantsearch-dom';

function GridFilterMain(props) {
  const sentinel = useRef();

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
    if (window.pageYOffset > 20) {
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
    if (props.hits && containerBox.current) {
      if (containerBox.current.clientHeight > window.innerHeight) {
        setIsLarger(true);
      } else {
        setIsLarger(false);
      }
      if (props.hits[0]) {
        if (savedId && savedId !== props.hits[props.hits.length - 1].id) {
          if (window.pageYOffset > 10) {
            setTimeout(() => {
              let boundedValue = containerBox.current.clientHeight - window.innerHeight + 150;
              setOffset(-boundedValue);
              // savedBuffer.current = 0;
              setEnabled(true);
            }, 0);
          }
          getSavedId(props.hits[props.hits.length - 1].id);
        } else {
          getSavedId(props.hits[props.hits.length - 1].id);
        }
      }

      if (outerShell.current.clientHeight < containerBox.current.clientHeight) {
        setEnabled(false);
      }
    }
  }, [props.hits]);

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
          mobile={true}
          setFilter={props.setFilter}
          sortFacet={props.facets && props.facets.sort}
          items={[
            { value: null, label: 'Default' },
            {
              value: 'price_desc',
              label: 'Price: High - Low',
            },
            {
              value: 'price_asc',
              label: 'Price: Low - High',
            },
          ]}
        ></SortBy>
        <TagsRefineMentList
          items={props.facets ? props.facets.tags : []}
          currentRefinement={[]}
          setFilter={props.setFilter}
          mobile={true}
        ></TagsRefineMentList>
        <TypeRefineMentList
          mobile={true}
          items={props.facets ? props.facets.productType : []}
          currentRefinement={[]}
          setFilter={props.setFilter}
        ></TypeRefineMentList>
        <SizeRefineMentList
          mobile={true}
          sizeFilters={initialStateFilter.sizeFilters}
          items={props.facets ? props.facets.sizes : []}
          currentRefinement={[]}
          setFilter={props.setFilter}
        ></SizeRefineMentList>
        <ColorRefineMentList
          mobile={true}
          colorFilters={initialStateFilter.colorFilters}
          setCustomFilter={props.setCustomFilter}
          customFilter={props.customFilter}
          items={props.facets ? props.facets.color : []}
          facets={props.facets}
          currentRefinement={[]}
          setFilter={props.setFilter}
        ></ColorRefineMentList>
        <PriceNumericMenu
          mobile={true}
          items={props.facets ? props.facets.price : []}
          currency={props.currency}
          setFilter={props.setFilter}
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

          <TagsRefineMentList
            items={props.facets ? props.facets.tags : []}
            currentRefinement={[]}
            setFilter={props.setFilter}
          ></TagsRefineMentList>

          <TypeRefineMentList
            items={props.facets ? props.facets.productType : []}
            currentRefinement={[]}
            setFilter={props.setFilter}
          ></TypeRefineMentList>

          <SizeRefineMentList
            sizeFilters={initialStateFilter.sizeFilters}
            items={props.facets ? props.facets.sizes : []}
            currentRefinement={[]}
            setFilter={props.setFilter}
          ></SizeRefineMentList>

          <ColorRefineMentList
            colorFilters={initialStateFilter.colorFilters}
            setCustomFilter={props.setCustomFilter}
            customFilter={props.customFilter}
            items={props.facets ? props.facets.color : []}
            facets={props.facets}
            currentRefinement={[]}
            setFilter={props.setFilter}
          ></ColorRefineMentList>

          <PriceNumericMenu
            items={props.facets ? props.facets.price : []}
            currency={props.currency}
            setFilter={props.setFilter}
          ></PriceNumericMenu>

          <div ref={sentinel}>
            <IntersectionVisible
              onHide={(e) => onHide(e, 'down')}
              onShow={(e) => onShow(e, 'down')}
            ></IntersectionVisible>
          </div>
        </div>
      </div>
    );
  }
}

export default React.memo(GridFilterMain);
