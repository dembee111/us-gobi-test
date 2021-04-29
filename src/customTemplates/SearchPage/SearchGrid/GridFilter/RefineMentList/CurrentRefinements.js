import React, { useEffect, useState } from 'react';
import { connectCurrentRefinements, RangeInput } from 'react-instantsearch-dom';
import ClearRefinements from './ClearRefinements';
import { makeId } from '../../SearchGridHelper';
import { initialStateFilter } from '../../SearchGridHelper';
import './CurrentRefinements.scss';

function CurrentRefinementShell({
  items,
  refine,
  setFilterNumber,
  filterNumber,
  // searchState,
  customFilter,
  setCustomFilter,
}) {
  const [filteredColor, setFilteredColor] = useState([]);

  const [filteredSize, setFilteredSize] = useState([]);

  useEffect(() => {
    if (items.length !== filterNumber) {
      setFilterNumber(items.length);
    }

    for (let item of items) {
      if (item.id === 'options.color') {
        let pushingFilteredColor = [];
        for (let singleColorFilter of initialStateFilter.colorFilters) {
          let found = item.items.some((r) => {
            if (singleColorFilter.colors) {
              return singleColorFilter.colors.includes(r.label);
            }
          });
          if (found) {
            pushingFilteredColor.push({
              item: item,
              color: singleColorFilter,
            });
          }
        }
        setFilteredColor(pushingFilteredColor);
      }
      if (item.id === 'options.size') {
        let pushingFilteredSize = [];
        for (let singleSizeFilter of initialStateFilter.sizeFilters) {
          let found = item.items.some((r) => {
            if (singleSizeFilter.size) {
              return singleSizeFilter.size.includes(r.label);
            }
          });
          if (found) {
            pushingFilteredSize.push({
              item: item,
              size: singleSizeFilter,
            });
          }
        }
        setFilteredSize(pushingFilteredSize);
      }
    }
  }, [items]);

  let actualLengthRefinement = 0;

  for (let item of items) {
    if (item.attribute !== 'collections') {
      if (item.attribute === 'options.color') {
        let counter = 0;
        for (let singleColorFilter of initialStateFilter.colorFilters) {
          let found = item.items.some((r) => {
            if (singleColorFilter.colors) {
              return singleColorFilter.colors.includes(r.label);
            }
          });
          if (found) {
            counter++;
          }
        }
        actualLengthRefinement = actualLengthRefinement + counter;
      } else if (item.attribute === 'options.size') {
        let counter = 0;
        for (let singleSizeFilter of initialStateFilter.sizeFilters) {
          let found = item.items.some((r) => {
            if (singleSizeFilter.size) {
              return singleSizeFilter.size.includes(r.label);
            }
          });
          if (found) {
            counter++;
          }
        }
        actualLengthRefinement = actualLengthRefinement + counter;
      } else {
        if (item.items) {
          actualLengthRefinement = actualLengthRefinement + item.items.length;
        } else {
          actualLengthRefinement++;
        }
      }
    }
  }
  let multiColorEnabled = false;
  if (customFilter === 'tags:multicolor') {
    actualLengthRefinement++;
    multiColorEnabled = true;
  }

  return (
    <div>
      {actualLengthRefinement !== 0 && (
        <div>
          <div className="currentRefinementTriggerMain">
            <div className="currentRefinementTriggerNumber" style={{ display: 'flex' }}>
              <div style={{ marginRight: '6px' }}>Active filters</div>
              {'     (' + actualLengthRefinement + ')'}
            </div>
            <ClearRefinements
              setCustomFilter={setCustomFilter}
              customFilter={customFilter}
              translations={{
                reset: 'Clear all filters',
              }}
            />
          </div>

          <div className="currentRefinementMain">
            {items.map((item) => {
              if (item.id === 'options.color') {
                return (
                  <div style={{ display: 'flex' }} key={makeId(4)}>
                    {filteredColor.map((singleColor) => {
                      return (
                        <div key={makeId(4)} className="singleRefinementMain">
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={(event) => {
                              event.preventDefault();
                              // refine(item.value);
                              for (let singleInnerItem of singleColor.item.items) {
                                if (singleColor.color.colors.includes(singleInnerItem.label)) {
                                  refine(singleInnerItem.value);
                                }
                              }
                            }}
                          >
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div>
                            <p>{singleColor.color.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              } else if (item.id === 'options.size') {
                return (
                  <div style={{ display: 'flex' }} key={makeId(4)}>
                    {filteredSize.map((singleSize) => {
                      return (
                        <div key={makeId(4)} className="singleRefinementMain">
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                            onClick={(event) => {
                              event.preventDefault();
                              // refine(item.value);
                              for (let singleInnerItem of singleSize.item.items) {
                                if (singleSize.size.size.includes(singleInnerItem.label)) {
                                  refine(singleInnerItem.value);
                                }
                              }
                            }}
                          >
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div>
                            <p>{singleSize.size.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              } else if (item.id !== 'collections') {
                return (
                  <div key={item.label}>
                    {item.items ? (
                      <React.Fragment>
                        <div style={{ display: 'flex' }}>
                          {item.items.map((nested) => (
                            <div
                              className="singleRefinementMain"
                              key={nested.label}
                              onClick={(event) => {
                                event.preventDefault();
                                refine(nested.value);
                              }}
                            >
                              <div style={{ display: 'flex' }}>
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <div>
                                <p>{nested.label}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </React.Fragment>
                    ) : (
                      <div
                        className="singleRefinementMain"
                        onClick={(event) => {
                          event.preventDefault();
                          refine(item.value);
                        }}
                      >
                        <div>
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <p>{item.currentRefinement}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            })}
            {multiColorEnabled && (
              <div key={makeId(4)}>
                <div
                  className="singleRefinementMain"
                  onClick={(event) => {
                    event.preventDefault();
                    setCustomFilter('');
                  }}
                >
                  <div>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p>Multi Color</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const CurrentRefinement = connectCurrentRefinements(CurrentRefinementShell);

export default React.memo(CurrentRefinement);