import React, { Component, useEffect, useState, useRef } from 'react';
import SearchSingleGrid from '../../SearchPage/SearchGrid/SearchSingleGrid/SearchSingleGrid';
import { getWearWithProduct } from '../../../components/shared/query/query';
import { useLazyQuery } from '@apollo/client';

function ProductWearWith(props) {
  const [savedData, setSavedData] = useState('empty');

  const [products, setProducts] = useState();

  const [getWearWithProductQuery, { data: getWearWithProductData, error: getWearWithProductError }] = useLazyQuery(
    getWearWithProduct,
  );

  const outerElement = useRef();

  useEffect(() => {
    let chosenTag;
    if (props.baseProductData.tags && savedData === 'empty') {
      let allowed = false;
      for (let singleTag of props.baseProductData.tags) {
        if (singleTag.includes('wearWith_')) {
          chosenTag = singleTag;
          allowed = true;
          break;
        }
      }
      if (allowed) {
        let splitIds = chosenTag.replace('wearWith_', '').split('-');
        setSavedData('waiting');
        let changedIds = [];
        for (let singleId of splitIds) {
          changedIds.push(btoa('gid://shopify/Product/' + singleId));
        }
        getWearWithProductQuery({
          variables: {
            productIds: changedIds,
            currencyCode: props.currency.currencyCode,
          },
        });
      }
    }
  }, [props.baseProductData]);

  let singleGridWidth = 0;

  if (outerElement.current && outerElement.current.offsetWidth) {
    if (window.innerWidth >= 1024) {
      singleGridWidth = outerElement.current.offsetWidth / 4 - 4;
    }
    if (window.innerWidth <= 1023) {
      singleGridWidth = outerElement.current.offsetWidth / 3;
    }
    if (window.innerWidth < 769) {
      singleGridWidth = outerElement.current.offsetWidth / 2;
    }
    if (window.innerWidth < 541) {
      singleGridWidth = outerElement.current.offsetWidth / 2;
    }
  }

  useEffect(() => {
    if (getWearWithProductError) {
      console.log(getWearWithProductError);
    }
    if (getWearWithProductData) {
      let showingProducts = [];

      for (let [index, singleNode] of getWearWithProductData.nodes.entries()) {
        if (singleNode) {
          let secondary_image;
          if (singleNode.images.edges[2]) {
            secondary_image = singleNode.images.edges[2].node.originalSrc;
          } else if (singleNode.images.edges[1]) {
            secondary_image = singleNode.images.edges[1].node.originalSrc;
          } else {
            secondary_image = singleNode.images.edges[0].node.originalSrc;
          }
          let chosenColor;
          for (let singleOption of singleNode.options) {
            if (singleOption.name === 'Color') {
              chosenColor = singleOption.values[0];
            }
          }

          let sendingAlgoliaProduct = {
            compare_at_price:
              singleNode.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice &&
              singleNode.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount,
            handle: singleNode.handle && singleNode.handle,
            id: singleNode.id && singleNode.id,
            image: singleNode.images.edges[0].node.originalSrc && singleNode.images.edges[0].node.originalSrc,
            named_tags: { secondary_image: secondary_image },
            named_tags_names: ['secondary_image'],
            position: 0,
            price:
              singleNode.variants.edges[0].node.presentmentPrices.edges[0].node.price &&
              singleNode.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount,
            product_image: singleNode.images.edges[0].node.originalSrc,
            product_type: singleNode.productType,
            tags: singleNode.tags,
            title: singleNode.title,
            vendor: singleNode.vendor,
            options: {
              color: chosenColor,
            },
          };
          showingProducts.push(
            <div className="col-lg-3 col-6" style={{ padding: '0px', paddingLeft: '2px', paddingRight: '2px' }}>
              <SearchSingleGrid
                key={index}
                rowIndex={index}
                source={{
                  origin: 'productRecommendation',
                }}
                hit={sendingAlgoliaProduct}
                currency={props.currency}
                gridWidth={singleGridWidth}
              />
            </div>,
          );
        }
      }

      setProducts(showingProducts);
    }
  }, [getWearWithProductData, getWearWithProductError]);

  return (
    <div ref={outerElement} className="row" style={{ margin: '0px' }}>
      {products}
    </div>
  );
}

export default React.memo(ProductWearWith);
