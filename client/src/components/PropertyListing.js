// src/components/PropertyListing.js

import React from 'react';

function PropertyListing({ imageSrc, price, bedrooms, bathrooms }) {
  return (
    <div className="property-listing">
      <img src={imageSrc} alt="Property" className="property-image" />
      <div className="property-details">
        <div className="property-price">${price}</div>
        <div className="property-bed-bath">
          {bedrooms} Bedrooms | {bathrooms} Bathrooms
        </div>
      </div>
    </div>
  );
}

export default PropertyListing;
