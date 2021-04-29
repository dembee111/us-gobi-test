import React, { useEffect, useState } from 'react';
import { connectRefinementList, connectStateResults, Configure } from 'react-instantsearch-dom';
import Collapsible from 'react-collapsible';
import './ColorRefineMentList.scss';
function ColorRefineMentListShell({
  items,
  refine,
  currentRefinement,
  colorFilters,
  mobile,
  searchResults,
  setCustomFilter,
  customFilter,
}) {
  let multicolor = 0;
  if (searchResults) {
    for (let singleFacet of searchResults.disjunctiveFacets) {
      if (singleFacet.name === 'tags') {
        multicolor = singleFacet.data.multicolor;
        break;
      }
    }
  }

  const [allowedItems, setAllowedItems] = useState([]);

  useEffect(() => {
    var url = new URL(window.location.href);
    var baseRefinement = url.searchParams.get('refinement');
    if (baseRefinement) {
      let parsedBaseRefinement = JSON.parse(baseRefinement);
      if (parsedBaseRefinement['options.color'] && parsedBaseRefinement['options.color'].length > 0) {
        let refiningArray = [];
        if (!Array.isArray(parsedBaseRefinement['options.color'])) {
          parsedBaseRefinement['options.color'] = [parsedBaseRefinement['options.color']];
        }
        for (let singleColor of parsedBaseRefinement['options.color']) {
          let approved = true;
          for (let singleRefinement of currentRefinement) {
            if (singleRefinement === singleColor) {
              approved = false;
              break;
            }
          }
          if (approved) {
            refiningArray.push(singleColor);
          }
        }
        if (refiningArray.length > 0) {
          refine(refiningArray);
        }
      }
    }
  }, []);

  useEffect(() => {
    let colorFiltersClone = JSON.parse(JSON.stringify(colorFilters));

    for (let singleColorFilter of colorFiltersClone) {
      let colorFilterAllowed = false;
      singleColorFilter.checked = false;

      if (singleColorFilter.focus && singleColorFilter.focus === 'tag') {
        for (let singleTag of singleColorFilter.tags) {
          if (multicolor > 0) {
            colorFilterAllowed = true;
            break;
          }
        }
        if (customFilter === 'tags:multicolor') {
          singleColorFilter.checked = true;
        }
      } else {
        for (let singleValue of singleColorFilter.colors) {
          singleValue = singleValue.toLowerCase();
          for (let singleItem of items) {
            if (singleValue === singleItem.label) {
              if (singleItem.count > 0) {
                colorFilterAllowed = true;
                break;
              }
            }
          }
        }
      }

      singleColorFilter.approved = colorFilterAllowed;

      for (let singleCurrentRefinement of currentRefinement) {
        if (singleColorFilter.colors) {
          if (singleCurrentRefinement === singleColorFilter.colors[0]) {
            singleColorFilter.checked = true;
            break;
          }
        }
      }
    }
    setAllowedItems(colorFiltersClone);
  }, [items]);

  if (mobile) {
    if (allowedItems.length > 1) {
      return (
        <div className="collapseOuterShell">
          <div className="refinementTitle">
            <div>Color</div>
          </div>
          <div className="sizeMain">
            {allowedItems.map((item, key) => {
              if (item.approved) {
                return (
                  <div className="color-layout-mobile1">
                    <div
                      className="singleColorMain"
                      key={key}
                      onClick={(event) => {
                        event.preventDefault();
                        if (item.focus && item.focus === 'tag') {
                          if (customFilter === 'tags:multicolor') {
                            setCustomFilter('');
                          } else {
                            setCustomFilter('tags:multicolor');
                          }
                        } else {
                          if (item.checked) {
                            let pushingValue = [];
                            for (let singleValue of currentRefinement) {
                              let approved = true;
                              for (let singleColor of item.colors) {
                                if (singleValue === singleColor) {
                                  approved = false;
                                  break;
                                }
                              }
                              if (approved) {
                                pushingValue.push(singleValue);
                              }
                            }
                            refine(pushingValue);
                          } else {
                            let pushingValue = currentRefinement.concat(item.colors);
                            refine(pushingValue);
                          }
                        }

                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className="singleColorImage" style={{ backgroundImage: `url('${item.imgUrl}')` }}>
                        {item.checked && (
                          <svg
                            style={{ margin: '8px 6px' }}
                            width="14"
                            height="8"
                            viewBox="0 0 14 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <div className="singleColorLabel">
                        <p>{item.label}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  } else {
    if (allowedItems.length > 1) {
      return (
        <div className="collapseOuterShell">
          <Collapsible
            open={true}
            transitionTime={100}
            trigger={
              <div className="refinementTitle">
                <div>Color</div>
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
                <div>Color</div>
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
              <div className="sizeMain">
                {allowedItems.map((item, key) => {
                  if (item.approved) {
                    return (
                      <div
                        className="singleColorMain"
                        key={key}
                        onClick={(event) => {
                          event.preventDefault();
                          if (item.focus && item.focus === 'tag') {
                            if (customFilter === 'tags:multicolor') {
                              setCustomFilter('');
                            } else {
                              setCustomFilter('tags:multicolor');
                            }
                          } else {
                            if (item.checked) {
                              let pushingValue = [];
                              for (let singleValue of currentRefinement) {
                                let approved = true;
                                for (let singleColor of item.colors) {
                                  if (singleValue === singleColor) {
                                    approved = false;
                                    break;
                                  }
                                }
                                if (approved) {
                                  pushingValue.push(singleValue);
                                }
                              }
                              refine(pushingValue);
                            } else {
                              let pushingValue = currentRefinement.concat(item.colors);
                              refine(pushingValue);
                            }
                          }

                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className="singleColorImage" style={{ backgroundImage: `url('${item.imgUrl}')` }}>
                          {item.checked && (
                            <svg
                              style={{ margin: '8px 6px' }}
                              width="14"
                              height="8"
                              viewBox="0 0 14 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <div className="singleColorLabel">
                          <p>{item.label}</p>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </Collapsible>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

const ColorRefineMentList = connectRefinementList(connectStateResults(ColorRefineMentListShell));

export default ColorRefineMentList;
