import React, { useState } from 'react';

const DocumentUpload = () => {
    const [propertyId, setPropertyId] = useState('');
    const [username, setUsername] = useState('');
    const [document, setDocument] = useState(null);

    const handleFileChange = (event) => {
        setDocument(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('propertyId', propertyId);
            formData.append('username', username);
            formData.append('document', document);

            const response = await fetch('http://localhost:9000/properties/upload-document', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const responseData = await response.json();
            console.log(responseData);
            alert("Lease Document uploaded successfully! ")
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Document Upload</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Property ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Document:</label>
                    <input type="file" className="form-control" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary">
                    Upload Document
                </button>
            </form>
        </div>
    );
};

export default DocumentUpload;
