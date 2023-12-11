import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleMap from './GoogleMapService';

const Service = () => {
  const [services, setservices] = useState([]);
  const [serviceDetails, setFilteredservices] = useState([]);
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [bathroomsFilter, setBathroomsFilter] = useState('');
  const [search, setSearch] = useState('enter pincode or number...'); // Set default value

  const navigate = useNavigate();

  useEffect(() => {
    fetchservices();
  }, []);

  const fetchservices = async () => {
    try {
      const response = await fetch('http://localhost:9000/serviceMan');
      if (response.ok) {
        const services = await response.json();
        setservices(services);
        setFilteredservices(services);
      } else {
        throw new Error('Failed to fetch services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredservices = serviceDetails.filter((detail) => {
    const searchRegex = new RegExp(search, 'i');
    return (
      searchRegex.test(detail.occupation) ||
      searchRegex.test(detail.experience) ||
      searchRegex.test(detail.pincode) ||
      searchRegex.test(detail.name)||
      searchRegex.test(detail.phoneNumber)||
      searchRegex.test(detail.email)
    );
  });

  const containerStyles = {
    display: 'flex',
    height: 'calc(100vh - 40px)',
  };

  const mapStyles = {
    width: '70%',
    height: '80%',
    position: 'relative',
    overflow: 'hidden',
  };

  const listStyles = {
    width: '30%',
    overflowY: 'auto',
    padding: '20px',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Services</h1>
      <div className="form-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder={search}
          onFocus={() => setSearch('')} // Clear default value on focus
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <br />
      <div style={containerStyles}>
        <div style={mapStyles}>
          <GoogleMap filteredService={filteredservices} />
        </div>
        <div style={listStyles}>
          {filteredservices.map((service) => (
            <div key={service._id} style={{
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              transition: '0.3s',
              borderRadius: '5px',
              overflow: 'hidden',
              position: 'relative',
              marginBottom: '20px',
            }}>

              <div style={{ padding: '2px 16px' }}>
                <h4><b>Service:</b></h4>{service.occupation}
                <h6>name:</h6><p>{service.name}</p>
                <h6>experience:</h6><p> {service.experience}</p>
                <h6>pincode:</h6><p> {service.pincode}</p>
                <h6>description:</h6><p> {service.description}</p>
                <h6>PhoneNumber:</h6><p>{service.phoneNumber}</p>
                <h6>Email:</h6><p>{service.email}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;