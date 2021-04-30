import React, { Component, useState, useEffect, useRef } from 'react';
import SearchSingleGrid from './SearchSingleGrid/SearchSingleGrid';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import CountPage from '../CountPage/CountPage';
import CustomProgressBar from '../../../components/shared/customProgessBar/CustomProgressBar';
import CollectionSingleBanner1 from '../CollectionSingleBanner/CollectionSingleBanner1';
import CollectionSingleBanner2 from '../CollectionSingleBanner/CollectionSingleBanner2';
import CollectionSingleBanner3 from '../CollectionSingleBanner/CollectionSingleBanner3';
import CollectionSingleBanner4 from '../CollectionSingleBanner/CollectionSingleBanner4';
const mapStateToProps = (state) => ({
  currency: state.currency,
});

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function InnerDesktopSearchGrid(props) {
  let mobileProducts = [];
  let sendingHits = JSON.parse(JSON.stringify(props.hits));
  let sendingWidth = props.gridWidth / 2 - 4;
  if (typeof window !== `undefined` && window.innerWidth >= 768) {
    sendingWidth = props.gridWidth / 3 - 4;
    sendingHits.splice(3, 0, {
      specialType: 'countpage',
    });
  } else {
    sendingHits.splice(2, 0, {
      specialType: 'countpage',
    });
  }

  if (sendingHits.length > 0) {
    let tempProductArrayMobile = [];
    for (let [index, singleHit] of sendingHits.entries()) {
      if (singleHit.specialType) {
        if (singleHit.specialType === 'countpage' && props.source && props.source.origin === 'collection') {
          tempProductArrayMobile.push(

            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'new-accessories' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner2 />
            </div>,
            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'women-accessories' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner2 />
            </div>,
            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'women' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner2 />
            </div>,
            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'accessories-shawl' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner2 />
            </div>,
            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'accessories-scarf' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner2 />
            </div>,

            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'new' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner3 />
            </div>,
            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'home' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner3 />
            </div>,

            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'accessories' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner4 />
            </div>,
            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'men-accessories' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner4 />
            </div>,
            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'accessories-hat' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner4 />
            </div>,
            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'accessories-socks' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner4 />
            </div>,
            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'accessories-hat-and-scarf-set' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner4 />
            </div>,
            <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
              props.source.handle === 'sale' ? 'col-6 col-md-4 show' : 'hide'
            }>
              <CollectionSingleBanner1 />
            </div>,
          );
        }
      } else {
        tempProductArrayMobile.push(
          <div key={makeid(4)} className="col-6 col-md-4">
            <SearchSingleGrid
              rowIndex={index}
              source={props.source}
              currency={props.currency}
              hit={singleHit}
              filterEnabled={props.filterEnabled}
              gridWidth={sendingWidth}
              currencyTable={props.currencyTable}
            />
          </div>,
        );
      }
    }
    mobileProducts = (
      <div>
        <div className="row">{tempProductArrayMobile}</div>

        {props.showLoader && (
          <div style={{ height: '80px' }}>
            <div
              style={{
                left: '50%',
                position: 'relative',
                transform: 'translate(-50%,-50%)',
                top: '50%',
                width: '32px',
                height: '32px',
              }}
            >
              <img
                style={{
                  width: '32px',
                  height: '32px',
                }}
                src="https://cdn.shopify.com/s/files/1/1953/2845/files/785_1.gif?v=1597982910"
              ></img>
            </div>
          </div>
        )}
      </div>
    );
  }

  return mobileProducts;
}
export default connect(mapStateToProps)(React.memo(InnerDesktopSearchGrid));
