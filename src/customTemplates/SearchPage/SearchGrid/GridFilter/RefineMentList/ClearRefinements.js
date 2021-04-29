import React from 'react';
import { connectCurrentRefinements } from 'react-instantsearch-dom';
import './ClearRefinements.scss';
import { initialStateFilter } from '../../SearchGridHelper';

function ClearRefinements({ items, refine, mobile, setCustomFilter, customFilter }) {
  let actualLengthRefinement = 0;

  for (let item of items) {
    if (item.attribute !== 'collections') {
      if (item.attribute === 'options.color') {
        let counter = 0;
        if (initialStateFilter.colorFilters) {
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
        }
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
  if (mobile) {
    return (
      <div
        className="clearButton"
        onClick={() => {
          let pushingItems = [];
          for (let singleItem of items) {
            if (singleItem.attribute !== 'collections') {
              pushingItems.push(singleItem);
            }
          }
          refine(pushingItems);
          if (setCustomFilter) {
            setCustomFilter('');
          }
        }}
      >
        <p>Clear ({actualLengthRefinement})</p>
      </div>
    );
  } else {
    return (
      <div
        className="clearRefinementsMain"
        onClick={() => {
          let pushingItems = [];
          for (let singleItem of items) {
            if (singleItem.attribute !== 'collections') {
              pushingItems.push(singleItem);
            }
          }
          refine(pushingItems);
          if (setCustomFilter) {
            setCustomFilter('');
          }
        }}
        disabled={!items.length}
      >
        <p>Clear all</p>
      </div>
    );
  }
}

const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);

export default CustomClearRefinements;
