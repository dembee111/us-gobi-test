import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import { connect } from 'react-redux';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { allPagesEvent } from '../../components/shared/dataLayer/index';
// import CollectionFilter from '../SearchPage/SearchGrid/GridFilter/GridFilter';
import { headerCategories } from '../../components/shared/data/headerCategories';
import { initMetaTags } from '../ProductPage/ProductHelpers';
import { getBreadCrumbs } from './CollectionHelper';
import InfiniteHitsCustom from './InfiniteHitsCustom/InfiniteHitsCustom';
import './CollectionPage.scss';

const mapStateToProps = (state) => ({
  currency: state.currency,
  checkout: state.checkout,
  customer: state.customer,
  currencyTable: state.currencyTable,
  isCollectionModalOpen: state.isCollectionModalOpen,
  // algoliaUserToken: state.algoliaUserToken,
});

function getCollectionFacet() {}

function CollectionPage(props) {
  const [pageHandle, setPageHandle] = useState();

  const [breadCrumbs, setBreadCrumbs] = useState([]);

  const [metaTags, setMetaTags] = useState({
    title: '',
    description: '',
  });

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    allPagesEvent();
  }, [typeof window !== `undefined` && window && window.dataLayer]);

  useEffect(() => {
    let currentPageHandle;
    if (props.location && props.location.pathname) {
      currentPageHandle = props.location.pathname.replace('/collections/', '/');
      currentPageHandle = currentPageHandle.replace('/us/', '');
      while (currentPageHandle.includes('/')) {
        currentPageHandle = currentPageHandle.replace('/', '');
      }
      setPageHandle(currentPageHandle);
    } else {
      currentPageHandle = window.location.pathname.replace('/collections/', '/');
      currentPageHandle = currentPageHandle.replace('/us/', '');
      while (currentPageHandle.includes('/')) {
        currentPageHandle = currentPageHandle.replace('/', '');
      }
      setPageHandle(currentPageHandle);
    }

    let breadCrumb = getBreadCrumbs(headerCategories, currentPageHandle, []);
    if (breadCrumb) {
      breadCrumb = breadCrumb.reverse();
      setBreadCrumbs(breadCrumb);
    }

    initMetaTags({}, currentPageHandle, 'collection')
      .then((result) => {
        setMetaTags(result);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      <Helmet>
        <title> Gobi Cashmere - Shop Sustainable Luxury Cashmere Clothing </title>
      </Helmet>
      {metaTags.title !== '' && (
        <Helmet>
          <title>{metaTags.title}</title>
          <meta name="description" content={metaTags.description} />
          <meta property="og:title" content={metaTags.title} />
          <meta property="og:description" content={metaTags.description} />
        </Helmet>
      )}
      <div className="mainContent">
        <div className="breadCrumbMain">
          {breadCrumbs.map((item, index) => {
            let chosenItem;
            if (item.head) {
              chosenItem = item.head;
            } else {
              chosenItem = item;
            }

            let selName = chosenItem.label;

            // if (breadCrumbs.length > 1 && index + 1 !== breadCrumbs.length) {
            //   selName = selName + ' / ';
            // }

            return (
              <div key={index} className="breadCrumbSingleMain">
                {/* {chosenItem.label != null ? <Link to={chosenItem.link}>{selName}</Link> : null} */}
                {chosenItem.label != null ? (
                  <div style={{ display: 'flex' }}>
                    <Link to={chosenItem.link}>{selName}</Link>{' '}
                    {breadCrumbs.length > 1 && index + 1 !== breadCrumbs.length && (
                      <div style={{ marginLeft: '5px', marginRight: '5px' }}>/</div>
                    )}{' '}
                  </div>
                ) : null}
                {breadCrumbs.length - 1 !== index ? null : (
                  // <label className="breadCrumbSingleMainMark">/</label>
                  <div className="breadCrumbSingleStat">
                    <label>(</label>

                    {/* <Stats
                        translations={{
                          stats(nbHits, timeSpentMS) {
                            return `${nbHits}`;
                          },
                        }}
                      ></Stats> */}
                    <label style={{ marginLeft: '2px' }}>Products)</label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="collectionPageMain">
          <div className="productGrid">
            <InfiniteHitsCustom
              source={{
                origin: 'collection',
                handle: pageHandle,
              }}
              hits={[]}
              currency={props.currency}
            ></InfiniteHitsCustom>
            {/* <Configure hitsPerPage={24} ruleContexts={['collection_' + pageHandle]} />
              <Panel className="hiddenRefinement">
                <RefinementList attribute="collections" defaultRefinement={[pageHandle]} />
              </Panel> */}
            {/* <InfiniteHits
                source={{
                  origin: 'collection',
                  handle: pageHandle,
                }}
                currency={props.currency}
              /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const CollectionPageConst = connect(mapStateToProps)(React.memo(CollectionPage));
function CollectionPageOuterShell(props) {
  return (
    <Layout
      source={{
        origin: 'collection',
      }}
    >
      <CollectionPageConst {...props} />
    </Layout>
  );
}
export default CollectionPageOuterShell;
