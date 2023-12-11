import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // Assuming you're using react-bootstrap

const PropertyDetailPage = () => {
  const [property, setProperty] = useState(null);
  const { id } = useParams(); // Get property ID from URL
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:9000/property/${id}`);
        if (response.ok) {
          // const data = await response.json();
          throw new Error('Failed to fetch property details');
        }
        const data = await response.json();
        setProperty(data);
        } 
        // else {
        //   throw new Error('Failed to fetch property details');
        // }
       catch (error) {
        console.error('Error fetching property details:', error);
        setError(error.message);

      }
      setIsLoading(false);

    };

    fetchPropertyDetail();
  }, [id]);

  // if (!property) {
  //   return <div>Loading...</div>;
  // }
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!property) {
    return <div>No property found.</div>;
  }


  return (
    <div style={{ padding: '20px' }}>
      <h1>{property.title}</h1>
      <img src={`http://localhost:9000/${property.image}`} alt={property.title} />
      {/* Display all the details of the property */}
      <p>Price: {property.price}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      {/* Add more details as necessary */}
    </div>
  );
};

export default PropertyDetailPage;
