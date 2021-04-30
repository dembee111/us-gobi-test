import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import './ColorRefineMentList.scss';
function ColorRefineMentListShell({ items, colorFilters, mobile, setCustomFilter, customFilter, setFilter, facets }) {
  let multicolor;
  if (facets) {
    for (let singleFacet of facets.tags) {
      if (singleFacet.label === 'multicolor') {
        multicolor = singleFacet;
        break;
      }
    }
  }

  const [allowedItems, setAllowedItems] = useState([]);

  // useEffect(() => {
  //   var url = new URL(window.location.href);
  //   var baseRefinement = url.searchParams.get('refinement');
  //   if (baseRefinement) {
  //     let parsedBaseRefinement = JSON.parse(baseRefinement);
  //     if (parsedBaseRefinement['options.color'] && parsedBaseRefinement['options.color'].length > 0) {
  //       let refiningArray = [];
  //       if (!Array.isArray(parsedBaseRefinement['options.color'])) {
  //         parsedBaseRefinement['options.color'] = [parsedBaseRefinement['options.color']];
  //       }
  //       for (let singleColor of parsedBaseRefinement['options.color']) {
  //         let approved = true;
  //         for (let singleRefinement of currentRefinement) {
  //           if (singleRefinement === singleColor) {
  //             approved = false;
  //             break;
  //           }
  //         }
  //         if (approved) {
  //           refiningArray.push(singleColor);
  //         }
  //       }
  //       if (refiningArray.length > 0) {
  //         refine(refiningArray);
  //       }
  //     }
  //   }
  // }, []);

  useEffect(() => {
    let colorFiltersClone = JSON.parse(JSON.stringify(colorFilters));

    for (let singleColorFilter of colorFiltersClone) {
      let colorFilterAllowed = false;
      singleColorFilter.checked = false;

      if (singleColorFilter.focus && singleColorFilter.focus === 'tag') {
        if (multicolor) {
          colorFilterAllowed = true;
          if (multicolor.isRefined) {
            singleColorFilter.checked = true;
          }
        }
      } else {
        for (let singleValue of singleColorFilter.colors) {
          singleValue = singleValue.toLowerCase();
          for (let singleItem of items) {
            if (singleValue === singleItem.label) {
              if (singleItem.count > 0 || singleItem.isRefined) {
                colorFilterAllowed = true;
                break;
              }
            }
          }
        }
      }
      singleColorFilter.approved = colorFilterAllowed;

      // console.log(singleColorFilter);
      // console.log(items);
      for (let singleItem of items) {
        if (singleColorFilter.colors) {
          for (let singleColor of singleColorFilter.colors) {
            if (singleItem.label.toLowerCase() === singleColor.toLowerCase() && singleItem.isRefined) {
              singleColorFilter.checked = true;
              break;
            }
          }
        }
        if (singleColorFilter.checked) {
          break;
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
                          setFilter('tags', item.tags);
                        } else {
                          let newColors = [];
                          for (let singleColor of item.colors) {
                            newColors.push(singleColor.toLowerCase());
                          }
                          setFilter('color', item.colors);
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
      return null;
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
                            console.log('item', item);
                            setFilter('tags', item.tags);
                          } else {
                            let newColors = [];
                            for (let singleColor of item.colors) {
                              newColors.push(singleColor.toLowerCase());
                            }
                            setFilter('color', newColors);
                            // colors
                            // setFilter();
                            // if (item.checked) {
                            //   let pushingValue = [];
                            //   for (let singleValue of currentRefinement) {
                            //     let approved = true;
                            //     for (let singleColor of item.colors) {
                            //       if (singleValue === singleColor) {
                            //         approved = false;
                            //         break;
                            //       }
                            //     }
                            //     if (approved) {
                            //       pushingValue.push(singleValue);
                            //     }
                            //   }
                            //   refine(pushingValue);
                            // } else {
                            //   let pushingValue = currentRefinement.concat(item.colors);
                            //   refine(pushingValue);
                            // }
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
      return null;
    }
  }
}

export default ColorRefineMentListShell;
