import React, { useEffect, useState } from 'react';
import { connectRefinementList } from 'react-instantsearch-dom';
import Collapsible from 'react-collapsible';
function TagsRefineMentListShell({ items, refine, mobile, currentRefinement }) {
  console.log('items', items);
  const [approveCollectionItems, setApproveCollectionItems] = useState([]);

  const [approveGenderItems, setApproveGenderItems] = useState([]);

  const [approveSaleItems, setApproveSaleItems] = useState([]);

  function compare(a, b) {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  }

  let filteringCollection = [
    {
      tag: 'organic',
      changing: {
        label: 'Organic Cashmere ',
      },
    },
    {
      tag: 'silk',
      changing: {
        label: 'Cashmere Silk Blend',
      },
    },
    {
      tag: 'paintbox',
      changing: {
        label: 'Paint Box',
      },
    },
    {
      tag: 'winter spice',
      changing: {
        label: 'Winter Spice',
      },
    },
    {
      tag: 'trending',
      changing: {
        label: 'Trending',
      },
    },
    {
      tag: 'bestsellers',
      changing: {
        label: 'Best Seller',
      },
    },
  ];

  let filteringGender = [
    {
      tags: 'man',
      changing: {
        label: 'Men',
      },
    },
    {
      tag: 'women',
      changing: {
        label: 'Women',
      },
    },
  ];

  let filteringSalePercent = [
    {
      tag: 'sale10',
      changing: {
        label: 'Sale 10%',
      },
      order: 1,
    },
    {
      tag: 'sale30',
      changing: {
        label: 'Sale 30%',
      },
      order: 2,
    },
    {
      tag: 'sale40',
      changing: {
        label: 'Sale 40%',
      },
      order: 3,
    },
    {
      tag: 'sale60',
      changing: {
        label: 'Sale 60%',
      },
      order: 4,
    },
  ];

  // sale10
  // sale20
  // sale30
  // sale40
  // sale50
  // sale75

  useEffect(() => {
    let savedapproveCollectionItems = [];
    let savedapproveGenderItems = [];
    let savedApproveSaleItems = [];
    for (let singleItem of items) {
      for (let singleFilteringCollection of filteringCollection) {
        if (singleFilteringCollection.tag === singleItem.label) {
          if (singleFilteringCollection.changing) {
            if (singleFilteringCollection.changing.label) {
              singleItem.label = singleFilteringCollection.changing.label;
            }
          }
          savedapproveCollectionItems.push(singleItem);
        }
      }
      for (let singleFilteringCollection of filteringGender) {
        if (singleFilteringCollection.tag === singleItem.label) {
          if (singleFilteringCollection.changing) {
            if (singleFilteringCollection.changing.label) {
              singleItem.label = singleFilteringCollection.changing.label;
            }
          }
          savedapproveGenderItems.push(singleItem);
        }
      }

      for (let singleFilteringCollection of filteringSalePercent) {
        if (singleFilteringCollection.tag === singleItem.label) {
          if (singleFilteringCollection.changing) {
            if (singleFilteringCollection.changing.label) {
              singleItem.label = singleFilteringCollection.changing.label;
            }
          }
          singleItem.order = singleFilteringCollection.order;
          savedApproveSaleItems.push(singleItem);
        }
      }

      // for (let singleFilteringCollection of filteringSalePercent) {
      //   if (singleFilteringCollection.tags.includes(singleItem.label)) {
      //     singleFilteringCollection.allowed = true;
      //   }
      // }
    }

    // for (let singleSale of filteringSalePercent) {
    //   if (singleSale.allowed) {
    //     // isRefined
    //     singleSale.isRefined = false;

    //     for (let singleTag of singleSale.tags) {
    //       if (currentRefinement.includes(singleTag)) {
    //         singleSale.isRefined = true;
    //         break;
    //       }
    //     }

    //     savedApproveSaleItems.push(singleSale);
    //   }
    // }

    savedapproveCollectionItems = savedapproveCollectionItems.sort(compare);

    savedapproveGenderItems = savedapproveGenderItems.sort(compare);

    setApproveCollectionItems(savedapproveCollectionItems);

    setApproveGenderItems(savedapproveGenderItems);

    savedApproveSaleItems.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    setApproveSaleItems(savedApproveSaleItems);
  }, [items]);

  useEffect(() => {
    let url = new URL(window.location.href);
    let baseRefinement = url.searchParams.get('refinement');
    if (baseRefinement) {
      let parsedBaseRefinement = JSON.parse(baseRefinement);
      if (parsedBaseRefinement.tags && parsedBaseRefinement.tags.length > 0) {
        let refiningArray = [];
        if (!Array.isArray(parsedBaseRefinement.tags)) {
          parsedBaseRefinement.tags = [parsedBaseRefinement.tags];
        }
        for (let singleTag of parsedBaseRefinement.tags) {
          for (let singleGender of filteringGender) {
            if (singleTag === singleGender.tag) {
              let approved = true;
              for (let singleRefinement of currentRefinement) {
                if (singleRefinement === singleGender.tag) {
                  approved = false;
                  break;
                }
              }
              if (approved) {
                refiningArray.push(singleGender.tag);
              }
            }
          }
          for (let singleCollection of filteringCollection) {
            if (singleTag === singleCollection.tag) {
              let approved = true;
              for (let singleRefinement of currentRefinement) {
                if (singleRefinement === singleCollection.tag) {
                  approved = false;
                  break;
                }
              }
              if (approved) {
                refiningArray.push(singleCollection.tag);
              }
            }
          }
        }
        if (refiningArray.length > 0) {
          refine(refiningArray);
        }
      }
    }
  }, []);

  if (mobile) {
    return (
      <div>
        <div>
          <div>
            <div
              className="collapseOuterShell"
              style={{
                display: approveCollectionItems.length > 1 ? 'block' : 'none',
              }}
            >
              <div className="refinementTitle">
                <p>Collection</p>
              </div>
              {approveCollectionItems.map((item, key) => {
                return (
                  <div
                    className={
                      'filterColorSingleDiv ' +
                      (items.length > 10 ? 'col-6 col-md-4 col-lg-6' : 'col-6 col-md-4 col-lg-12')
                    }
                    style={{ padding: '0' }}
                    key={key}
                  >
                    <div
                      style={{ display: 'flex' }}
                      className="singleColumnBody"
                      onClick={(event) => {
                        event.preventDefault();
                        refine(item.value);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                        <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <label className="filterColorLabel">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          {approveGenderItems.length > 1 && (
            <div className="collapseOuterShell">
              <div className="refinementTitle">
                <p>Gender</p>
              </div>
              {approveGenderItems.map((item, key) => {
                return (
                  <div
                    className={
                      'filterColorSingleDiv ' +
                      (items.length > 10 ? 'col-6 col-md-4 col-lg-6' : 'col-6 col-md-4 col-lg-12')
                    }
                    style={{ padding: '0' }}
                    key={key}
                  >
                    <div
                      style={{ display: 'flex' }}
                      className="singleColumnBody"
                      onClick={(event) => {
                        event.preventDefault();
                        refine(item.value);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                        <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <label className="filterColorLabel">
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          {approveSaleItems.length > 1 && (
            <div className="collapseOuterShell">
              <div className="refinementTitle">
                <p>Sale</p>
              </div>
              {approveSaleItems.map((item, key) => {
                return (
                  <div
                    className={
                      'filterColorSingleDiv ' +
                      (items.length > 10 ? 'col-6 col-md-4 col-lg-6' : 'col-6 col-md-4 col-lg-12')
                    }
                    style={{ padding: '0' }}
                    key={key}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center' }}
                      className="singleColumnBody"
                      onClick={(event) => {
                        event.preventDefault();
                        refine(item.value);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                        <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <label
                        className="filterColorLabel"
                        style={{
                          color: item.isRefined ? '#4f5255' : '',
                        }}
                      >
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* <div>
          {approveSaleItems.length > 1 && (
            <div className="collapseOuterShell">
              <div className="refinementTitle">
                <p>Sale</p>
              </div>
              {approveSaleItems.map((item, key) => {
                return (
                  <div
                    className={
                      'filterColorSingleDiv ' +
                      (items.length > 10 ? 'col-6 col-md-4 col-lg-6' : 'col-6 col-md-4 col-lg-12')
                    }
                    style={{ padding: '0' }}
                    key={key}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center' }}
                      className="singleColumnBody"
                      onClick={(event) => {
                        event.preventDefault();
                        refine(item.tags);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                        <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <label
                        className="filterColorLabel"
                        style={{
                          color: item.isRefined ? '#4f5255' : '',
                        }}
                      >
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div> */}
      </div>
    );
  } else {
    return (
      <div>
        <div
          className="collapseOuterShell"
          style={{
            display: approveCollectionItems.length > 1 ? 'block' : 'none',
          }}
        >
          <Collapsible
            open={true}
            transitionTime={100}
            trigger={
              <div className="refinementTitle">
                <div>Collection</div>
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
                <div>Collection</div>
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
              <div>
                {approveCollectionItems.map((item, key) => {
                  return (
                    <div
                      className={
                        'filterColorSingleDiv ' +
                        (items.length > 10 ? 'col-6 col-md-4 col-lg-6' : 'col-6 col-md-4 col-lg-12')
                      }
                      style={{ padding: '0' }}
                      key={key}
                    >
                      <div
                        style={{ display: 'flex' }}
                        className="singleColumnBody"
                        onClick={(event) => {
                          event.preventDefault();
                          refine(item.value);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                          <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <label className="filterColorLabel">
                          {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Collapsible>
        </div>

        {/* <div className="refinementBorder"> </div> */}
        {approveGenderItems.length > 1 && (
          <div className="collapseOuterShell">
            <Collapsible
              open={true}
              transitionTime={100}
              trigger={
                <div className="refinementTitle">
                  <div>Gender</div>
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
                  <div>Gender</div>
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
                {approveGenderItems.map((item, key) => {
                  return (
                    <div
                      className={
                        'filterColorSingleDiv ' +
                        (items.length > 10 ? 'col-6 col-md-4 col-lg-6' : 'col-6 col-md-4 col-lg-12')
                      }
                      style={{ padding: '0' }}
                      key={key}
                    >
                      <div
                        style={{ display: 'flex' }}
                        className="singleColumnBody"
                        onClick={(event) => {
                          event.preventDefault();
                          refine(item.value);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                          <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <label className="filterColorLabel">
                          {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Collapsible>
          </div>
        )}
        {approveSaleItems.length > 1 && (
          <div className="collapseOuterShell">
            <Collapsible
              open={true}
              transitionTime={100}
              trigger={
                <div className="refinementTitle">
                  <div>Sale</div>
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
                  <div>Sale</div>
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
                {approveSaleItems.map((item, key) => {
                  return (
                    <div
                      className={
                        'filterColorSingleDiv ' +
                        (items.length > 10 ? 'col-6 col-md-4 col-lg-6' : 'col-6 col-md-4 col-lg-12')
                      }
                      style={{ padding: '0' }}
                      key={key}
                    >
                      <div
                        style={{ display: 'flex', alignItems: 'center' }}
                        className="singleColumnBody"
                        onClick={(event) => {
                          event.preventDefault();
                          refine(item.value);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                          <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <label
                          className="filterColorLabel"
                          style={{
                            color: item.isRefined ? '#4f5255' : '',
                          }}
                        >
                          {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Collapsible>
          </div>
        )}
        {/* {approveSaleItems.length > 1 && (
          <div className="collapseOuterShell">
            <Collapsible
              open={true}
              transitionTime={100}
              trigger={
                <div className="refinementTitle">
                  <div>Sale</div>
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
                  <div>Sale</div>
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
                {approveSaleItems.map((item, key) => {
                  return (
                    <div
                      className={
                        'filterColorSingleDiv ' +
                        (items.length > 10 ? 'col-6 col-md-4 col-lg-6' : 'col-6 col-md-4 col-lg-12')
                      }
                      style={{ padding: '0' }}
                      key={key}
                    >
                      <div
                        style={{ display: 'flex', alignItems: 'center' }}
                        className="singleColumnBody"
                        onClick={(event) => {
                          event.preventDefault();
                          console.log('item.tags', item.tags);
                          if (item.isRefined) {
                            let pushingValue = currentRefinement;
                            for (let singleTag of item.tags) {
                              const index = pushingValue.indexOf(singleTag);
                              if (index > -1) {
                                pushingValue.splice(index, 1);
                              }
                            }
                            refine(pushingValue);
                          } else {
                            refine(item.tags);
                            let pushingValue = currentRefinement.concat(item.tags);
                            refine(pushingValue);
                          }

                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                          <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <label
                          className="filterColorLabel"
                          style={{
                            color: item.isRefined ? '#4f5255' : '',
                          }}
                        >
                          {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Collapsible>
          </div>
        )} */}
      </div>
    );
  }
}

const TagsRefineMentList = connectRefinementList(TagsRefineMentListShell);

export default TagsRefineMentList;
