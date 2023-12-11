import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';

import 'bootstrap/dist/css/bootstrap.min.css';

const SpecificPage = () => {
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9000/properties/${id}`);
        if (!response.ok) {
          throw new Error('Property not found');
        }
        const data = await response.json();
        setPropertyDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!propertyDetails) return <div className="alert alert-warning">No property details available</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Property Details</h1>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <img
                src={`data:${propertyDetails.image?.contentType};base64,${Buffer.from(propertyDetails.image?.data || '').toString('base64')}`}
                alt={propertyDetails.title}
                style={propertyImageStyles}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <div key={propertyDetails._id} style={propertyCardStyles}>
                <div><strong>Type:</strong> {propertyDetails.type}</div>
                <div><strong>Username:</strong> {propertyDetails.username}</div>
                <div><strong>Price:</strong> ${propertyDetails.price}</div>
                <div><strong>Bedrooms:</strong> {propertyDetails.bedrooms}</div>
                <div><strong>Bathrooms:</strong> {propertyDetails.bathrooms}</div>
                <div><strong>House Type:</strong> {propertyDetails.houseType}</div>
                <div><strong>Latitude:</strong> {propertyDetails.lat}</div>
                <div><strong>Longitude:</strong> {propertyDetails.lng}</div>
                <div><strong>Parking Space:</strong> {propertyDetails.parkingSpace}</div>
                <div><strong>Address:</strong> {propertyDetails.address}</div>
                <div><strong>ZipCode:</strong> {propertyDetails.zipCode}</div>

                {/* Conditionally render interiorLivableArea */}
                {propertyDetails.type === 'buy' && (
                  <>
                    <div><strong>Interior Livable Area:</strong> {propertyDetails.interiorLivableArea}</div>
                    <div><strong>Square Feet:</strong> {propertyDetails.squareFeet}</div>
                    <div><strong>Architectural Style:</strong> {propertyDetails.architecturalStyle}</div>
                    <div><strong>Construction Material:</strong> {propertyDetails.constructionMaterial}</div>
                    <div><strong>Foundation:</strong> {propertyDetails.foundation}</div>
                    <div><strong>Year Of Construction:</strong> {propertyDetails.yearOfConstruction}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const propertyCardStyles = {
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: '5px',
  overflow: 'hidden',
  marginBottom: '20px',
};

const propertyImageStyles = {
  width: '100%',
  height: 'auto',
  borderRadius: '5px',
};

export default SpecificPage;
