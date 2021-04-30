import React, { useEffect, useState, useRef } from 'react';
import Layout from '../../../components/layout';
import CardModal from './CardModal';
import { getProductByHandle, getProductRecommendations } from '../../../components/shared/query/query';
import { primeColorOrder, processSpecialColorName, initMetaTags } from '../../ProductPage/ProductHelpers';
import { useLazyQuery, useMutation } from '@apollo/client';
import { allPagesEvent, productDetailViewEvent } from '../../../components/shared/dataLayer/index';
import _ from 'lodash';
import Lists from './Lists';

function Instargam(props) {
  let { pageContext } = props;
  const [state, setState] = useState({
    lists: pageContext.products,
    handle: '',
    activeIndex: parseInt(''),
    filter: '',
    item: '',
    error: false,
  });
  const [hasExceededQuantity, setHasExceededQuantity] = useState(false);
  const [vatTextState, setVatTextState] = useState(false);
  const [openModal, setOpenModal] = useState('');
  const [smallModal, setSmallModal] = useState('');
  const [changeColorStyle, setChangecolor] = useState('');

  function setModal(id, item) {
    setOpenModal('open_modal');
    setState({
      ...state,
      activeIndex: id,
      handle: item.handle,
      item: item,
    });
  }
  const [baseProductData, setBaseProductData] = useState({
    images: {
      edges: [],
    },
  });
  function smallHandler(item) {
    setSmallModal('open_modal');
    setState({
      ...state,
      handle: item.handle,
      item: item,
    });
  }

  const [variant, setVariant] = useState();
  let goToPrevSlide = () => {
    let index = state.activeIndex;
    let length = parseInt(state.lists.length);
    if (index < 1) {
      index = length - 1;
    } else {
      index--;
    }
    setState({ ...state, activeIndex: index });
  };

  let goToNextSlide = () => {
    let nextindex = state.activeIndex;
    let length = parseInt(state.lists.length);
    if (nextindex == length - 1) {
      nextindex = 0;
    } else {
      nextindex++;
    }
    setState({
      ...state,
      activeIndex: nextindex,
    });
  };

  const [getProductByHandleQuery, { data: getProductByHandleData, error: getProductByHandleError }] = useLazyQuery(
    getProductByHandle,
  );

  // product recommendation query
  const [getProductRecommendationsQuery, { data: getProductRecommendationsData }] = useLazyQuery(
    getProductRecommendations,
  );
  const [imageChange, { data: getImage, error: getError }] = useLazyQuery(getProductByHandle);

  function handleProductData(product) {
    let firstAvailableSizeFound = false;
    product.sizeValues = [];
    product.variants.edges.map((variant, index) => {
      variant.node.selectedOptions.map((selectedOption) => {
        if (selectedOption.name === 'Size') {
          let chosen = false;
          if (!firstAvailableSizeFound && variant.node.availableForSale) {
            firstAvailableSizeFound = true;
            chosen = true;
            product.chosenSizeAvailability = variant.node.availableForSale;
          }
          product.sizeValues.push({
            chosen,
            value: selectedOption.value,
            availableForSale: variant.node.availableForSale,
            quantityAvailable: variant.node.quantityAvailable,
          });
        } else if (index === 0 && selectedOption.name === 'Color') {
          product.chosenColorValue = selectedOption.value;
        }
        return null;
      });
      return null;
    });

    let chosenColorValueProcessed;

    if (product.chosenColorValue) {
      chosenColorValueProcessed = processSpecialColorName(product.chosenColorValue);
    } else {
      chosenColorValueProcessed = '';
    }
    product.colorValues = [];
    let selfPicked = false;
    for (const singleColorOrder of primeColorOrder) {
      if (chosenColorValueProcessed === singleColorOrder) {
        selfPicked = true;
        product.colorValues.push({
          name: chosenColorValueProcessed,
          handle: `${product.handle}`,
          chosen: true,
        });
      }

      for (const singleTag of product.tags) {
        if (singleTag.includes('handle_')) {
          let colorName = singleTag.replace('handle_', '');
          colorName = colorName.slice(0, colorName.indexOf('+'));
          const handleValue = singleTag.replace(`handle_${colorName}+`, '');

          if (singleColorOrder === colorName) {
            product.colorValues.push({
              name: colorName,
              handle: `${handleValue}`,
              chosen: false,
            });
          }
        }
      }
    }

    for (const singleTag of product.tags) {
      let mark = true;
      if (singleTag.includes('handle_')) {
        let colorName = singleTag.replace('handle_', '');
        colorName = colorName.slice(0, colorName.indexOf('+'));
        const handleValue = singleTag.replace(`handle_${colorName}+`, '');
        for (const singleColorOrder of primeColorOrder) {
          if (singleColorOrder === colorName) {
            mark = false;
            break;
          }
        }
        if (mark) {
          product.colorValues.push({
            name: colorName,
            handle: `${handleValue}`,
            chosen: false,
          });
        }
      }
    }

    if (!selfPicked) {
      product.colorValues.push({
        name: chosenColorValueProcessed,
        handle: `${product.handle}`,
        chosen: true,
      });
    }

    return product;
  }

  let ProductPriceHelper = null;
  if (baseProductData.id) {
    ProductPriceHelper = (
      <div>
        {baseProductData.variants && baseProductData.variants.edges[0].node.presentmentPrices && (
          <div>
            {baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount &&
            baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount &&
            parseInt(baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount) >
              parseInt(baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount) ? (
              <div className="insta-sale">
                <span
                  className="insta-old"
                  style={{ color: '#000', textDecoration: 'line-through', marginRight: '20px' }}
                >
                  {'$'}
                  {parseInt(
                    baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount,
                    10,
                  )}
                </span>
                <span className="insta-new" style={{ color: ' #ea4335' }}>
                  {'$'}
                  {parseInt(baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount, 10)}
                </span>
                {vatTextState === true && <span> incl. VAT excl. shipping</span>}
                <div>
                  <p className="insta-title-sale">
                    You save {'$'}
                    {parseInt(
                      baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice.amount,
                      10,
                    ) -
                      parseInt(
                        baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount,
                        10,
                      )}{' '}
                    (
                    {100 -
                      parseInt(
                        (parseInt(
                          baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount,
                          10,
                        ) *
                          100) /
                          parseInt(
                            baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.compareAtPrice
                              .amount,
                            10,
                          ),
                      )}
                    %)
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p>
                  {'$'}
                  {parseInt(baseProductData.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount, 10)}
                </p>
                {vatTextState === true && <span> incl. VAT excl. shipping</span>}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  function changeSize(sizeName) {
    setHasExceededQuantity(false);
    const clonedProductData = JSON.parse(JSON.stringify(baseProductData));
    let chosenSize = '';
    for (const singleSize of clonedProductData.sizeValues) {
      singleSize.chosen = false;
      if (singleSize.value === sizeName) {
        singleSize.chosen = true;
        chosenSize = singleSize;
        clonedProductData.chosenSizeAvailability = singleSize.availableForSale;
      }
    }
    setBaseProductData(clonedProductData);

    let chosenVariant;
  }

  function changeColor(handle) {
    if (handle) {
      setState({ ...state, handle: handle });
      getProductByHandleQuery({
        variables: {
          handle: handle,
          currencyCode: 'USD',
        },
      });

      let product = JSON.parse(JSON.stringify(getProductByHandleData.productByHandle));
      if (product) {
        let firstAvailableSizeFound = false;
        product.sizeValues = [];
        product.variants.edges.map((variant, index) => {
          variant.node.selectedOptions.map((selectedOption) => {
            if (selectedOption.name === 'Size') {
              let chosen = false;
              if (!firstAvailableSizeFound && variant.node.availableForSale) {
                firstAvailableSizeFound = true;
                chosen = true;
                product.chosenSizeAvailability = variant.node.availableForSale;
              }
              product.sizeValues.push({
                chosen,
                value: selectedOption.value,
                availableForSale: variant.node.availableForSale,
                quantityAvailable: variant.node.quantityAvailable,
              });
            } else if (index === 0 && selectedOption.name === 'Color') {
              product.chosenColorValue = selectedOption.value;
            }
            return null;
          });
          return null;
        });

        let chosenColorValueProcessed;

        if (product.chosenColorValue) {
          chosenColorValueProcessed = processSpecialColorName(product.chosenColorValue);
        } else {
          chosenColorValueProcessed = '';
        }
        product.colorValues = [];
        let selfPicked = false;
        for (const singleColorOrder of primeColorOrder) {
          if (chosenColorValueProcessed === singleColorOrder) {
            selfPicked = true;
            product.colorValues.push({
              name: chosenColorValueProcessed,
              handle: `${product.handle}`,
              chosen: true,
            });
          }

          for (const singleTag of product.tags) {
            if (singleTag.includes('handle_')) {
              let colorName = singleTag.replace('handle_', '');
              colorName = colorName.slice(0, colorName.indexOf('+'));
              const handleValue = singleTag.replace(`handle_${colorName}+`, '');

              if (singleColorOrder === colorName) {
                product.colorValues.push({
                  name: colorName,
                  handle: `${handleValue}`,
                  chosen: false,
                });
              }
            }
          }
        }

        for (const singleTag of product.tags) {
          let mark = true;
          if (singleTag.includes('handle_')) {
            let colorName = singleTag.replace('handle_', '');
            colorName = colorName.slice(0, colorName.indexOf('+'));
            const handleValue = singleTag.replace(`handle_${colorName}+`, '');
            for (const singleColorOrder of primeColorOrder) {
              if (singleColorOrder === colorName) {
                mark = false;
                break;
              }
            }
            if (mark) {
              product.colorValues.push({
                name: colorName,
                handle: `${handleValue}`,
                chosen: false,
              });
            }
          }
        }

        if (!selfPicked) {
          product.colorValues.push({
            name: chosenColorValueProcessed,
            handle: `${product.handle}`,
            chosen: true,
          });
        }

        return setBaseProductData(product);
      }
    }
  }

  useEffect(() => {
    if (state.handle) {
      getProductByHandleQuery({
        variables: {
          handle: state.handle,
          currencyCode: 'USD',
        },
      });
    }
  }, [state.handle]);

  useEffect(() => {
    if (getProductByHandleData) {
      if (!getProductByHandleData.productByHandle) {
        setState({ ...state, error: true });
      } else {
        let product = JSON.parse(JSON.stringify(getProductByHandleData.productByHandle));
        product = handleProductData(product);
        setBaseProductData(product);
        setState({ ...state, error: false });
      }
    }
  }, [getProductByHandleData]);

  // useEffect(() => {
  //   if (getImage) {
  //     let product = JSON.parse(JSON.stringify(getImage.productByHandle));
  //     setChangecolor(product);
  //   }
  // }, [getImage]);

  useEffect(() => {
    if (baseProductData && baseProductData.sizeValues && baseProductData.variants) {
      let chosenSizeValue = '';
      for (const sizeValue of baseProductData.sizeValues) {
        if (sizeValue.chosen) {
          chosenSizeValue = sizeValue.value;
        }
      }
      for (let singleVariant of baseProductData.variants.edges) {
        singleVariant = singleVariant.node;
        for (const singleSelectedOptions of singleVariant.selectedOptions) {
          if (singleSelectedOptions.name === 'Size') {
            if (singleSelectedOptions.value === chosenSizeValue) {
              setVariant(singleVariant);
            }
          }
        }
      }
    }
  }, [baseProductData]);

  return (
    <Layout>
      <Lists intagramLists={state.lists} setModal={setModal} />
      <CardModal
        baseProductData={baseProductData}
        ProductPriceHelper={ProductPriceHelper}
        changeSize={changeSize}
        data={state.item}
        imageChange={imageChange}
        changeColor={changeColor}
        changeColorStyle={changeColorStyle}
        smallHandler={smallHandler}
        goToNextSlide={goToNextSlide}
        goToPrevSlide={goToPrevSlide}
        activeIndex={state.activeIndex}
        openModal={openModal}
        setOpenModal={setOpenModal}
        lists={state.lists}
        handle={state.handle}
        smallModal={smallModal}
        setSmallModal={setSmallModal}
        setChangecolor={setChangecolor}
        setHasExceededQuantity={setHasExceededQuantity}
        hasExceededQuantity={hasExceededQuantity}
        variant={variant}
        error={state.error}
      />
    </Layout>
  );
}

export default Instargam;
