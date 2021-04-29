import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import './WinterPage2.scss';
import LazyLoad from 'react-lazyload';
import InfiniteHits from '../../../SearchPage/InfiniteHits';
import { Configure, InstantSearch, Panel, RefinementList, Stats } from 'react-instantsearch-dom';
const WinterCollection = (props) => {
  return (
    <div className="winter-collection">
      <InfiniteHits
        source={{
          origin: 'homeCollection',
          handle: 'winter-spice',
        }}
        currencyTable={props.currencyTable}
        currency={props.currency}
      />
    </div>
  );
};

export default WinterCollection;
