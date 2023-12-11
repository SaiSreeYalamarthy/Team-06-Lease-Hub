import React, { useState, useEffect } from 'react';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const userUsername = localStorage.getItem('userUsername');
    try {
      const response = await fetch(`http://localhost:9000/notifications/${userUsername}`);
      if (response.ok) {
        const fetchedNotifications = await response.json();
        setNotifications(fetchedNotifications);
      } else {
        throw new Error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Notifications</h2>
      {notifications.map(notification => (
        <div key={notification._id} className="card mb-3">
          <div className="card-body">
            <p className="card-text">{notification.message}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
