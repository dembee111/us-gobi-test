import React, { Component } from 'react';
import SearchSingleGrid from '../../SearchPage/SearchGrid/SearchSingleGrid/SearchSingleGrid';
import { Swiper, Slide } from 'react-dynamic-swiper';
import 'react-dynamic-swiper/lib/styles.css';

class ProductRecommendation extends Component {
  render() {
    let singleGridWidth = 0;
    if (this.props.recommendationGrid.current && this.props.recommendationGrid.current.offsetWidth) {
      if (window.innerWidth >= 1024) {
        singleGridWidth = this.props.recommendationGrid.current.offsetWidth / 4 - 4;
      }
      if (window.innerWidth <= 1023) {
        singleGridWidth = this.props.recommendationGrid.current.offsetWidth / 3;
      }
      if (window.innerWidth < 769) {
        singleGridWidth = this.props.recommendationGrid.current.offsetWidth / 2;
      }
      if (window.innerWidth < 541) {
        singleGridWidth = this.props.recommendationGrid.current.offsetWidth / 2;
      }
    }

    const productsRecommendations = this.props.productRecomendationData.map((item, index) => {
      const product = JSON.parse(JSON.stringify(item));
      for (const singleTag of product.tags) {
        if (singleTag.includes('uniqueTag-')) {
          product.uniqueTag = singleTag;
          break;
        }
      }
      product.handle = `/products/${product.handle}`;

      product.colors = [];
      for (const singleTag of product.tags) {
        if (singleTag.includes('handle_')) {
          let color = singleTag.replace('handle_', '');
          const spliceIndex = color.indexOf('+');

          color = color.slice(0, spliceIndex);
          let handle = singleTag.replace(`handle_${color}+`, '');
          handle = `/products/${handle}`;
          product.colors.push({
            color,
            handle,
          });
        }
      }
      for (const option of product.options) {
        if (option.name === 'Color') {
          product.selectedColor = option.values[0];
        }
      }
      if (product.images.edges[0]) {
        product.selectedImg = product.images.edges[0].node.originalSrc;
      }

      if (product.images.edges[1]) {
        product.hoverImg = product.images.edges[1].node.originalSrc;
      } else if (product.images.edges[0]) {
        product.hoverImg = product.images.edges[0].node.originalSrc;
      }

      let sendingOptions = {};
      for (let singleOption of product.options) {
        if (singleOption.name === 'Color' && singleOption.values[0]) {
          sendingOptions = { color: singleOption.values[0] };
        }
      }
      let secondary_image;
      if (product.images.edges[2]) {
        secondary_image = product.images.edges[2].node.originalSrc;
      } else if (product.images.edges[1]) {
        secondary_image = product.images.edges[1].node.originalSrc;
      } else {
        secondary_image = product.images.edges[0].node.originalSrc;
      }
      let sendingAlgoliaProduct = {
        compare_at_price:
          product.variants.edges[0].node.compareAtPriceV2 && product.variants.edges[0].node.compareAtPriceV2.amount,
        handle: item.handle && item.handle,
        id: product.id && product.id,
        image: product.selectedImg && product.selectedImg,
        named_tags: { secondary_image: secondary_image && secondary_image },
        named_tags_names: ['secondary_image'],
        position: index + 1,
        price: product.variants.edges[0].node.priceV2 && product.variants.edges[0].node.priceV2.amount,
        product_image: product.selectedImg && product.selectedImg,
        product_type: product.productType && product.productType,
        tags: product.tags && product.tags,
        title: product.title && product.title,
        vendor: product.vendor && product.vendor,
        options: sendingOptions && sendingOptions,
      };

      return (
        <Slide className="Demo-swiper__slide" key={index}>
          <SearchSingleGrid
            rowIndex={index}
            source={{
              origin: 'productRecommendation',
            }}
            hit={
              sendingAlgoliaProduct && sendingAlgoliaProduct.id
                ? { ...sendingAlgoliaProduct, id: atob(sendingAlgoliaProduct.id).replace('gid://shopify/Product/', '') }
                : sendingAlgoliaProduct
            }
            currencyTable={this.props.currencyTable}
            currency={this.props.currency}
            gridWidth={singleGridWidth}
          />
        </Slide>
      );
    });
    return (
      <div className="tc_product_Recommendation" ref={this.props.recommendationGrid}>
        <Swiper
          swiperOptions={{
            slidesPerView: 4,
            spaceBetween: 4,
            breakpoints: {
              1023: {
                slidesPerView: 3,
                spaceBetween: 4,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 4,
              },
              540: {
                slidesPerView: 'auto',
                spaceBetween: 4,
              },
            },
            navigation: {
              nextEl: '.swiper-button-next-unique',
              prevEl: '.swiper-button-prev-unique',
            },
          }}
          loop={false}
          navigation={false}
          pagination={false}
        >
          {productsRecommendations}
        </Swiper>
        <div className="swiper-button-prev-unique"></div>
        <div className="swiper-button-next-unique"></div>
      </div>
    );
  }
}

export default React.memo(ProductRecommendation);
