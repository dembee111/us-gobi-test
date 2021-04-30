import React, { useEffect, useState } from 'react';
import './SearchPage.scss';
import { SearchBox, Configure, InstantSearch, Panel, Stats } from 'react-instantsearch-dom';
import InfiniteHits from './InfiniteHits';
import { connect } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { getProductsFromCollectionHandleInit } from '../../components/shared/query/query.js';
import { allPagesEvent } from '../../components/shared/dataLayer/index';
import algoliasearch from 'algoliasearch/lite';

const mapStateToProps = (state) => ({
  currency: state.currency,
  currencyTable: state.currencyTable,
});

function SearchPage(props) {
  const searchClient = algoliasearch('TICBT2ZIIK', '09f8bd78c2ed40dcbbd19faba0051925');
  const [searchInput, setSearchInput] = useState('');
  const [getProductsFromCollectionHandleInitQuery, { data: getProductsFromCollectionData }] = useLazyQuery(
    getProductsFromCollectionHandleInit,
  );

  const [emptySearchData, setEmptySearchData] = useState();

  useEffect(() => {
    if (getProductsFromCollectionData && getProductsFromCollectionData.collectionByHandle) {
      let tempProductEdges = JSON.parse(
        JSON.stringify(getProductsFromCollectionData.collectionByHandle.products.edges),
      );
      let pushingData = [];

      for (let singleLoop of tempProductEdges) {
        pushingData.push(singleLoop.node);
      }

      setEmptySearchData(pushingData);
    }
  }, [getProductsFromCollectionData]);

  useEffect(() => {
    let savedLocation = window.location.pathname.replace('/us/', '/');
    savedLocation = savedLocation.replace('/search/', '');
    while (savedLocation.includes('%20')) {
      savedLocation = savedLocation.replace('%20', ' ');
    }
    if (props.searchInput !== savedLocation) {
      setSearchInput(decodeURIComponent(savedLocation));
      window.scrollTo(0, 0);
    }
    getProductsFromCollectionHandleInitQuery({
      variables: {
        currencyCode: props.currency.currencyCode,
        handle: 'women-cashmere-79',
        first: 18,
      },
    });
  }, [typeof window !== `undefined` && window.location.pathname, props.location]);

  useEffect(() => {
    allPagesEvent();
  }, [typeof window !== `undefined` && window && window.dataLayer]);

  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="us_products">
        <div className="mainContent">
          <div className="collectionPageMain">
            <div></div>
            <div className="productGrid">
              <Panel className="hiddenRefinement">
                <SearchBox defaultRefinement={searchInput} />
              </Panel>
              <Configure hitsPerPage={16} />
              <InfiniteHits
                source={{
                  origin: 'search',
                  handle: searchInput,
                }}
                emptySearchData={emptySearchData}
                currencyTable={props.currencyTable}
                currency={props.currency}
              />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
export default connect(mapStateToProps)(SearchPage);
