import React, { useEffect, useState } from 'react';
import ClearRefinements from './ClearRefinements';
import { initialStateFilter, makeId } from '../../../../SearchPage/SearchGrid/SearchGridHelper';
import './CurrentRefinements.scss';

function CurrentRefinementShell({ setFilterNumber, filterNumber, facets, setFilter }) {
  let actualLengthRefinement = 0;

  for (let singleKey in facets) {
    // facets[singleKey]
    if (Array.isArray(facets[singleKey])) {
      if (singleKey === 'color') {
        // initialStateFilte.colorFilters
        for (let singleColorFilter of initialStateFilter.colorFilters) {
          if (singleColorFilter.colors) {
            // console.log(singleColorFilter.colors);
            for (let singleColor of singleColorFilter.colors) {
              let breaker = false;
              for (let singleColoFacet of facets[singleKey]) {
                if (singleColor.toLowerCase() === singleColoFacet.label && singleColoFacet.isRefined) {
                  actualLengthRefinement++;
                  breaker = true;
                  break;
                }
              }
              if (breaker) {
                break;
              }
            }
          }
        }
      } else if (singleKey === 'sizes') {
        for (let singleSizeFilter of initialStateFilter.sizeFilters) {
          if (singleSizeFilter.size) {
            // console.log(singleColorFilter.colors);
            for (let singleSize of singleSizeFilter.size) {
              let breaker = false;
              for (let singleSizeFacet of facets[singleKey]) {
                if (singleSize === singleSizeFacet.label && singleSizeFacet.isRefined) {
                  actualLengthRefinement++;
                  breaker = true;
                  break;
                }
              }
              if (breaker) {
                break;
              }
            }
          }
        }
      } else {
        for (let singleValue of facets[singleKey]) {
          if (singleValue.isRefined) {
            actualLengthRefinement++;
          }
        }
      }
    } else {
      if (facets[singleKey]) {
        actualLengthRefinement++;
      }
    }
  }

  if (filterNumber !== actualLengthRefinement) {
    setFilterNumber(actualLengthRefinement);
  }

  let sizes = [];
  if (facets && facets.sizes) {
    for (let singleInitSizeFilter of initialStateFilter.sizeFilters) {
      for (let singleSizeFacet of facets.sizes) {
        if (singleSizeFacet.isRefined && singleInitSizeFilter.size.includes(singleSizeFacet.label)) {
          sizes.push(singleInitSizeFilter);
          break;
        }
      }
    }
  }

  let colors = [];
  if (facets && facets.color) {
    for (let singleInitColorFilter of initialStateFilter.colorFilters) {
      if (singleInitColorFilter.colors) {
        for (let singleColorFacet of facets.color) {
          let newColors = [];
          for (let singleColor of singleInitColorFilter.colors) {
            newColors.push(singleColor.toLowerCase());
          }

          if (singleColorFacet.isRefined && newColors.includes(singleColorFacet.label.toLowerCase())) {
            colors.push(singleInitColorFilter);
            break;
          }
        }
      }
    }
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
            <ClearRefinements label={'Clear all filters'} setFilter={setFilter} />
          </div>

          <div className="currentRefinementMain">
            {facets.tags.map((item) => {
              if (item.isRefined) {
                return (
                  <div key={item.label}>
                    <div
                      className="singleRefinementMain"
                      onClick={(event) => {
                        event.preventDefault();
                        // refine(item.value);
                        setFilter('tags', item.label);
                      }}
                    >
                      <div className="rep-svg">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p>{item.label}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            {facets.productType.map((item) => {
              if (item.isRefined) {
                return (
                  <div key={item.label}>
                    <div
                      className="singleRefinementMain"
                      onClick={(event) => {
                        event.preventDefault();
                        // refine(item.value);
                        setFilter('productType', item.label);
                      }}
                    >
                      <div className="rep-svg">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p>{item.label}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            {sizes.map((item) => {
              return (
                <div key={item.label}>
                  <div
                    className="singleRefinementMain"
                    onClick={(event) => {
                      event.preventDefault();
                      // refine(item.value);
                      setFilter('sizes', item.size);
                    }}
                  >
                    <div className="rep-svg">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p>{item.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {colors.map((item) => {
              return (
                <div key={item.label}>
                  <div
                    className="singleRefinementMain"
                    onClick={(event) => {
                      event.preventDefault();
                      // refine(item.value);
                      let newColors = [];
                      for (let singleColor of item.colors) {
                        newColors.push(singleColor.toLowerCase());
                      }
                      setFilter('color', newColors);
                    }}
                  >
                    <div className="rep-svg">
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p>{item.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {facets.price.map((item) => {
              if (item.isRefined) {
                return (
                  <div key={item.label}>
                    <div
                      className="singleRefinementMain"
                      onClick={(event) => {
                        event.preventDefault();
                        // refine(item.value);

                        setFilter('price', item.label);
                      }}
                    >
                      <div className="rep-svg">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 1L1 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M1 1L9 9" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p>{item.label}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}

            {/* {items.map((item) => {
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
            })} */}
            {/* {multiColorEnabled && (
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
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(CurrentRefinementShell);