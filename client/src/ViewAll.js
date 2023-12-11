import React, { useState } from 'react';

const ViewAll = (props) => {
  const {
    bedrooms,
    bathrooms,
    houseType,
    parkingSpace,
    petFriendly,
    amenities,
  } = props;

  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleContactClick = () => {
    // Toggle the visibility of contact information
    setShowContactInfo(!showContactInfo);
  };

  const handleCompareClick = () => {
    // Implement logic for the Compare button click
    console.log('Compare button clicked');
  };

  return (
    <div>
      <h2>View All Homes</h2>
      <p>Number of Bedrooms: {bedrooms}</p>
      <p>Number of Bathrooms: {bathrooms}</p>
      <p>House Type: {houseType}</p>
      <p>Parking Space Provided: {parkingSpace ? 'Yes' : 'No'}</p>
      <p>Pet Friendly: {petFriendly ? 'Yes' : 'No'}</p>
      <p>Amenities: {amenities.join(', ')}</p>
      
      {/* Buttons */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleContactClick}>Contact</button>
        <button onClick={handleCompareClick}>Compare</button>
      </div>

      {/* Display contact information if the state is true */}
      {showContactInfo && (
        <div style={{ marginTop: '20px' }}>
          <p>Contact Information:</p>
          <p>Phone: 312345456</p>
          <p>Email: abc@gmail.com</p>
        </div>
      )}
    </div>
  );
};

export default ViewAll;