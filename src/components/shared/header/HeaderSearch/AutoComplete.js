import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import CustomHits from './CustomHits';
import CustomQuerySuggestion from './CustomQuerySuggestion';
import algoliasearch from 'algoliasearch/lite';
import { connectAutoComplete, connectStats, InstantSearch, Configure } from 'react-instantsearch-dom';
const searchClient = algoliasearch('TICBT2ZIIK', '09f8bd78c2ed40dcbbd19faba0051925');

const Autocomplete = ({ currentRefinement, refine }) => {
  const [viewLink, setViewLink] = useState();

  const [defaultSearch, setDefaultSearch] = useState('');

  const clearBtn = () => {
    refine('');
    setDefaultSearch('');
  };

  function onSuggestionSelected(props) {
    refine(props);
  }

  return (
    <div className="customAuto__search">
      <div className="placeholder_search__input">
        <div className={currentRefinement ? 'autoSearch__input active' : 'autoSearch__input disable'}>
          <div className="exit_icon" onClick={clearBtn}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 1L13 13" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="sr_put">
            <form autoComplete="off" style={{ display: 'flex', width: '100%' }}>
              <label htmlFor="autoSearchDesktop">Search</label>
              <input
                id="autoSearchDesktop"
                placeholder="Search here..."
                type="text"
                value={defaultSearch}
                onChange={(event) => {
                  setDefaultSearch(event.currentTarget.value);
                  refine(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === 13 && event.currentTarget.value !== '') {
                    event.preventDefault();
                    clearBtn();
                    navigate('/search/' + event.currentTarget.value);
                  }
                }}
              />
            </form>
          </div>
          <div className="sr_icon">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.509 1.50905C2.48213 0.535924 3.77596 0 5.15215 0C6.52833 0 7.82216 0.535924 8.79526 1.50905C9.76837 2.48216 10.3043 3.77598 10.3043 5.15215C10.3043 6.41035 9.85609 7.59952 9.03559 8.53789L11.8969 11.3993C12.0344 11.5367 12.0344 11.7595 11.8969 11.897C11.8282 11.9657 11.7381 12 11.6481 12C11.558 12 11.4679 11.9657 11.3992 11.8969L8.53789 9.03562C7.59952 9.8561 6.41035 10.3043 5.15215 10.3043C3.77594 10.3043 2.48216 9.76842 1.50903 8.79529C0.535922 7.82218 0 6.52835 0 5.15217C0 3.77598 0.535899 2.48216 1.509 1.50905ZM2.00673 8.29759C3.74113 10.032 6.56313 10.032 8.29754 8.29759C10.0319 6.56321 10.0319 3.74116 8.29754 2.00677C7.43025 1.13949 6.29138 0.705987 5.15212 0.705987C4.01315 0.705987 2.8738 1.1397 2.0067 2.00677C0.272367 3.74113 0.272367 6.56318 2.00673 8.29759Z"
                fill="#4F5255"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={currentRefinement ? 'autoSearch_list active' : 'autoSearch_list disable'}>
        <div className="search_grid">
          <div className="key_control"></div>
          <div className="right">
            {defaultSearch !== '' && (
              <InstantSearch searchClient={searchClient} indexName="us_products_query_suggestions">
                <Configure hitsPerPage={5} />
                <CustomQuerySuggestion
                  clearBtn={clearBtn}
                  onSuggestionSelected={onSuggestionSelected}
                  defaultRefinement={defaultSearch}
                />
              </InstantSearch>
            )}
          </div>
          <div className="left">
            <h1 className="sug_tt">Suggestions</h1>
            <CustomHits />
          </div>
          <div className="bottom_view_all">
            <Link to={viewLink ? '/search/' + viewLink : '/search/' + currentRefinement} title="Search result">
              <CustomStats />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stats = ({ nbHits }) => (
  <div className="detail">
    <p>
      View all <span>({nbHits})</span>
    </p>
  </div>
);

const CustomStats = connectStats(Stats);
const CustomAutocomplete = connectAutoComplete(Autocomplete);

const OuterShell = (props) => {
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="us_products">
        <CustomAutocomplete></CustomAutocomplete>
      </InstantSearch>
    </div>
  );
};

export default OuterShell;
