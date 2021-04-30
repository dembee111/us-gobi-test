import React from 'react';
import './ClearRefinements.scss';
import { initialStateFilter, makeId } from '../../../../SearchPage/SearchGrid/SearchGridHelper';

function ClearRefinements({ mobile, label, setFilter, facets }) {
  if (mobile) {
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
    return (
      <div
        className="clearButton"
        onClick={() => {
          setFilter('clear', 'all');
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
          setFilter('clear', 'all');
        }}
        // disabled={!items.length}
      >
        <p>Clear all</p>
      </div>
    );
  }
}

export default ClearRefinements;
