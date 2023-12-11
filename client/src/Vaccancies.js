



import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const Vaccancies = () => {
    const [properties, setProperties] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [tenantUsernames, setTenantUsernames] = useState({});
    const location = useLocation();

    

    useEffect(() => {
      // Attempt to get the username from local storage or from the navigation state
      const storedUsername = localStorage.getItem('username');
      const stateUsername = location.state?.username;

      const currentUsername = storedUsername || stateUsername;
      setUsername(currentUsername);
      if (currentUsername) {
          fetchProperties(currentUsername);
      } else {
          console.error('Username not found');
          // Redirect to login or handle the missing username appropriately
      }
  }, [location]);

    const fetchProperties = async (username) => {
        try {
            const response = await fetch(`http://localhost:9000/get-properties/${username}`);
            if (response.ok) {
                const data = await response.json();
                setProperties(data.properties);
            } else {
                throw new Error('Failed to fetch properties');
            }
        } catch (error) {
            console.error('Error fetching properties:', error.message);
        }
    };

   
    const toggleVacancy = async (propertyId, newStatus) => {
      try {
          const response = await fetch(`http://localhost:9000/properties/${propertyId}/toggle-vacancy`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ vacancy: newStatus }),
          });
          if (response.ok) {
            fetchProperties(username); // Refetch properties to update the UI
            alert(`Property ${propertyId} vacancy status updated to ${newStatus ? 'occupied' : 'vacant'}.`);

          } else {
              throw new Error('Failed to toggle property vacancy');
          }
      } catch (error) {
          console.error('Error toggling property vacancy:', error.message);
          alert('Error toggling property vacancy. Please try again.');

      }
  };
  const updateTenantUsername = async (propertyId, tenantUsername) => {
    try {
        const response = await fetch(`http://localhost:9000/properties/${propertyId}/update-tenant`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tenantUsername }),
        });
        if (response.ok) {
            const data = await response.json();
            alert(`Tenant username updated successfully for property ID ${propertyId}.`);
            fetchProperties(username); // Refetch properties to update the UI
        } else {
            throw new Error('Failed to update tenant username');
        }
    } catch (error) {
        console.error('Error updating tenant username:', error.message);
        alert('Failed to update tenant username. Please try again.');
    }
  };

  const handleTenantUsernameChange = (propertyId, value) => {
    setTenantUsernames(prevTenantUsernames => ({
        ...prevTenantUsernames,
        [propertyId]: value
    }));
    // alert(`Tenant username updated to: ${value}`);
};

    return (
        <div className="container mt-4">
            <h2 className='text-center'>Available Properties for {username}</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Property ID</th>
                        <th>Price</th>
                        <th>Vacancy</th>
                        <th>Tenant Username</th>

                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id}>
                            <td>{property._id}</td>
                            <td>{property.price}</td>


                            {/* ... other property fields ... */}
                            <td>
                                {/* <button 
                                    className={`btn ${property.vacancy ? 'btn-success' : 'btn-danger'}`}
                                    onClick={() => toggleVacancy(property._id, property.vacancy)}
                                >
                                    {property.vacancy ? 'Occupied' : 'Vacant'}
                                </button> */}
                                <select 
                                    className="custom-select"
                                    value={property.vacancy ? 'occupied' : 'vacant'}
                                    onChange={(e) => toggleVacancy(property._id, e.target.value === 'occupied')}
                                >
                                    <option value="vacant">Vacant</option>
                                    <option value="occupied">Occupied</option>
                                </select>
                            </td>
                            <td>
                                  <input 
                                        type="text"
                                        value={tenantUsernames[property._id] || ''}
                                        onChange={(e) => handleTenantUsernameChange(property._id, e.target.value)}
                                        onBlur={() => updateTenantUsername(property._id, tenantUsernames[property._id])}
                                        placeholder="Enter tenant username"
                                    />  
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Vaccancies;
