import React, { useState, useEffect } from "react"
import { connect } from 'react-redux';
import { productSizeParser } from '../../customTemplates/ProductPage/ProductHelpers';
import { addGiftToCart, getMaxAvailableVariant } from '../../components/shared/cart/CartHelpers';

const SideDrawer = (props) => {
    const [selectedVariant, setSelectedVariant] = useState()
    const [selectedProduct, setSelectedProduct] = useState()
    const { products, rightSide } = props
    const [selectGift, setSelectGift] = useState();
    const [sensorWord, setSensorWord] = useState(false);

    const toggleClass = (product, index) => {
        setSelectedProduct(product)
        setSelectGift(index);
    };

    const capitalize = (str, lower = true) =>
        (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    ;

    function changeSelectedOption(event) {
        setSelectedVariant(event.target.value)
    }
    const handlePrepareToCart = () => {

        let lastVariant;

        // selectedProduct.variants.edges.map((variant, i) => {
        //     if (!selectedVariant && i === 4) {
        //         lastVariant = variant.node
        //     } else {
        //         if (variant.node.id === selectedVariant) {
        //             lastVariant = variant.node
        //         }
        //     }
        // })
        lastVariant = getMaxAvailableVariant(selectedProduct.variants.edges)
        addGiftToCart(lastVariant, selectedProduct)

        props.setRightSide(false)
    }

    function handleImageVariant(product) {

        if (!product) return null;
        let variantEdges = product.variants.edges
        let maxQuantity = 0;
        let maxIndex = 0
        let maxVariant = variantEdges[0] && variantEdges[0].node;
        variantEdges && variantEdges.map((variantEdge, index) => {
            if (variantEdge.node.quantityAvailable > maxQuantity) {
                maxQuantity = variantEdge.node.quantityAvailable;
                maxVariant = variantEdge.node;
                maxIndex = index
            }
        })
        return maxIndex;
    }
    console.log(sensorWord)
    console.log(selectedProduct)
    return (
        <div className={`card-modal ${rightSide ? 'open' : ''}`}>
            <div className="modal-back" onClick={() => props.setRightSide(false)}></div>
            <div className="card-side">
                <div className="card-side-header">
                    <p className="h-tt">Select a gift</p>
                    <div className="close_icon" onClick={() => props.setRightSide(false)}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 1L1 17" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 1L17 17" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className="card-side-body">
                    <div className="description">
                        <p>{`Here's a treat! A complimentary CASHMERE SCARF with your order.\nWe're gifting an ultra-soft, cozy scarf to help you feel warm on the outside and feel good on the inside.\n`}</p>
                        <p>{`Select your gift to add to bag.`}</p>
                    </div>
                    <div className="gift-list">
                        {products && products.map((product, i) => (
                            <div key={i} className={`list-box ${selectGift === i ? 'selected' : ''}`} onClick={() => toggleClass(product, i)} >
                                <div className="img">
                                    <img
                                        src={product.variants.edges[handleImageVariant(product)].node.image.src}
                                        // src={handleImageVariant(product)}
                                        alt="Gobi Cashmere"
                                    />
                                </div>
                                <div className="detail">
                                    <div className="top">
                                        <p className="pr_tt">{capitalize(product.title)}</p>
                                        {/* <div className="price">
                                            <div className="price-box">
                                                <p className="sale-price">{props.currency.currencySymbol}{product.variants.edges[0].node.presentmentPrices.edges[0].node.price.amount}</p>
                                                <p className="price-default sale">{props.currency.currencySymbol} 0.0</p>
                                            </div>
                                        </div> */}
                                        <div className="color">
                                            <p className="color-tt">Color</p>
                                            <div className="color-text">{product.variants.edges[0].node.selectedOptions[1].value}</div>
                                        </div>
                                        <div className="size_quantity">
                                            <div className="size">
                                                <label id="size-select" className="size-tt">
                                                    Size
                                                </label>
                                                <div className="custom_select">
                                                    {product.productType === "Gift20" ? (
                                                        <select aria-labelledby="size-select" onChange={(event) => changeSelectedOption(event)}>
                                                            <option value={product.variants.edges[0].node.id}>{product.variants.edges[0].node.selectedOptions[0].value}</option>
                                                        </select>
                                                    ) : (
                                                        <select aria-labelledby="size-select" onChange={(event) => changeSelectedOption(event)}>
                                                            {product.variants.edges.map((variant, index) => {
                                                                let size = '';
                                                                variant.node.selectedOptions.map((selectedOption) => {
                                                                    if (selectedOption.name === 'Size') {
                                                                        size = selectedOption.value;
                                                                    }
                                                                });
                                                                if (variant && variant.node && variant.node.quantityAvailable > 0) {
                                                                    return (
                                                                        <option key={index} selected={size === props.size} value={variant.node.id} >{productSizeParser(size, props.gender)}</option>
                                                                    );
                                                                }
                                                            })}
                                                        </select>
                                                    )}
                                                    {product.productType === "Gift20" ? "" : (
                                                        <div className="custom_select-icon">
                                                            <svg
                                                                width="14"
                                                                height="8"
                                                                viewBox="0 0 14 8"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M1 1L7 7L13 1" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                            {/* <div className="quantity">
                                                <label id="quantity-select" className="quantity-tt">
                                                    Quantity
                                                </label>
                                                <div className="custom_select">
                                                    <select aria-labelledby="quantity-select">
                                                        <option value="1" defaultValue>
                                                            1
                                                        </option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                                                    <div className="custom_select-icon">
                                                        <svg
                                                            width="14"
                                                            height="8"
                                                            viewBox="0 0 14 8"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M1 1L7 7L13 1" stroke="#4F5255" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card-side-footer">
                    <div className="footer-button">
                        <button className="apply-btn" disabled={!selectedProduct && true} onClick={handlePrepareToCart}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currency: state.currency
});

export default connect(mapStateToProps)(SideDrawer)