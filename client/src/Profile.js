
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import './profile.css';

const UserProfile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const username = localStorage.getItem('username') || location.state?.username;
        const token = localStorage.getItem('userSession');

        if (token && username) {
            fetch(`http://localhost:9000/user/profile/${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched user data:', data);
                setUser({ ...data, password: '' });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, [location.state?.username]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        const username = localStorage.getItem('username') || location.state?.username;
        const token = localStorage.getItem('userSession');

        if (token && username) {
            const { _id, ...updates } = user; // Destructure _id from user object
            fetch(`http://localhost:9000/user/profile/${_id}`, { // Use _id for the URL
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(updates) // Send updates excluding _id
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error updating profile');
                }
                return response.json();
            })
            .then(updatedUser => {
                console.log('Updated user data:', updatedUser);
                setUser(updatedUser);
                setIsEditing(false);
                alert('Profile updated successfully');
            })
            .catch(error => {
                console.error('Error updating user data:', error);
                alert('Error updating profile');
            });
        } else {
            alert('You must be logged in to edit your profile.');
        }
    };

    console.log('User state:', user);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2>User Profile</h2>
                    <div className="card">
                        <div className="card-body">
                            {isEditing ? (
                                <div>
                                    <input
                                        type="text"
                                        value={user.firstName}
                                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                        placeholder="First Name"
                                    />
                                    <input
                                        type="text"
                                        value={user.lastName}
                                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                        placeholder="Last Name"
                                    />
                                    <input
                                        type="email"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        placeholder="Email"
                                    />
                                    <input
                                        type="text"
                                        value={user.phone}
                                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                        placeholder="Phone"
                                    />
                                    <button onClick={handleSave}>Save</button>
                                </div>
                            ) : (
                                <div>
                                    <p>First Name: {user.firstName}</p>
                                    <p>Last Name: {user.lastName}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Phone: {user.phone}</p>
                                    <button onClick={handleEdit}>Edit</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;