


import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const Service = ({ google }) => {
  const [pinCode, setPinCode] = useState('');
  const [type, setType] = useState('');
  const [serviceDetails, setServiceDetails] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const handlePinCodeChange = (event) => {
    setPinCode(event.target.value);
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:9000/serviceMan');
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setServiceDetails(result);
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredServices = serviceDetails.filter((detail) => {
    const searchRegex = new RegExp(search, 'i');
    return (
      searchRegex.test(detail.occupation) ||
      searchRegex.test(detail.experience) ||
      searchRegex.test(detail.name)
    );
  });

  return (
    <div className="container mt-5 mx-auto">
      <h1 className="text-center">Services Available</h1>

      <div className="form-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="row mt-4">
        {filteredServices.map((detail, index) => (
          <div key={index} className="col-12 col-md-8 mb-3">
            <div className="service-card card">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="card-body">
                    <h5 className="card-title">Service:</h5> <p>{detail.occupation}</p>
                    <h6 className="card-text">Experience:</h6><p> {detail.experience}</p>
                    <h6 className="card-text">Name of Person: </h6><p>{detail.name}</p>
                    <h6 className="card-text">description:</h6> <p>{detail.description}</p>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div style={{ width: '100%', height: '200px' }}>
                    <Map google={google} zoom={10} initialCenter={{ lat: detail.lat, lng: detail.lng }} style={{ width: '100%', height: '100%' }}>
                      <Marker
                        key={detail.id}
                        position={{ lat: detail.lat, lng: detail.lng }}
                        item={detail}
                      />
                    </Map>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCuE-0LdTMxaafH330_lqyydjqxFUs4ThI',
})(Service);