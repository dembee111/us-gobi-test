import React, { Component } from 'react';
import SearchGridCustom from '../SearchGridCustom/SearchGridCustom';
import { getInitCollectionProducts, getAfterCollectionProducts } from '../CollectionHelper';
import './InfiniteHitsCustom.scss';

class InfiniteHitsCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
      productData: [],
      facets: null,
      filter: {
        tags: [],
        color: [],
        sizes: [],
        productType: [],
        price: null,
        sort: null,
      },
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
    entries.forEach((entry) => {
      if (entry.isIntersecting && this.state.showLoader) {
        if (this.state.productData.length === 0) {
          getInitCollectionProducts(
            decodeURIComponent(this.props.source.handle),
            24,
            this.state.productData.length,
            this.state.filter,
          ).then((productResult) => {
            if (productResult) {
              if (productResult.products && productResult.products.length < 24) {
                this.setState({
                  showLoader: false,
                });
              }
              let newProductData = [];
              for (let singleProduct of productResult.products) {
                newProductData.push({
                  compare_at_price: singleProduct.compare_at_price,
                  handle: singleProduct.handle,
                  id: singleProduct.id,
                  image: singleProduct.image_first,
                  named_tags: {
                    secondary_image: singleProduct.image_second,
                  },
                  options: {
                    color: singleProduct.color,
                  },
                  price: singleProduct.price,
                  product_image: singleProduct.image_first,
                  product_type: singleProduct.product_type,
                  tags: singleProduct.tags,
                  title: singleProduct.title,
                });
              }

              this.setState({
                productData: newProductData,
              });
              this.setState({
                facets: productResult.facets,
              });
            }
          });
        } else {
          getAfterCollectionProducts(
            decodeURIComponent(this.props.source.handle),
            24,
            this.state.productData.length,
            this.state.filter,
          ).then((productResult) => {
            if (productResult) {
              if (productResult.products && productResult.products.length < 24) {
                this.setState({
                  showLoader: false,
                });
              }
              let newProductData = JSON.parse(JSON.stringify(this.state.productData));

              for (let singleProduct of productResult.products) {
                newProductData.push({
                  compare_at_price: singleProduct.compare_at_price,
                  handle: singleProduct.handle,
                  id: singleProduct.id,
                  image: singleProduct.image_first,
                  named_tags: {
                    secondary_image: singleProduct.image_second,
                  },
                  options: {
                    color: singleProduct.color,
                  },
                  price: singleProduct.price,
                  product_image: singleProduct.image_first,
                  product_type: singleProduct.product_type,
                  tags: singleProduct.tags,
                  title: singleProduct.title,
                });
              }

              this.setState({
                productData: newProductData,
              });
            }
          });
        }
      }
    });
  };

  setFilter = (filter, newFilterValue) => {
    let clonedFilter = JSON.parse(JSON.stringify(this.state.filter));
    if (filter == 'price') {
      let splitValue = newFilterValue.split(':');
      let start = splitValue[0];
      let end = splitValue[1];
      if (start === '') {
        start = null;
      }
      if (end === '') {
        end = null;
      }
      if (clonedFilter[filter]) {
        console.log(clonedFilter[filter], start, end);
      }
      //
      if (
        clonedFilter[filter] &&
        '' + clonedFilter[filter].start === '' + start &&
        '' + clonedFilter[filter].end === '' + end
      ) {
        clonedFilter[filter] = null;
      } else {
        clonedFilter[filter] = {
          start: parseInt(start),
          end: parseInt(end),
          value: newFilterValue,
        };
      }
    } else if (filter == 'sort') {
      if (newFilterValue) {
      }
      clonedFilter.sort = newFilterValue;
    } else if (filter == 'clear') {
      clonedFilter = {
        tags: [],
        color: [],
        sizes: [],
        productType: [],
        price: null,
        sort: null,
      };
    } else {
      if (Array.isArray(newFilterValue)) {
        for (let singleValue of newFilterValue) {
          if (clonedFilter[filter].includes(singleValue)) {
            let indexElement = clonedFilter[filter].indexOf(singleValue);
            if (indexElement != -1) {
              clonedFilter[filter].splice(indexElement, 1);
            }
          } else {
            clonedFilter[filter].push(singleValue);
          }
        }
      } else {
        if (clonedFilter[filter].includes(newFilterValue)) {
          let indexElement = clonedFilter[filter].indexOf(newFilterValue);
          if (indexElement != -1) {
            clonedFilter[filter].splice(indexElement, 1);
          }
        } else {
          clonedFilter[filter].push(newFilterValue);
        }
      }
    }

    this.setState({
      filter: clonedFilter,
    });
    console.log(clonedFilter);

    getInitCollectionProducts(decodeURIComponent(this.props.source.handle), 24, 0, clonedFilter).then(
      (productResult) => {
        if (productResult) {
          if (productResult.products && productResult.products.length < 24) {
            this.setState({
              showLoader: false,
            });
          } else {
            this.setState({
              showLoader: true,
            });
          }
          let newProductData = [];
          for (let singleProduct of productResult.products) {
            newProductData.push({
              compare_at_price: singleProduct.compare_at_price,
              handle: singleProduct.handle,
              id: singleProduct.id,
              image: singleProduct.image_first,
              named_tags: {
                secondary_image: singleProduct.image_second,
              },
              options: {
                color: singleProduct.color,
              },
              price: singleProduct.price,
              product_image: singleProduct.image_first,
              product_type: singleProduct.product_type,
              tags: singleProduct.tags,
              title: singleProduct.title,
            });
          }

          this.setState({
            productData: newProductData,
          });
          this.setState({
            facets: productResult.facets,
          });
        }
      },
    );
  };

  render() {
    return (
      <div>
        <SearchGridCustom
          currency={this.props.currency}
          source={this.props.source}
          hits={this.state.productData}
          facets={this.state.facets}
          showLoader={this.state.showLoader}
          setFilter={this.setFilter}
          filter={this.state.filter}
        ></SearchGridCustom>

        <div className="ais-InfiniteHits-sentinel" ref={(c) => (this.sentinel = c)} />
      </div>
    );
  }
}

export default InfiniteHitsCustom;
