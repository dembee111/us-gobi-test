import React, { useEffect, useState } from 'react';
import { initialStateFilter } from '../../../../SearchPage/SearchGrid/SearchGridHelper';
import Collapsible from 'react-collapsible';
function TagsRefineMentListShell({ items, currentRefinement, mobile, setFilter }) {
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
        label: 'Gobi Organic',
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
        label: 'Paintbox',
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
      tag: 'man',
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

  useEffect(() => {
    let savedapproveCollectionItems = [];
    let savedapproveGenderItems = [];
    let savedApproveSaleItems = [];
    for (let singleItem of items) {
      for (let singleFilteringCollection of initialStateFilter.tagSplits.collection) {
        if (singleFilteringCollection.tag === singleItem.label) {
          if (singleFilteringCollection.changing) {
            if (singleFilteringCollection.changing.label) {
              singleItem.newLabel = singleFilteringCollection.changing.label;
            }
          }
          savedapproveCollectionItems.push(singleItem);
        }
      }
      for (let singleFilteringCollection of initialStateFilter.tagSplits.gender) {
        if (singleFilteringCollection.tag === singleItem.label) {
          if (singleFilteringCollection.changing) {
            if (singleFilteringCollection.changing.label) {
              singleItem.newLabel = singleFilteringCollection.changing.label;
            }
          }
          savedapproveGenderItems.push(singleItem);
        }
      }
      for (let singleFilteringCollection of initialStateFilter.tagSplits.sale) {
        if (singleFilteringCollection.tag === singleItem.label) {
          if (singleFilteringCollection.changing) {
            if (singleFilteringCollection.changing.label) {
              singleItem.newLabel = singleFilteringCollection.changing.label;
            }
          }
          singleItem.order = singleFilteringCollection.order;
          savedApproveSaleItems.push(singleItem);
        }
      }
    }
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
                        setFilter('tags', item.label);
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
                        setFilter('tags', item.label);
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
                      style={{ display: 'flex' }}
                      className="singleColumnBody"
                      onClick={(event) => {
                        event.preventDefault();
                        setFilter('tags', item.label);
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
                          setFilter('tags', item.label);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                          <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <label className="filterColorLabel">
                          {item.newLabel.charAt(0).toUpperCase() + item.newLabel.slice(1)}
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
                          setFilter('tags', item.label);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                          <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <label className="filterColorLabel">
                          {item.newLabel.charAt(0).toUpperCase() + item.newLabel.slice(1)}
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
                        style={{ display: 'flex' }}
                        className="singleColumnBody"
                        onClick={(event) => {
                          event.preventDefault();
                          setFilter('tags', item.label);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className={item.isRefined ? 'filterColorBoxChecked' : 'filterColorBox'}>
                          <svg width="14" height="8" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L13 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <label className="filterColorLabel">
                          {item.newLabel.charAt(0).toUpperCase() + item.newLabel.slice(1)}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Collapsible>
          </div>
        )}
      </div>
    );
  }
}

export default TagsRefineMentListShell;
