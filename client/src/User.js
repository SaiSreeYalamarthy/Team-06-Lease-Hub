// Home.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HomeImage1 from './home1.jpg';
import HomeImage2 from './home2.jpg';
import { useLocation } from 'react-router-dom';

import Footer from './Footer';


const User = () => {
  // React hook to handle navigation
  const navigate = useNavigate();

  // State to manage the search term and filtered homes
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHomes, setFilteredHomes] = useState([]);


  const username = localStorage.getItem('userUsername');
  console.log("Logged in user's username:", username);


  // Function to handle the search logic
  const handleSearch = () => {
    // Implement search logic here
    const result = homesData.filter((home) => {
      return (
        home.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        home.zipCode.includes(searchTerm)
      );
    });

    // Update the state with filtered homes
    setFilteredHomes(result);
  };

  const goToProfile = () => {
    console.log("before",username);
    // Replace 'yourUsername' with the actual username variable or logic to obtain it
    // navigate('/profile', { state: { username: username } });
    navigate('/profile', { state: { username } });

};
const goToWishlist = () => {
  console.log("wish",username);
  // Replace 'yourUsername' with the actual username variable or logic to obtain it
  // navigate('/wishlist', { state: { username: username } });
  navigate('/wishlist', { state: { username } });

};
const goToIssues = () => {
  console.log("issues",username);
  navigate('/issues', { state: { username } });

};

const goToNotification = () => {
  console.log("notification",username);
  navigate('/notification', { state: { username } });

};

const goToBuy = () => {
  console.log("after buy",username);
  navigate('/buy', { state: { username } });
};

const goToRent = () => {
  console.log("after rent",username);
  navigate('/rent', { state: { username } });
};

const goToShared = () => {
  console.log(" after shared",username);
  navigate('/sharedaccomadation', { state: { username } });
};

const goToServicApt = () => {
  console.log("after service",username);
  console.log("before service",username);
  navigate('/serviceapartments', { state: { username } });
};

const goToCommercialProp = () => {
  console.log("after commercial",username);
  console.log("before commercial",username);
  navigate('/commericalproperties', { state: { username } });
};

  const handleLogout = () => {
    localStorage.removeItem('userUsername'); // Clear the user's username
    localStorage.removeItem('userSession'); // Clear the session
    localStorage.clear();

    navigate('/'); // Redirect to login page
};

  // Data for the homes
  const homesData = [
    {
      id: 1,
      imageSrc: HomeImage1,
      price: '$300,000',
      bedrooms: 4,
      bathrooms: 2,
      address: '1440 Washington Avenue',
      zipCode: '12202',
    },
    {
      id: 2,
      imageSrc: HomeImage2,
      price: '$400,000',
      bedrooms: 3,
      bathrooms: 2.5,
      address: '1234 Manning',
      zipCode: '12206',
    },
  ];
  const location = useLocation();
  // const { username } = location.state;
  // console.log(username);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">
            LEASE HUB
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {/* ... (Previous code) */}
              <li className="nav-item">
                <button onClick={goToProfile} className="btn btn-primary">
                  Profile
                </button>
              </li>
              <li className="nav-item">
                <button onClick={goToBuy} className="btn btn-primary">
                  BUY
                </button>
              </li>
              <li className="nav-item">
                <button onClick={goToRent} className="btn btn-primary">
                  RENT
                </button>
              </li>
              <li className="nav-item">
                <button onClick={goToShared} className="btn btn-primary">
                  SHARED ACCOMMODATION
                </button>
              </li>
              <li className="nav-item">
                <button onClick={goToServicApt} className="btn btn-primary">
                  SERVICE APARTMENTS
                </button>
              </li>
              <li className="nav-item">
                <button onClick={goToCommercialProp} className="btn btn-primary">
                  COMMERCIAL PROPERTIES
                </button>
              </li>
              <li className="nav-item">
                <button onClick={goToWishlist} className="btn btn-primary">
                  Wishlist
                </button>
              </li>
              <li className="nav-item">
                <Link to="/ServicePage" className="nav-link text-light">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={goToIssues} className="btn btn-primary">
                  Issues
                </button>
              </li>
              <li className="nav-item">
                <button onClick={goToNotification} className="btn btn-primary">
                  Notification
                </button>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link text-light" onClick={handleLogout}>
                  LOGOUT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for address, zip code, etc."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>

      {/* Display Homes */}
      <div className="container mt-5">
        <div className="row">
          {(filteredHomes.length > 0 ? filteredHomes : homesData).map((home) => (
            <div key={home.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <img
                  src={home.imageSrc}
                  alt={`Home ${home.id}`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Price: {home.price}</h5>
                  <p className="card-text">Bedrooms: {home.bedrooms}</p>
                  <p className="card-text">Address: {home.address}</p>
                  <p className="card-text">Zip Code: {home.zipCode}</p>
                  {/* ViewAll button */}
                  <Link to="/buy" className="btn btn-primary">
                    View All
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default User;