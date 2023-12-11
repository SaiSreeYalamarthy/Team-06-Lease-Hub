// export default UserProfile;
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import './profile.css';

const OwnerProfile = () => {
    const [user, setUser] = useState({
        firstName: 'Sai',
        lastName: 'Sree',
        username: 'sai123', // Add username if available
        email: 'sai@gmail.com',
        phone: '1234567898'
    });
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const username = localStorage.getItem('username') || location.state?.username;
        console.log("after profile",username);
        const token = localStorage.getItem('userSession');

        if (token && username) {
            // Fetch user data here if needed
        }
    }, [location.state?.username]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Implement save logic if needed
        setIsEditing(false);
    };

    console.log('User state:', user);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2>Owner Profile</h2>
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

export default OwnerProfile;