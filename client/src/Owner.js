import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeImage1 from './home1.jpg';
import HomeImage2 from './home2.jpg';
import { useLocation } from 'react-router-dom';

const Owner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username') || location.state?.username;

  const housesData = [
    {
      id: 1,
      imageSrc: HomeImage1,
      price: '$300,000',
      bedrooms: 4,
      bathrooms: 2,
    },
    {
      id: 2,
      imageSrc: HomeImage2,
      price: '$400,000',
      bedrooms: 3,
      bathrooms: 2.5,
    },
  ];

  const handleAddPropertyClick = () => {
    if (username) {
      navigate('/add-property', { state: { username: username } });
    } else {
      alert('Username not found. Please log in again.');
      navigate('/login');
    }
  };

  const handleVaccancyClick = () => {
    if (username) {
      navigate('/allvaccancies', { state: { username: username } });
    } else {
      alert('Username not found. Please log in again.');
      navigate('/login');
    }
  };

  const handleEditPropertyClick = () => {
    if (username) {
      navigate('/list-property', { state: { username: username } });
    } else {
      alert('Username not found. Please log in again.');
      navigate('/login');
    }
  };

  const handleIssuesClick = () => {
    if (username) {
      console.log('Before issues', username);
      navigate('/list-issues', { state: { username: username } });
    } else {
      // Handle case when username is not available
      alert('Username not found. Please log in again.');
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    if (username) {
      console.log('Before profile', username);
      navigate('/Ownerprofile', { state: { username: username } });
    } else {
      // Handle case when username is not available
      alert('Username not found. Please log in again.');
      navigate('/login');
    }
  };

  const handleIncomeClick = () => {
    if (username) {
      console.log('Before income', username);
      navigate('/annualincome', { state: { username: username } });
    } else {
      // Handle case when username is not available
      alert('Username not found. Please log in again.');
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ownerSession');
    localStorage.removeItem('username');
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            LEASE HUB
          </Link>
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
                <button className="nav-link btn btn-primary" onClick={handleAddPropertyClick}>
                  Add Property
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-primary" onClick={handleEditPropertyClick}>
                  Edit Property
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-primary" onClick={handleVaccancyClick}>
                  Vacancies
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-primary" onClick={handleIssuesClick}>
                  Issues
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-primary" onClick={handleProfileClick}>
                  Profile
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-primary" onClick={handleIncomeClick}>
                  Annual Income
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

      <div className="container mt-5">
        <h1 className="text-center">Welcome to the Owner Page</h1>

        <div className="row">
          {housesData.map((house) => (
            <div key={house.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <img src={house.imageSrc} alt={`House ${house.id}`} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Price: {house.price}</h5>
                  <p className="card-text">Bedrooms: {house.bedrooms}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Owner;
