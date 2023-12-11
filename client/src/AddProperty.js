import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Buffer } from 'buffer';
import { useLocation } from 'react-router-dom';
// import jwt_decimport jwtDecode from 'jwt-decode';
import jwtDecode from 'jwt-decode';

class AddProperty extends Component {
  


  constructor(props) {
    super(props);
    this.state = {
      
      username: props.username || '', // Use the prop here
      price: '',
      zipCode: '',
      bedrooms: '',
      bathrooms: '',
      houseType: '',
      parkingSpace: '',
      basement: '',
      flooring: '',
      heating: '',
      field2: 'random',
      cooling: '',
      interiorLivableArea: '',
      squareFeet: '',
      structureArea: '',
      cornerLot: '',
      parkingFeatures: '',
      fencing: '',
      pool: '',
      propertyImage: '',
      type: 'rent',
      lat: '',
      lng: '',
      homeType: '',
      architecturalStyle: '',
      propertySubType: '',
      constructionMaterial: '',
      foundation: '',
      roof: '',
      yearOfConstruction: '',
      electricInfo: '',
      serverInfo: '',
      waterInfo: '',
      utilitiesProvided: '',
      communityRegion: '',
      nearbyPoliceStation: '',
      nearbyFireStation: '',
      nearbySchools: '',
      address: '',
      roomates: '',
      minDuration:'',
      maxDuration:'',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 37.774929,
        lng: -122.419416
      },
      
      description:'',
      utilities: {
        electricity: false,
        water: false,
        // Add more utility options as needed
      },
     amenities: {
        ac: false,
        dryer: false,
        // Add more utility options
        refrigerator: false,
        washingMachine: false,
        microwave: false,
        other: false,
        
        // ... add more amenities as needed
      },
      nearBy: {
        schools: false,
        policestations: false,
        // Add more utility options
       hospitals : false,
        firestations: false,
        gasstations: false,
        other: false,
        
        // ... add more amenities as needed
      },
      leaseDuration: {
        '6months': false,
        '1year': false,
        // Add more lease duration options as needed
      },
      
      
    };
    // this.handleSubmit = this.handleSubmit.bind(this);

    // this.handleImageChange = this.handleImageChange.bind(this);
    // this.handlefield2Change = this.handlefield2Change.bind(this);
    // this.handleLeasePoliciesChange = this.handleLeasePoliciesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleBedroomsChange = this.handleBedroomsChange.bind(this);
    this.handletypeChange = this.handletypeChange.bind(this);
    this.handleBathroomsChange = this.handleBathroomsChange.bind(this);
    this.handleHouseTypeChange = this.handleHouseTypeChange.bind(this);
    this.handleParkingSpaceChange = this.handleParkingSpaceChange.bind(this);
    this.handleBasementChange = this.handleBasementChange.bind(this);
    this.handleFlooringChange = this.handleFlooringChange.bind(this);
    this.handleHeatingChange = this.handleHeatingChange.bind(this);
    this.handleCoolingChange = this.handleCoolingChange.bind(this);
    this.handleILAChange = this.handleILAChange.bind(this);
    this.handleSquareFeetChange = this.handleSquareFeetChange.bind(this);
    this.handleArchitecturalStyleChange = this.handleArchitecturalStyleChange.bind(this);
    this.handleConstructionMaterialChange = this.handleConstructionMaterialChange.bind(this);
    this.handleFoundationChange = this.handleFoundationChange.bind(this);
    this.handleYearOfConstructionChange = this.handleYearOfConstructionChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUtilityChange = this.handleUtilityChange.bind(this);
    this.handleAmenityChange = this.handleAmenityChange.bind(this);
    this.handleLeaseDurationChange = this.handleLeaseDurationChange.bind(this);
    this.handleRoomatesChange = this.handleRoomatesChange.bind(this);
    this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    this.handleNearChange = this.handleNearChange.bind(this);
    this.handleMinDurationChange = this.handleMinDurationChange.bind(this);
    this.handleMaxDurationChange = this.handleMaxDurationChange.bind(this);
  }
 
  componentDidMount() {
    // Assuming username is passed in location state
    const usernameFromProps = this.props.location?.state?.username;
    if (usernameFromProps) {
      this.setState({ username: usernameFromProps });
    }
  }
  handleAddressChange = (event) => {
    this.setState({ address: event.target.value });
  };

  componentDidMount() {
    this.loadAutocomplete();
  }

  
  loadAutocomplete = () => {
    if (!this.props.google || !this.props.google.maps) return;

    const maps = this.props.google.maps;
    this.autocomplete = new maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      { types: ['geocode'] }
    );

    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }
  handlePlaceSelect = () => {
    const place = this.autocomplete.getPlace();

    if (place.geometry) {
      this.setState({
        address: place.formatted_address,
        mapCenter: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      });
    }
  };

  

  handleSubmit = async (event) => {
    // Your existing submit handler logic
    event.preventDefault();
    // const { address } = this.state;
    console.log("submit")
    const { username } = this.props; // Assuming username is received as a prop
    console.log("Submitting with username:", username); // Debugging log


    const { type, bedrooms, address, mapCenter, image, bathrooms, houseType, parkingSpace, basement, flooring, heating, field2, cooling, price, interiorLivableArea,
      squareFeet, architecturalStyle, constructionMaterial, foundation, yearOfConstruction,description,utilities,amenities,leaseDuration,roomates,zipCode,nearBy,minDuration,maxDuration, } = this.state;


    try {
      const response = await fetch('http://localhost:9000/add-property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          bedrooms,
          address,
          lat: mapCenter.lat,
          lng: mapCenter.lng,
          bathrooms,
          houseType,
          parkingSpace,
          basement,
          flooring,
          heating,
          field2,
          cooling,
          price,
          interiorLivableArea,
          squareFeet,
          architecturalStyle,
          constructionMaterial,
          foundation,
          yearOfConstruction,
          username,
          description,
          utilities,
          amenities,
          leaseDuration,
          roomates,
          zipCode,
          nearBy,
          minDuration,
          maxDuration,
        }),
      });

      if (response.ok) {
        console.log('Property added successfully');
        alert("Property added successfullys")
        // Additional actions on success (e.g., clear form, display message)
      } else {
        console.error('Failed to add property');
        alert("Failed")
        // Handle server error response
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error
    }

  };
  // handleImageChange = () => {
  //   console.log("Image change ")
  // }
  handlePlaceSelect = () => {
    const place = this.autocomplete.getPlace();

    // Check if the place has a geometry property
    if (place.geometry && place.geometry.location) {
      this.setState({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        mapCenter: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }
      });
    } else {
      // Handle the situation where geometry is not available
      console.error('Selected place does not have location information.');
      // Optionally, reset the map center or give user feedback
    }
  };
  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };
  handleZipCodeChange = (event) => {
    this.setState({ zipCode: event.target.value });
  };
  handleAmenityChange = (amenity) => {
    if (amenity === 'other') {
      this.setState((prevState) => ({
        amenities: {
          ...prevState.amenities,
          other: !prevState.amenities.other,
          otherDescription: prevState.amenities.other ? '' : prevState.amenities.otherDescription,
        },
      }));
    } else {
      this.setState((prevState) => ({
        amenities: {
          ...prevState.amenities,
          [amenity]: !prevState.amenities[amenity],
        },
      }));
    }
  };
  
  
  handleUtilityChange = (utility) => {
    this.setState((prevState) => ({
      utilities: {
        ...prevState.utilities,
        [utility]: !prevState.utilities[utility],
      },
    }));
  };
  
  handleNearChange = (near) => {
    if (near === 'other') {
      this.setState((prevState) => ({
        nearBy: {
          ...prevState.nearBy,
          other: !prevState.nearBy.other,
          otherDescription: prevState.nearBy.other ? '' : prevState.nearBy.otherDescription,
        },
      }));
    } else {
      this.setState((prevState) => ({
        nearBy: {
          ...prevState.nearBy,
          [near]: !prevState.nearBy[near],
        },
      }));
    }
  };





  
  handleBedroomsChange = (e) => {
    this.setState({ bedrooms: e.target.value });
  };
  handletypeChange = (e) => {
    this.setState({ type: e.target.value });
  };

  handleBathroomsChange = (event) => {
    this.setState({ bathrooms: event.target.value });
  };

  handleHouseTypeChange = (event) => {
    this.setState({ houseType: event.target.value });
  };

  // New handler for parkingSpace
  handleParkingSpaceChange = (event) => {
    this.setState({ parkingSpace: event.target.value });
  };

  // New handler for basement
  handleBasementChange = (event) => {
    this.setState({ basement: event.target.value });
  };
  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };
  // New handler for flooring
  handleFlooringChange = (event) => {
    this.setState({ flooring: event.target.value });
  };

  // New handler for heating
  handleHeatingChange = (event) => {
    this.setState({ heating: event.target.value });
  };

  handlefield2Change(event) {
    this.setState({ field2: event.target.value });
  }

  handleCoolingChange = (event) => {
    this.setState({ cooling: event.target.value });
  };

  handleILAChange = (event) => {
    this.setState({ interiorLivableArea: event.target.value });
  };

  // New handler for squareFeet
  handleSquareFeetChange = (event) => {
    this.setState({ squareFeet: event.target.value });
  };
  handleLeaseDurationChange = (duration) => {
    this.setState((prevState) => ({
      leaseDuration: Object.fromEntries(
        Object.entries(prevState.leaseDuration).map(([key, value]) => [
          key,
          key === duration,
        ])
      ),
    }));
  };
  
 
  
  handleArchitecturalStyleChange = (event) => {
    this.setState({ architecturalStyle: event.target.value });
  };

  handleConstructionMaterialChange = (event) => {
    this.setState({ constructionMaterial: event.target.value });
  };
  handleRoomatesChange = (event) => {
    this.setState({ roomates: event.target.value });
  };

  handleMinDurationChange = (event) => {
    this.setState({ minDuration: event.target.value });
  };

  handleMaxDurationChange = (event) => {
    this.setState({ maxDuration: event.target.value });
  };


  handleFoundationChange = (event) => {
    this.setState({ foundation: event.target.value });
  };

  handleYearOfConstructionChange = (event) => {
    this.setState({ yearOfConstruction: event.target.value });
  };

  
  
  




  render() {
    const { username } = this.state; // Destructure username from state

    const { type, price, bedrooms, address, mapCenter, image, bathrooms, houseType, parkingSpace, basement, flooring, heating, cooling, field2, interiorLivableArea, squareFeet,leaseDuration,
      architecturalStyle, constructionMaterial, foundation, yearOfConstruction,description,utilities,amenities,roomates,zipCode,nearBy,minDuration,maxDuration,} = this.state;
    
      

    return (
      <div className="container mt-5">
        <h1 className="text-center">Add Property</h1>
        <h3>Username: {username}</h3>

        <form onSubmit={this.handleSubmit}>
         
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              className="form-control"
              value={type}
              onChange={this.handletypeChange}
            >
              <option value="buy">buy</option>
              <option value="rent">rent</option>
              <option value="sharedaccommodation">shared accomdations</option>
              <option value="serviceapartments">service apartments</option>
              <option value="commercial">commercial properities</option>
              {/* Add more options here if needed */}
            </select>
            
          </div>
          {type !== 'commercial' && (
    <div className="form-group">
    <label htmlFor="bathrooms">Bathrooms:</label>
    <input
      type="text"
      id="bathrooms"
      className="form-control"
      value={bathrooms}
      onChange={this.handleBathroomsChange}
    />
  </div>
  )}
  {type !== 'commercial' && (
  <div className="form-group">
            <label htmlFor="bedrooms">Bedrooms:</label>
            <input
              type="text"
              id="bedrooms"
              className="form-control"
              value={bedrooms}
              onChange={this.handleBedroomsChange}
            />
          </div>
  )}
          <div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            className="form-control"
            value={price}
            onChange={this.handlePriceChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">ZipCode:</label>
          <input
            type="text"
            id="zipCode"
            className="form-control"
            value={zipCode}
            onChange={this.handleZipCodeChange}
          />
        </div>
        <div className="form-group">
          <label>Amenities:</label>
          {Object.keys(amenities).map((amenity) => (
            <div key={amenity} className="form-check">
              <input
                type="checkbox"
                id={amenity}
                className="form-check-input"
                checked={amenities[amenity]}
                onChange={() => this.handleAmenityChange(amenity)}
              />
              <label htmlFor={amenity} className="form-check-label">
                {amenity === 'other' ? 'Other' : amenity}
              </label>
            </div>
          ))}
        </div>

        {amenities.other && (
          <div className="form-group">
            <label htmlFor="otherDescription">Other Description:</label>
            <input
              type="text"
              id="otherDescription"
              className="form-control"
              value={amenities.otherDescription}
              onChange={this.handleOtherDescriptionChange}
            />
          </div>
        )}
<div className="form-group">
          <label>NearBy:</label>
          {Object.keys(nearBy).map((amenity) => (
            <div key={nearBy} className="form-check">
              <input
                type="checkbox"
                id={nearBy}
                className="form-check-input"
                checked={nearBy[amenity]}
                onChange={() => this.handleNearChange(amenity)}
              />
              <label htmlFor={amenity} className="form-check-label">
                {amenity === 'other' ? 'Other' : amenity}
              </label>
            </div>
          ))}
        </div>

        {nearBy.other && (
          <div className="form-group">
            <label htmlFor="otherDescription">Other Description:</label>
            <input
              type="text"
              id="otherDescription"
              className="form-control"
              value={nearBy.otherDescription}
              onChange={this.handleOtherDescriptionChange}
            />
          </div>
        )}
        <div className="form-group">
          <label>Utilities:</label>
          <div className="form-check">
            <input
              type="checkbox"
              id="electricity"
              className="form-check-input"
              checked={utilities.electricity}
              onChange={() => this.handleUtilityChange('electricity')}
            />
            <label htmlFor="electricity" className="form-check-label">
              Electricity
            </label>
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              id="water"
              className="form-check-input"
              checked={utilities.water}
              onChange={() => this.handleUtilityChange('water')}
            />
            <label htmlFor="water" className="form-check-label">
              Water
            </label>
          </div>
          {/* Add more utility checkboxes as needed */}
        </div>
      </div>
          <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                className="form-control"
                value={description}
                onChange={this.handleDescriptionChange}
              />
            </div>
          {/* <div className="form-group">
            <label htmlFor="bathrooms">Bathrooms:</label>
            <input
              type="text"
              id="bathrooms"
              className="form-control"
              value={bathrooms}
              onChange={this.handleBathroomsChange}
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="houseType">House Type:</label>
            <input
              type="text"
              id="houseType"
              className="form-control"
              value={houseType}
              onChange={this.handleHouseTypeChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="parkingSpace">Parking Space:</label>
            <input
              type="text"
              id="parkingSpace"
              className="form-control"
              value={parkingSpace}
              onChange={this.handleParkingSpaceChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="basement">Basement:</label>
            <input
              type="text"
              id="basement"
              className="form-control"
              value={basement}
              onChange={this.handleBasementChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="flooring">Flooring:</label>
            <input
              type="text"
              id="flooring"
              className="form-control"
              value={flooring}
              onChange={this.handleFlooringChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="heating">Heating:</label>
            <input
              type="text"
              id="heating"
              className="form-control"
              value={heating}
              onChange={this.handleHeatingChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cooling">Cooling:</label>
            <input
              type="text"
              id="cooling"
              className="form-control"
              value={cooling}
              onChange={this.handleCoolingChange}
            />
          </div>


           <input type="submit" value="Submit" className="btn btn-primary" />

         
          {/* {type === 'buy' && (<Option1Fields interiorLivableArea={this.state.interiorLivableArea} handleILAChange={this.handleILAChange} architecturalStyle={this.state.architecturalStyle} handleArchitecturalStyleChange={this.handleArchitecturalStyleChange}/>)} */}
          {type === 'buy' && (
            <Option1Fields 
              interiorLivableArea={this.state.interiorLivableArea} 
              handleILAChange={this.handleILAChange}
              architecturalStyle={this.state.architecturalStyle}
              handleArchitecturalStyleChange={this.handleArchitecturalStyleChange}
              squareFeet={this.state.squareFeet}
              handleSquareFeetChange={this.handleSquareFeetChange}
              constructionMaterial={this.state.constructionMaterial}
              handleConstructionMaterialChange={this.handleConstructionMaterialChange}
              foundation={this.state.foundation}
              handleFoundationChange={this.handleFoundationChange}
              yearOfConstruction={this.state.yearOfConstruction}
              handleYearOfConstructionChange={this.handleYearOfConstructionChange}
              
              

            />
           
          )}
                    
          {/* {type === 'rent' && <Option2Fields field2={this.state.field2} handlefield2Change={this.handlefield2Change}  />} */}
          {type === 'rent' && (
            <Option2Fields 
              field2={this.state.field2} 
              handlefield2Change={this.handlefield2Change}
              leaseDuration={this.state.leaseDuration}
              handleLeaseDurationChange={this.handleLeaseDurationChange}
              
              
            />
          )}


          {type === 'sharedaccommodation' && <Option3Fields

            roomates={this.state.roomates}
            handleRoomatesChange={this.handleRoomatesChange}
            maxDuration={this.state.maxDuration}
            handleMaxDurationChange={this.handleMaxDurationChange}
            minDuration={this.state.minDuration}
            handleMinDurationChange={this.handleMinDurationChange}

           />}

          {type === 'serviceapartments' && <Option4Fields />}


          {type === 'commercial' && <Option5Fields 
          leaseDuration={this.state.leaseDuration}
          handleLeaseDurationChange={this.handleLeaseDurationChange}
          
          
          />}

          <div>
            <label>Address:</label>
            <input
              id="autocomplete"
              type="text"
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
              placeholder="Enter address"
            />
          </div>
          {/* Map Component */}
          <div style={{ height: '30px', width: '40px', margin: '20px 0' }}>
            <Map
              google={this.props.google}
              zoom={14}
              center={mapCenter}
            >
              <Marker position={mapCenter} />
            </Map>
          </div>


          {/* Other form fields */}
          {/* <input type="submit" value="Submit" className="btn btn-primary" /> */}
          {/* <button onClick={this.handleSubmit}>Submit</button> */}
        </form>
      </div>
    );
  }
}





const Option1Fields = ({
  interiorLivableArea, handleILAChange,
  architecturalStyle, handleArchitecturalStyleChange,
  squareFeet, handleSquareFeetChange,
  constructionMaterial, handleConstructionMaterialChange,
  foundation, handleFoundationChange,
  yearOfConstruction, handleYearOfConstructionChange,
}) => {
  return (
    
    <div>
      <div>
      <label htmlFor="interiorLivableArea">Interior Livable Area:</label>
      <input
        type="text"
        id="interiorLivableArea"
        value={interiorLivableArea}
        onChange={handleILAChange}
      />
    </div>

    <div>
      <label htmlFor="architecturalStyle">Architectural Style:</label>
      <input
        type="text"
        id="architecturalStyle"
        value={architecturalStyle}
        onChange={handleArchitecturalStyleChange}
      />
    </div>
    
      <div>
        <label htmlFor="squareFeet">Square Feet:</label>
        <input
          type="number"
          id="squareFeet"
          value={squareFeet}
          onChange={handleSquareFeetChange}
        />
      </div>
      
        
    
      <div>
        <label htmlFor="constructionMaterial">Construction Material:</label>
        <input
          type="text"
          id="constructionMaterial"
          value={constructionMaterial}
          onChange={handleConstructionMaterialChange}
        />
      </div>

      <div>
        <label htmlFor="foundation">Foundation:</label>
        <input
          type="text"
          id="foundation"
          value={foundation}
          onChange={handleFoundationChange}
        />
      </div>

      <div>
        <label htmlFor="yearOfConstruction">Year of Construction:</label>
        <input
          type="number"
          id="yearOfConstruction"
          value={yearOfConstruction}
          onChange={handleYearOfConstructionChange}
         
        />
      </div>
    </div>
  );
};




const Option2Fields = ({ leaseDuration, handleLeaseDurationChange,}) => {
  
  // Ensure the function is called with the event parameter
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    // Call the handler passed in the props
   
  };

  return (
    
    <div>
          <label>Lease Duration:</label>
          <div>
            <input
              type="radio"
              id="6months"
              name="leaseDuration"
              value="6months"
              checked={leaseDuration['6months']}
            onChange={() => handleLeaseDurationChange('6months')}
            />
            <label htmlFor="6months">6 Months</label>
          </div>
          <div>
            <input
              type="radio"
              id="1year"
              name="leaseDuration"
              value="1year"
              checked={leaseDuration['1year']}
            onChange={() => handleLeaseDurationChange('1year')}
            />
            <label htmlFor="1year">1 Year</label>
          </div>
          {/* Add more radio options if needed */}
        </div>
  );
};




const Option3Fields = ({ roomates, handleRoomatesChange,minDuration,handleMinDurationChange,maxDuration,handleMaxDurationChange}) => {
  return (
    <div>
    <div>
        <label htmlFor="roomates">Roomates:</label>
        <input
          type="text"
          id="roomates"
          value={roomates}
          onChange={handleRoomatesChange}
        />
      </div>

        <div>
                <label htmlFor="minDuration">MinDuration:</label>
                <input
                  type="text"
                  id="minDuration"
                  value={minDuration}
                  onChange={handleMinDurationChange}
                />
              </div>

              <div>
                <label htmlFor="maxDuration">MaxDuration:</label>
                <input
                  type="text"
                  id="maxDuration"
                  value={maxDuration}
                  onChange={handleMaxDurationChange}
                />
              </div>
</div>
      
  );
};

const Option4Fields = () => {
  return (
    <div>
      
    </div>
  );
};

const Option5Fields = ({ leaseDuration, handleLeaseDurationChange,}) => {
  // Ensure the function is called with the event parameter
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    // Call the handler passed in the props
   
  };

  return (
    
    <div>
          <label>Lease Duration:</label>
          <div>
            <input
              type="radio"
              id="6months"
              name="leaseDuration"
              value="6months"
              checked={leaseDuration['6months']}
            onChange={() => handleLeaseDurationChange('6months')}
            />
            <label htmlFor="6months">6 Months</label>
          </div>
          <div>
            <input
              type="radio"
              id="1year"
              name="leaseDuration"
              value="1year"
              checked={leaseDuration['1year']}
            onChange={() => handleLeaseDurationChange('1year')}
            />
            <label htmlFor="1year">1 Year</label>
          </div>
          {/* Add more radio options if needed */}
        </div>
  );
};


export default GoogleApiWrapper({
  apiKey: 'AIzaSyC-xlIZG2Moe4DsnUfKZ4M5YYeq9G1v_q4' // Replace with your actual API key
})(AddProperty);