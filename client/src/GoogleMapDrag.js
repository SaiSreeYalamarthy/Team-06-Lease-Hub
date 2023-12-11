import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapComponent = ({ google, setlat, setlng }) => {
  const [markerPosition, setMarkerPosition] = useState({ lat: 39.70391932884864, lng: -101.42690776875 });

  const onMarkerDragEnd = (coord, index) => {

    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
    setlat(lat);
    setlng(lng);
  };

  return (
    <div>
      <Map
        google={google}
        zoom={10}

        initialCenter={markerPosition}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
        />
      </Map>

    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDUgwdRKXpIhR58jtW6nCrY_S2bzB4TTMA',
})(MapComponent);
