import React, { useState, useEffect } from 'react';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        const userUsername = localStorage.getItem('userUsername');
        console.log("after wishlist",userUsername)
        try {
            const response = await fetch(`http://localhost:9000/wishlist/properties/${encodeURIComponent(userUsername)}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setWishlist(data.properties);
                } else {
                    throw new Error(data.message || 'Failed to fetch wishlist');
                }
            } else {
                throw new Error('Failed to fetch wishlist');
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    return (
        <div className="container mt-5 bg-light p-4 rounded">
            <h2 className="mb-4 text-center text-primary">My Wishlist</h2>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        
                        <th>Price</th>
                        <th>Bedrooms</th>
                        <th>Bathrooms</th>
                        <th>House Type</th>
                        {/* Add more headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {wishlist.map(property => (
                        <tr key={property._id}>
                            
                            <td>{property.price}</td>
                            <td>{property.bedrooms}</td>
                            <td>{property.bathrooms}</td>
                            <td>{property.houseType}</td>
                            {/* Add more property details as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WishlistPage;
