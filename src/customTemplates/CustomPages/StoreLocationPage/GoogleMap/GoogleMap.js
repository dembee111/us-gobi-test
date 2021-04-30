import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => (
  <div
    style={{
      color: 'white',
      display: 'inline-flex',
      flexDirection: 'column',
      textAlign: 'center',
      position: 'absolute',
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
    }}
  >
    <img
      src="https://cdn.shopify.com/s/files/1/0249/6551/3262/files/Group_1573.png?v=1609921837"
      alt="Gobi Cashmere"
    ></img>
  </div>
);

export default class GoogleMap extends React.Component {
  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAiK4Ivg9mwAiWYAYzBYLSUZC4mM7rkEU0' }}
          center={this.props.cord}
          zoom={15}
        >
          {this.props.storeData.map((item, index) => (
            <AnyReactComponent
              key={index}
              lat={item.geometry.coordinates[1]}
              lng={item.geometry.coordinates[0]}
              text="text"
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}
