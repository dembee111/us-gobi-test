import React, { useEffect, useState } from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import Collapsible from 'react-collapsible';
import './SizeRefineMentList.scss';
function SizeRefineMentListShell({ items, refine, currentRefinement, sizeFilters, mobile, setFilter }) {
  const [allowedItems, setAllowedItems] = useState([]);

  // useEffect(() => {
  //   var url = new URL(window.location.href);
  //   var baseRefinement = url.searchParams.get('refinement');
  //   if (baseRefinement) {
  //     let parsedBaseRefinement = JSON.parse(baseRefinement);
  //     if (parsedBaseRefinement['options.size'] && parsedBaseRefinement['options.size'].length > 0) {
  //       let refiningArray = [];
  //       if (!Array.isArray(parsedBaseRefinement['options.size'])) {
  //         parsedBaseRefinement['options.size'] = [parsedBaseRefinement['options.size']];
  //       }
  //       for (let singleSize of parsedBaseRefinement['options.size']) {
  //         let approved = true;
  //         for (let singleRefinement of currentRefinement) {
  //           if (singleRefinement === singleSize) {
  //             approved = false;
  //             break;
  //           }
  //         }
  //         if (approved) {
  //           refiningArray.push(singleSize);
  //         }
  //       }
  //       if (refiningArray.length > 0) {
  //         refine(refiningArray);
  //       }
  //     }
  //   }
  // }, []);

  useEffect(() => {
    let itemsClone = JSON.parse(JSON.stringify(items));
    if (itemsClone) {
      let approvedItems = [];
      for (let singleSizeFilter of sizeFilters) {
        for (let singleSizeValue of singleSizeFilter.size) {
          let filterAllowed = false;
          for (let singleItem of itemsClone) {
            if (singleSizeValue == singleItem.label) {
              if (singleItem.count > 0 || singleItem.isRefined) {
                filterAllowed = true;
                approvedItems.push(singleSizeFilter);
                break;
              }
            }
          }
          if (filterAllowed) {
            break;
          }
        }
      }

      for (let singleApprovedItem of approvedItems) {
        singleApprovedItem.isRefined = false;
        for (let singleApprivedSize of singleApprovedItem.size) {
          for (let singleItem of items) {
            if (singleItem.label === singleApprivedSize && singleItem.isRefined) {
              singleApprovedItem.isRefined = true;
              break;
            }
          }
          if (singleApprovedItem.isRefined) {
            break;
          }
        }
      }

      setAllowedItems(approvedItems);
    }
  }, [items]);

  function compare(a, b) {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  }
  if (mobile) {
    if (allowedItems.length > 1) {
      return (
        <div className="collapseOuterShell">
          <div className="refinementTitle">
            <div>Size</div>
          </div>
          <div className="sizeMain">
            {allowedItems.sort(compare).map((item, key) => {
              // if( key === 0){
              //   return (
              //     <div
              //       className="singleSizeMain"
              //       style={{
              //         border: item.isRefined && '1px solid #4F5255',
              //         borderRadius: item.isRefined && '3px',
              //       }}
              //       key={key}
              //       onClick={(event) => {
              //         event.preventDefault();
              //         if (item.isRefined) {
              //           let indexElement = currentRefinement.indexOf(item.label);
              //           if (indexElement != -1) {
              //             currentRefinement.splice(indexElement, 1);
              //           }
              //           refine(currentRefinement);
              //         } else {
              //           currentRefinement.push(item.label);
              //           refine(currentRefinement);
              //         }
              //         window.scrollTo(0, 0);
              //       }}
              //     >
              //       <p>{item.label}</p>
              //     </div>
              //   );
              // } else {
              return (
                <div
                  className="singleSizeMain"
                  style={{
                    border: item.isRefined && '1px solid #4F5255',
                    borderRadius: item.isRefined && '3px',
                  }}
                  key={key}
                  onClick={(event) => {
                    event.preventDefault();
                    setFilter('sizes', item.size);
                    window.scrollTo(0, 0);
                  }}
                >
                  <p>{item.label}</p>
                </div>
              );
              // }
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
                <div>Size</div>
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
                <div>Size</div>
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
                {allowedItems.sort(compare).map((item, key) => {
                  if (key === 0 && item.label === 'ONE SIZE') {
                    return (
                      <div
                        className="singleSizeMain"
                        style={{
                          border: item.isRefined && '1px solid #4F5255',
                          borderRadius: item.isRefined && '3px',
                          width: '100%',
                        }}
                        key={key}
                        onClick={(event) => {
                          event.preventDefault();
                          setFilter('sizes', item.size);
                          // if (item.isRefined) {
                          //   for (let singleSize of item.size) {
                          //     let indexElement = currentRefinement.indexOf(singleSize);
                          //     if (indexElement != -1) {
                          //       currentRefinement.splice(indexElement, 1);
                          //     }
                          //   }

                          //   // refine(currentRefinement);
                          // } else {
                          //   for (let singleSize of item.size) {
                          //     currentRefinement.push(singleSize);
                          //   }
                          //   // refine(currentRefinement);
                          // }
                          window.scrollTo(0, 0);
                        }}
                      >
                        <p>{item.label}</p>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="singleSizeMain"
                        style={{
                          border: item.isRefined && '1px solid #4F5255',
                          borderRadius: item.isRefined && '3px',
                        }}
                        key={key}
                        onClick={(event) => {
                          event.preventDefault();
                          console.log(item);
                          setFilter('sizes', item.size);
                          // if (item.isRefined) {
                          //   for (let singleSize of item.size) {
                          //     let indexElement = currentRefinement.indexOf(singleSize);
                          //     if (indexElement != -1) {
                          //       currentRefinement.splice(indexElement, 1);
                          //     }
                          //   }
                          //   refine(currentRefinement);
                          // } else {
                          //   for (let singleSize of item.size) {
                          //     currentRefinement.push(singleSize);
                          //   }
                          //   refine(currentRefinement);
                          // }
                          window.scrollTo(0, 0);
                        }}
                      >
                        <p>{item.label}</p>
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

export default React.memo(SizeRefineMentListShell);
