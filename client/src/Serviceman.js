import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlacesAutocomplete from 'react-places-autocomplete';
// import 'react-places-autocomplete/dist/ReactPlacesAutocomplete.css';

const ServiceManPage = () => {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        occupation: '',
        address: '',
        pincode: '',
        phoneNumber: '',
        email: '',
        experience: '',
        description: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTypeChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddressChange = (address) => {
        setFormData((prevData) => ({
            ...prevData,
            address: address,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const submitData = {
            name: formData.name,
            occupation: formData.occupation,
            address: formData.address,
            pincode: formData.pincode,
            experience: formData.experience,
            description: formData.description,
            phoneNumber:formData.phoneNumber,
            email:formData.email,
            lat: lat,
            lng: lng,
        };

        try {
            const response = await fetch('http://localhost:9000/servicemanadd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                alert('Service Added successfully!');
                // Redirect or perform any other action upon successful submission
                navigate('/dashboard'); // Change '/dashboard' to your desired route
            } else {
                console.error('Service failed:', response.status);
                alert('Service failed');
            }
        } catch (error) {
            console.error('Service failed:', error);
            alert('Service failed');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Service Man Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Occupation:</label>
                    <select
                        id="occupation"
                        className="form-control"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleTypeChange}
                    >
                        <option value="">Select an Occupation</option>
                        <option value="electrician">Electrician</option>
                        <option value="plumber">Plumber</option>
                        <option value="packersAndMovers">Packers and Movers</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address:</label>
                    <div>
                        <PlacesAutocomplete
                            value={formData.address}
                            onChange={(address) => handleAddressChange(address)}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <input
                                        {...getInputProps({
                                            placeholder: 'Type address...',
                                            className: 'form-control',
                                        })}
                                    />
                                    <div>
                                        {loading ? <div>Loading...</div> : null}
                                        {suggestions.map((suggestion) => {
                                            const style = {
                                                backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                                            };
                                            return (
                                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Pincode:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Experience:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number:</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ServiceManPage;