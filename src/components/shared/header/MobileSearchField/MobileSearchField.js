import React, { useState, useEffect } from 'react';
import './MobileSearchField.scss';
import { Link, navigate } from 'gatsby';
import {
  connectAutoComplete,
  Highlight,
  connectMenu,
  Configure,
  connectStats,
  InstantSearch,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch('TICBT2ZIIK', '09f8bd78c2ed40dcbbd19faba0051925');

function MobileSearchField(props) {
  const [searchField, setSearchField] = useState('');
  function searchHandle() {
    const clonedSearchInput = searchField;
    setSearchField('');
    props.setMobileSearchState(false);
  }
  useEffect(() => {
    // window.scrollTo(0, 0);

    if (props.mobileSearchState && props.mobileSearchState === true) {
      document.getElementById('autoSearchMobile').focus();
    }

    window.addEventListener('resize', resizeUpdate, { passive: true });
    return () => {
      window.removeEventListener('resize', resizeUpdate);
    };
  }, []);
  function resizeUpdate() {
    if (window.innerWidth > 768) {
      props.setMobileSearchState(false);
    }
  }

  const Autocomplete = ({ hits, currentRefinement, refine }) => (
    <div className="Mobile__search">
      <div className="placeholder_search__input">
        <div className="autoSearch__input">
          <form autoComplete="off" style={{ display: 'flex', width: '100%' }}>
            <label htmlFor="autoSearchMobile">Search</label>
            <input
              id="autoSearchMobile"
              type="text"
              placeholder="Search here..."
              value={currentRefinement}
              onChange={(event) => refine(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.keyCode === 13 && event.currentTarget.value !== '') {
                  event.preventDefault();
                  navigate('/search/' + event.currentTarget.value);
                }
              }}
            />
          </form>
        </div>
      </div>
      <div className={currentRefinement ? 'autoSearch_list active' : 'autoSearch_list disable'}>
        <div className="search_grid">
          <div className="key_control"></div>
          <div className="right">
            <CustomMenu attribute="product_type" limit={4} />
          </div>
          <div className="left">
            <h1 className="sug_tt">Suggestions</h1>
            <ul>
              <Configure hitsPerPage={4} />
              {hits.map((hit) => (
                <li key={hit.objectID}>
                  <Link to={'/products/' + hit.handle} title={hit.title}>
                    <div className="box">
                      <div className="img">
                        <img src={hit.product_image} alt={hit.title} />
                      </div>
                      <div className="det">
                        <h1>{hit.title}</h1>
                        <div className={hit.compare_at_price > hit.price ? 'price on_sale' : 'price'}>
                          <span className="current__price">${hit.compare_at_price}</span>
                          <span className="sale__price">${hit.price}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bottom_view_all">
            <Link to={'/search/' + currentRefinement} title="Search result">
              <CustomStats />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  const Menu = ({ items, isFromSearch, refine, createURL }) => (
    <ul>
      {items.map((item) => (
        <li key={item.value}>
          <a
            href={createURL(item.value)}
            onClick={(event) => {
              event.preventDefault();
              refine(item.value);
            }}
          >
            {isFromSearch ? <Highlight attribute="product_type" hit={item} /> : item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  const Stats = ({ nbHits }) => (
    <div className="detail">
      <p>
        View all <span>({nbHits})</span>
      </p>
    </div>
  );

  const CustomStats = connectStats(Stats);
  const CustomMenu = connectMenu(Menu);
  const CustomAutocomplete = connectAutoComplete(Autocomplete);

  return (
    // <div></div>
    [
      <div
        key={0}
        className="mobileSeachFieldMain"
        style={{
          opacity: props.mobileSearchState && '1',
          width: props.mobileSearchState && '100%',
          zIndex: props.mobileSearchState && '100',
        }}
      >
        <div className="searchInput">
          <InstantSearch searchClient={searchClient} indexName="us_products">
            <CustomAutocomplete></CustomAutocomplete>
          </InstantSearch>
        </div>
        <div
          className="exitIcon"
          onClick={() => {
            props.setMobileSearchState(false);
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 1L13 13" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>,
      <div key={2}>
        {props.mobileSearchState && (
          <div
            className="searchCancelDiv"
            onClick={() => {
              props.setMobileSearchState(false);
            }}
          ></div>
        )}
      </div>,
    ]
  );
}
// const mapStateToProps = (state) => {
// 	return {
// 		currency: state.currency
// 	};
// };
export default MobileSearchField;
