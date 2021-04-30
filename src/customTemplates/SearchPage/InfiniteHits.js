import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import SearchGrid from './SearchGrid/SearchGrid';
import { searchResultsEvent, collectionViewEvent } from '../../components/shared/dataLayer/index';
import { sendProductViewEvent } from '../../components/shared/dataLayer/algolia';
import './InfiniteHits.scss';
class InfiniteHits extends Component {
  constructor(props) {
    super(props);
    // this.sentinel = React.createRef();
    this.state = {
      savedGrid: null,
    };

    this.state = {
      hasMore: 'init',
      showLoader: true,
    };
  }
  componentWillUnmount() {
    this.observer.disconnect();
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(this.onSentinelIntersection);
    this.observer.observe(this.sentinel);
  }
  onSentinelIntersection = (entries) => {
    const { hasMore, refineNext } = this.props;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (hasMore) {
          refineNext();
        }
      }
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    // return true;
    if (nextState.showLoader !== this.state.showLoader) {
      return true;
    }
    if (nextProps.currencyTable && !this.props.currencyTable) {
      return true;
    }
    if (this.props.hits.length !== nextProps.hits.length) {
      let newProducts = nextProps.hits.slice(this.props.hits.length, nextProps.hits.length);
      let sendingObjectIds = [];
      for (let singleNewProduct of newProducts) {
        sendingObjectIds.push(singleNewProduct.objectID);
      }
      if (sendingObjectIds.length > 0 && sendingObjectIds.length < 21) {
        sendProductViewEvent(sendingObjectIds, 'us_products');
      }

      return true;
    } else {
      let approved = false;
      for (let i = 0; i < this.props.hits.length; i++) {
        if (this.props.hits[i].id !== nextProps.hits[i].id) {
          approved = true;
          break;
        }
      }
      if (approved) {
        let sendingObjectIds = [];
        for (let singleNewProduct of nextProps.hits) {
          sendingObjectIds.push(singleNewProduct.objectID);
        }
        if (sendingObjectIds.length > 0 && sendingObjectIds.length < 21) {
          sendProductViewEvent(sendingObjectIds, 'us_products');
        }
      }
      return approved;
    }
  }

  componentDidUpdate() {
    if (this.state.showLoader) {
      if (!this.props.hasMore) {
        this.setState({
          showLoader: false,
        });
      }
    }
    if (window.dataLayer) {
      if (!this.state.savedGrid && this.props.hits.length > 0) {
        if (this.props.source) {
          if (this.props.source.origin === 'collection') {
            let allProducts = [];

            for (let [index, singleHit] of this.props.hits.entries()) {
              // let product = singleHit;
              // let variant = singleHit.variants.edges[0].node;
              allProducts.push({
                name: singleHit.title,
                id: (singleHit.sku && singleHit.sku.replace("'", '')) || '',
                productId: singleHit.id || '',
                variantId: singleHit.objectID || '',
                price: singleHit.price,
                position: index,
                list: 'Collection Results',
                handle: this.props.source.handle,
              });
            }
            collectionViewEvent(allProducts);
          }
        } else {
          if (this.props.searchInput) {
            this.setState({
              savedGrid: this.props.hits,
            });
            var allProducts = this.props.hits.map((product, index) => {
              return {
                name: product.title && product.title.replace("'", ''),
                id: (product.sku && product.sku) || '',
                productId: product.id || '',
                variantId: product.objectID || '',
                price: product.price,
                brand: product.vendor,
                position: index,
                list: 'Search Results',
                handle: product.handle,
              };
            });
            searchResultsEvent(this.props.searchInput, allProducts);
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="ais-InfiniteHits">
        <div className="ais-InfiniteHits-list">
          <SearchGrid
            currencyTable={this.props.currencyTable}
            emptySearchData={this.props.emptySearchData}
            currency={this.props.currency}
            hits={this.props.hits}
            source={this.props.source}
            hasMore={this.props.hasMore}
            showLoader={this.state.showLoader}
          ></SearchGrid>

          <div className="ais-InfiniteHits-sentinel" ref={(c) => (this.sentinel = c)} />
        </div>
      </div>
    );
  }
}

export default connectInfiniteHits(InfiniteHits);
