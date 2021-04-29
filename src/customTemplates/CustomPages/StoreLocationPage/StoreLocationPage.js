import React, { useEffect, useState } from 'react';
import './StoreLocationPage.scss';
import { storeData, storeHeaderData } from './StoreLocationData/StoreLocationData';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import GoogleMap from './GoogleMap/GoogleMap';

export default (function StoreLocationPage(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cord, setCord] = useState({
    lat: storeData[0].geometry.coordinates[1],
    lng: storeData[0].geometry.coordinates[0],
  });
  return (
    <div>
      <div className="store-location-page">
        <div className="section-header">
          {storeHeaderData.map((list, index) => {
            return (
              <div key={index}>
                <div className="bg-img bg-img-desktop">
                  <img
                    src={list.DesktopImage}
                    data-src={list.DesktopImage.replace('.jpg', '_1200x.jpg')}
                    data-sizes="auto"
                    alt="Store Location"
                    className="lazyload blur-up"
                  />
                </div>
                <div className="bg-img bg-img-mobile">
                  <img
                    src={list.MobileImage}
                    data-src={list.MobileImage.replace('.jpg', '_1200x.jpg')}
                    data-sizes="auto"
                    alt="Store Location"
                    className="lazyload blur-up"
                  />
                </div>
                <div className="section-header-title">
                  <h1>{list.title}</h1>
                </div>
              </div>
            );
          })}
        </div>
        <div className="map-title">
          <h1>Flagship Stores</h1>
        </div>
        <div className="section-map">
          <GoogleMap storeData={storeData} cord={cord} />
        </div>
        <div className="section-container">
          <div className="section-store-list">
            {storeData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="store-list-box"
                  onClick={(even) => {
                    setCord({
                      lat: item.geometry.coordinates[1],
                      lng: item.geometry.coordinates[0],
                    });
                  }}
                >
                  <div className="img-box">
                    <img
                      data-sizes="auto"
                      src={item.properties.storeImg.url.replace('.jpg', '_120x.jpg')}
                      data-src={item.properties.storeImg.url.replace('.jpg', '_1200x.jpg')}
                      className="lazyload blur-up"
                      alt="Store Location"
                    />
                  </div>
                  <div className="desc">
                    <h1>{item.properties.city}</h1>
                    <div className="address-schedule">
                      {item.properties.address.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>

                    <p>Tel: {item.properties.phone}</p>
                    <div className="location-schedule">
                      {item.properties.schedule.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
