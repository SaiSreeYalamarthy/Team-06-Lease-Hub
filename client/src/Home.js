import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import HomeImage1 from './home1.jpg';
import HomeImage2 from './home2.jpg';
import { Buffer } from 'buffer';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [buyProperties, setBuyProperties] = useState([]);

  useEffect(() => {
    // Replace this with your actual data fetching logic
    const staticData = [
      {
        id: 1,
        imageSrc: HomeImage1,
        price: '$300,000',
        bedrooms: 4,
        address: '1440 Washington Avenue',
        zipCode: '12202',
      },
      {
        id: 2,
        imageSrc: HomeImage2,
        price: '$400,000',
        bedrooms: 3,
        address: '1234 Manning',
        zipCode: '12206',
      },
    ];

    setBuyProperties(staticData);
    setFilteredHomes(staticData);
  }, []);

  const handleSearch = () => {
    const result = buyProperties.filter((home) => {
      return (
        home.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        home.zipCode.includes(searchTerm)
      );
    });
    setFilteredHomes(result);
  };

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
              <li className="nav-item">
                <Link to="/buy" className="nav-link text-light">
                  Buy
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/rent" className="nav-link text-light">
                  Rent
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/serviceapartments" className="nav-link text-light">
                  Service Apartments
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sharedaccommodation" className="nav-link text-light">
                  Shared Accommodation
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/commercialproperties" className="nav-link text-light">
                  Commercial Properties
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link text-light">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link text-light">
                  Signup
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
                  <button className="btn btn-primary" type="button" onClick={handleSearch}>
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
          {filteredHomes.map((home) => (
            <div key={home.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <img
                  src={home.imageSrc}
                  alt={`Home ${home.id}`}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Price: {home.price}</h5>
                  <p className="card-text">Bedrooms: {home.bedrooms}</p>
                  <p className="card-text">Address: {home.address}</p>
                  <p className="card-text">Zip Code: {home.zipCode}</p>
                  <Link to="/login" className="btn btn-primary">
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

export default Home;