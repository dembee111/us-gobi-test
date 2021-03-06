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
  const [pathName, setPathName] = useState('/');
  const gridRef = useRef();
  const [newProducts, setNewProducts] = useState();

  let desktopProducts;
  let sendingHits = JSON.parse(JSON.stringify(props.hits));
  if (sendingHits.length > 0) {
    sendingHits.splice(7, 0, {
      specialType: 'countpage',
    });
  }
  let sendingArray = [];
  if (sendingHits.length > 0) {
    let tempProductArray = [];

    for (let [index, singleHit] of sendingHits.entries()) {
      if (props.hasMore) {
        if (singleHit.specialType) {
          if (singleHit.specialType === 'countpage' && props.source && props.source.origin === 'collection') {
            tempProductArray.push(
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'new-accessories' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner2 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'women-accessories' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner2 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'women' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner2 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories-shawl' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner2 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories-scarf' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner2 />
              </div>,

              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'new' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner3 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'home' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner3 />
              </div>,

              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner4 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'men-accessories' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner4 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories-hat' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner4 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories-socks' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner4 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories-hat-and-scarf-set' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner4 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'sale' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner1 />
              </div>,
            );
          }
        } else {
          tempProductArray.push(
            <div key={makeid(4)} style={{ padding: '0px' }} className="col-lg-3 col-4">
              <SearchSingleGrid
                rowIndex={index}
                source={props.source}
                hit={singleHit}
                currencyTable={props.currencyTable}
                currency={props.currency}
                filterEnabled={props.filterEnabled}
                gridWidth={props.gridWidth / 4 - 4}
              />
            </div>,
          );
        }

        if (tempProductArray.length === 4) {
          sendingArray = sendingArray.concat(tempProductArray);
          tempProductArray = [];
        }
      } else {
        if (singleHit.specialType) {
          if (singleHit.specialType === 'countpage' && props.source && props.source.origin === 'collection') {
            sendingArray.push(
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'new-accessories' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner2 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'women-accessories' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner2 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'women' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner2 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories-shawl' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner2 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 2px 24px' }} className={
                props.source.handle === 'accessories-scarf' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner2 />
              </div>,

              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'new' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner3 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'home' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner3 />
              </div>,

              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner4 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'men-accessories' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner4 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories-hat' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner4 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories-socks' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner4 />
              </div>,
              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'accessories-hat-and-scarf-set' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner4 />
              </div>,

              <div key={makeid(4)} style={{ padding: '0 0px 24px' }} className={
                props.source.handle === 'sale' ? 'col-lg-3 col-4 show' : 'hide'
              }>
                <CollectionSingleBanner1 />
              </div>,

            );
          }
        } else {
          sendingArray.push(
            <div key={makeid(4)} style={{ padding: '0px' }} className="col-lg-3 col-4">
              <SearchSingleGrid
                rowIndex={index}
                source={props.source}
                hit={singleHit}
                currencyTable={props.currencyTable}
                currency={props.currency}
                filterEnabled={props.filterEnabled}
                gridWidth={props.gridWidth / 4 - 4}
              />
            </div>,
          );
        }
      }
    }
  }
  desktopProducts = <div className="row"> {sendingArray} </div>;

  return (
    <div>
      <div ref={gridRef}>{desktopProducts}</div>

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
              alt="Gobi Cashmere"
            ></img>
          </div>
        </div>
      )}
    </div>
  );
}
export default connect(mapStateToProps)(React.memo(InnerDesktopSearchGrid));
