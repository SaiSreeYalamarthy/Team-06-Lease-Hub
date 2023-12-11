import React, { useState, useEffect } from 'react';

const DocumentsList = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch('http://localhost:9000/all-doc');
                const data = await response.json();
                setDocuments(data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, []);

    return (
        <div>
            <h1 className='text-center'>Lease documents list</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Price</th>
                        <th>Bedrooms</th>
                        <th>Bathrooms</th>
                        <th>House Type</th>
                        <th>Parking Spaces</th>
                        <th>Year of Building</th>
                        <th>Owner Details</th>
                        <th>Amenities</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((document) => (
                        <tr key={document._id}>
                            <td>{document.username}</td>
                            {document.property && (
                                <>
                                    <td>{document.property.price}</td>
                                    <td>{document.property.bedrooms}</td>
                                    <td>{document.property.bathrooms}</td>
                                    <td>{document.property.houseType}</td>
                                    <td>{document.property.parkingSpace}</td>
                                    <td>{document.property.yearOfBuilding}</td>
                                    
                                    <td>{document.property.ownerDetails}</td>
                                    <td>{document.property.amenities.join(', ')}</td>
                                </>
                            )}
                            <td>
                                <a href={`http://localhost:9000/${document.documentPath}`} download>
                                    View
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentsList;
