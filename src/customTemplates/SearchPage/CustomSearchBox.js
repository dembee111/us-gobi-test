import React, { useEffect, useState } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

function SearchBoxShell({ currentRefinement, isSearchStalled, refine }) {
  //   const [allowedItems, setAllowedItems] = useState([]);

  return <input type="search" value={currentRefinement} onChange={(event) => refine(event.currentTarget.value)} />;
  // }
}

const SearchBox = connectSearchBox(SearchBoxShell);

export default SearchBox;
