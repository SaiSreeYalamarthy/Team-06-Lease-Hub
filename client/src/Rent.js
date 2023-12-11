import React, { useState, useEffect } from 'react';
import GoogleMap from './GoogleMap';
import { useNavigate, useLocation } from 'react-router-dom';
import { Buffer } from 'buffer';


const RentPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [bathroomsFilter, setBathroomsFilter] = useState('');
  const [zipcodeFilter, setZipcodeFilter] = useState('');
  const [currentSlides, setCurrentSlides] = useState({});
  const [rentProperties, setRentProperties] = useState([]);

  const [priceRangeFilter, setPriceRangeFilter] = useState({ min: '', max: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const [wishlist, setWishlist] = useState(new Set());

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchWishlistStatus = async () => {
    const userUsername = localStorage.getItem('userUsername');
    try {
      const response = await fetch(`http://localhost:9000/wishlist/status?username=${encodeURIComponent(userUsername)}`);
      if (response.ok) {
        const { wishlistStatus } = await response.json();
        return new Set(wishlistStatus);
      } else {
        throw new Error('Failed to fetch wishlist status');
      }
    } catch (error) {
      console.error('Error fetching wishlist status:', error);
      return new Set();
    }
  };

  const handleNext = (propertyId) => {

    setCurrentSlides(prevSlides => ({

      ...prevSlides,

      [propertyId]: (prevSlides[propertyId] || 0) + 1

    }));

  };



  const handlePrev = (propertyId) => {

    setCurrentSlides(prevSlides => ({

      ...prevSlides,

      [propertyId]: Math.max((prevSlides[propertyId] || 0) - 1, 0)

    }));

  };


  const fetchPropertiesAndUpdateWishlist = async () => {
    try {
      const [propertiesResponse, wishlistStatus] = await Promise.all([
        fetch('http://localhost:9000/properties?type=rent'),
        fetchWishlistStatus(),
      ]);

      if (propertiesResponse.ok) {
        const properties = await propertiesResponse.json();
        const updatedProperties = properties.map(property => ({
          ...property,
          isAvailable: property.isAvailable !== undefined ? property.isAvailable : true,
          inWishlist: wishlistStatus.has(property._id),
        }));

        setProperties(updatedProperties);
        setFilteredProperties(updatedProperties);
        setWishlist(wishlistStatus);
      } else {
        throw new Error('Failed to fetch properties');
      }
    } catch (error) {
      console.error('Error fetching properties and wishlist status:', error);
    }
  };

  useEffect(() => {
    fetchPropertiesAndUpdateWishlist();
  }, []);

 
  const fetchProperties = async () => {

    try {

      const response = await fetch('http://localhost:9000/properties?type=rent');

      if (response.ok) {

        const properties = await response.json();

        const updatedProperties = properties.map(property => ({

          ...property,

          isAvailable: property.isAvailable !== undefined ? property.isAvailable : true,

        }));

        setRentProperties(updatedProperties);

        setFilteredProperties(updatedProperties);



        // Initialize currentSlides state for all properties

        const initialSlides = updatedProperties.reduce((acc, property) => {

          acc[property._id] = 0; // Initialize the slide index to 0 for each property

          return acc;

        }, {});



        setCurrentSlides(initialSlides);

      } else {

        throw new Error('Failed to fetch properties');

      }

    } catch (error) {

      console.error('Error fetching properties:', error);

    }

  };

  
  const renderImage = (property) => {

    if (!property || !property.images || property.images.length === 0) return <p>No image available</p>;



    const currentIndex = currentSlides[property._id] % property.images.length;

    const currentImage = property.images[currentIndex];



    const base64Url = `data:${currentImage.contentType};base64,${currentImage.data}`;

    return <img src={base64Url} alt={`Property ${property.title}`} />;

  };

  const handleSearch = () => {
    const result = properties.filter((property) => {
      const bedroomsMatch = bedroomsFilter === '' || parseInt(property.bedrooms) === parseInt(bedroomsFilter);
      const bathroomsMatch = bathroomsFilter === '' || parseInt(property.bathrooms) === parseInt(bathroomsFilter);
      const priceMatch =
        (priceRangeFilter.min === '' || parseInt(property.price) >= parseInt(priceRangeFilter.min)) &&
        (priceRangeFilter.max === '' || parseInt(property.price) <= parseInt(priceRangeFilter.max));
      const zipcodeMatch = zipcodeFilter === '' || parseInt(property.zipCode) === parseInt(zipcodeFilter);
      return bedroomsMatch && bathroomsMatch && priceMatch && zipcodeMatch;
    });
    setFilteredProperties(result);
  };

  const handlePropertyClick = (property) => {
    navigate(`/properties/${property._id}`, { state: { property } });
  };


  const toggleWishlist = async (property) => {
    const userUsername = localStorage.getItem('userUsername');
    const token = localStorage.getItem('userSession');
    const method = property.inWishlist ? 'DELETE' : 'POST';
    try {
      const response = await fetch(`http://localhost:9000/wishlist/${property._id}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userUsername })
      });

      const responseData = await response.json();
      if (response.ok) {
        setWishlist(prev => {
          const newWishlist = new Set(prev);
          if (property.inWishlist) {
            newWishlist.delete(property._id);
          } else {
            newWishlist.add(property._id);
          }
          return newWishlist;
        });

        setFilteredProperties(filteredProperties.map(p => {
          if (p._id === property._id) {
            return { ...p, inWishlist: !p.inWishlist };
          }
          return p;
        }));

        alert(`Property ${property.inWishlist ? 'successfully removed from' : 'added to'} wishlist`);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleCompareClick = () => {
    navigate('/specific/:id');
  };


  return (
    <div style={containerStyles}>
      <h1 style={headerStyles}>Welcome to the Rent Page</h1>
      <div style={filterContainerStyles}>
        <div style={filterInputStyles}>
          <input
            type="number"
            placeholder="Bedrooms"
            value={bedroomsFilter}
            onChange={(e) => setBedroomsFilter(e.target.value)}
          />
        </div>
        <div style={filterInputStyles}>
          <input
            type="number"
            placeholder="Bathrooms"
            value={bathroomsFilter}
            onChange={(e) => setBathroomsFilter(e.target.value)}
          />
        </div>
        <div style={filterInputStyles}>
          <input
            type="number"
            placeholder="Min Price"
            value={priceRangeFilter.min}
            onChange={(e) => setPriceRangeFilter({ ...priceRangeFilter, min: e.target.value })}
          />
        </div>
        <div style={filterInputStyles}>
          <input
            type="number"
            placeholder="Max Price"
            value={priceRangeFilter.max}
            onChange={(e) => setPriceRangeFilter({ ...priceRangeFilter, max: e.target.value })}
          />
        </div>
        <div style={filterInputStyles}>
          <input
            type="text"
            placeholder="Zipcode"
            value={zipcodeFilter}
            onChange={(e) => setZipcodeFilter(e.target.value)}
          />
        </div>
        <button onClick={handleSearch} style={searchButtonStyles}>
          Search
        </button>
      </div>
      <div style={contentStyles}>
        <div style={mapStyles}>
          <GoogleMap filteredProperties={filteredProperties} />
        </div>





        <div style={listStyles}>
          {filteredProperties.map((property) => (
            property ? (
              <div key={property._id} style={propertyCardStyles}>
                {/* <img
          src={`data:${property.image?.contentType};base64,${Buffer.from(property.image?.data || '').toString('base64')}`}
          alt={property.title}
          style={propertyImageStyles}
        /> */}
                {property.images && property.images.length > 0 ? (

                  <div style={{ textAlign: 'center' }}>



                    <img

                      src={`data:${property.images[currentSlides[property._id] % property.images.length]?.contentType};base64,${Buffer.from(property.images[currentSlides[property._id] % property.images.length]?.data || '').toString('base64')}`}

                      // src={`data:${property.images[currentSlides[property._id] % property.images.length]?.contentType};base64,${property.images[currentSlides[property._id] % property.images.length]?.data}`}

                      alt={`Property ${property.title}`}

                      style={propertyImageStyles}

                    />

                    <button

                      style={{ ...buttonStyles, ...buttonHoverStyles }}

                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}

                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}

                      onClick={() => handlePrev(property._id)}

                    >

                      Prev

                    </button>

                    <button

                      style={{ ...buttonStyles, ...buttonHoverStyles }}

                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}

                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}

                      onClick={() => handleNext(property._id)}

                    >

                      Next

                    </button>

                  </div>

                ) : (

                  <p>No images available</p>

                )}
                <div style={propertyInfoStyles}>
                  <h4>
                    <b>Price: {property.price}</b>
                  </h4>
                  <p>Bedrooms: {property.bedrooms}</p>
                  <p>Bathrooms: {property.bathrooms}</p>
                  <p>ZipCode: {property.zipCode}</p>
                </div>
                {property.isAvailable && (
                  <>
                    <button onClick={() => handlePropertyClick(property)} style={propertyViewButtonStyles}>
                      View All
                    </button>
                    <button onClick={() => toggleWishlist(property)} style={wishlistButtonStyles}>
                      {wishlist.has(property._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div key={property?._id || 'unknown'}>Property information unavailable</div>
            )
          ))}
        </div>
      </div>




      {/* {property.isAvailable && (
                  <>
                    <button onClick={() => handlePropertyClick(property)} style={propertyViewButtonStyles}>
                      View All
                    </button>

                    <button onClick={() => toggleWishlist(property)} style={wishlistButtonStyles}>
                      {wishlist.has(property._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div> */}
      <div style={footerStyles}>
        <button onClick={handleCompareClick} style={compareButtonStyles}>
          Compare
        </button>
      </div>
    </div>
  );
};



const wishlistButtonStyles = {
  padding: '10px',
  backgroundColor: '#FFA07A',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px 0',
  width: '40%',
  boxSizing: 'border-box'
};


const containerStyles = {
  padding: '20px',
};

const headerStyles = {
  textAlign: 'center',
  marginBottom: '40px',
};

const filterContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
};

const filterInputStyles = {
  flex: '1',
  marginRight: '10px',
};

const searchButtonStyles = {
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const contentStyles = {
  display: 'flex',
  height: 'calc(100vh - 40px)',
};

const mapStyles = {
  width: '60%',
  height: '80%',
  position: 'relative',
  overflow: 'hidden',
};

const listStyles = {
  width: '40%',
  overflowY: 'auto',
  padding: '5px',
  boxSizing: 'border-box',
};

const propertyCardStyles = {
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: '5px',
  overflow: 'hidden',
  position: 'relative',
  marginBottom: '20px',
};

const propertyImageStyles = {
  width: '100%',
  height: '250px',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
};

const propertyInfoStyles = {
  padding: '2px 16px',
};

const propertyViewButtonStyles = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '50%',
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '0 0 5px 5px',
  cursor: 'pointer',
};

const propertyNotAvailableStyles = {
  textAlign: 'center',
  color: 'red',
};

const footerStyles = {
  textAlign: 'center',
  marginTop: '20px',
};

const compareButtonStyles = {
  padding: '10px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
const buttonStyles = {

  padding: '8px 15px',

  margin: '5px',

  backgroundColor: '#4CAF50',

  color: 'white',

  border: 'none',

  borderRadius: '4px',

  cursor: 'pointer',

  fontSize: '16px',

  transition: 'background-color 0.3s ease',

};



const buttonHoverStyles = {

  backgroundColor: '#45a049',

};

export default RentPage;