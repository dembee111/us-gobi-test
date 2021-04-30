import React, { useState } from 'react';
import GoogleMap from '../GoogleMap/GoogleMap';

const storesList = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [13.321677, 52.503762],
    },
    properties: {
      title: 'Gobi Mongolian Cashmere',
      phone: '+49 030 2246 6510',
      schedule: ['Mon-Fri: 11:00 - 19:00', 'Sat: 11:00 - 16:00', 'Sun: Closed'],
      address: 'Knesebeckstr 30, 10623, Berlin, Germany',
      city: 'Berlin',
      img: {
        url: 'https://cdn.shopify.com/s/files/1/0098/6044/8292/files/Flag_of_Germany.svg?v=1584581963',
        altText: 'Flag of Germany',
      },
    },
  },
];
export default function FlagshipStore() {
  const [cord, setCord] = useState({
    lat: storesList[0].geometry.coordinates[1],
    lng: storesList[0].geometry.coordinates[0],
  });
  return (
    <div className="flagship-sec">
      <div className="flag-left">
        <div className="map-box">
          <GoogleMap storesList={storesList} cord={cord} />
        </div>
      </div>
      <div className="flag-right">
        <div className="desk-box">
          {storesList.map((item, index) => (
            <div key={index}>
              <div
                className="store-item"
                onClick={(event) => {
                  setCord({
                    lat: item.geometry.coordinates[1],
                    lng: item.geometry.coordinates[0],
                  });
                }}
              >
                <div className="store-item-img">
                  <img alt={item.properties.img.altText} src={item.properties.img.url} />
                  <div className="store-log-title">
                    <h1>{item.properties.city}</h1>
                  </div>
                </div>

                <div className="store-desc">
                  <p>{item.properties.title}</p>
                  <p>{item.properties.address}</p>
                  <span>
                    Tel:
                    {item.properties.phone}
                  </span>
                  {item.properties.schedule.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
