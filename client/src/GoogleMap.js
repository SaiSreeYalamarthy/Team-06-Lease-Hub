import React, { useEffect, useState } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const MapComponent = ({ google, filteredProperties }) => {
  useEffect(() => { }, []);

  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const getAverageLocation = () => {
    if (filteredProperties.length === 0) {
      return { lat: 0, lng: 0 };
    }
    return { lat: 0, lng: 0 };

  };

  const onMarkerClick = (markerProps, marker) => {
    setActiveMarker(marker);
    setSelectedItem(markerProps.item);
  };

  const onMapClick = () => {
    setActiveMarker(null);
    setSelectedItem(null);
  };



  return (
    <div>
      <Map google={google} zoom={1} initialCenter={getAverageLocation()} onClick={onMapClick}>
        {filteredProperties.map((item) => (
          <Marker
            key={item.id}
            position={{ lat: item.lat, lng: item.lng }}
            onClick={onMarkerClick}
            item={item}
          />
        ))}
        <InfoWindow
          marker={activeMarker}
          visible={activeMarker !== null}
        >
          <div key={selectedItem && selectedItem._id} style={{
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            transition: '0.3s',
            borderRadius: '5px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '20px',
          }}>
            <img
              src={`http://localhost:9000/${selectedItem && selectedItem.image}`}
              alt={selectedItem && selectedItem.title}
              style={{
                width: '100%',
                height: '150px',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                cursor: 'pointer',
              }}
            />
            <div style={{ padding: '2px 16px' }}>
              <h4><b>Price: {selectedItem && selectedItem.price}</b></h4>
              <p>Bedrooms: {selectedItem && selectedItem.bedrooms}</p>
              <p>Bathrooms: {selectedItem && selectedItem.bathrooms}</p>
            </div>

          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDUgwdRKXpIhR58jtW6nCrY_S2bzB4TTMA',
})(MapComponent);
