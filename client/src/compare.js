import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Compare() {
  const [properties, setProperties] = useState([]);
  const [properties1, setProperties1] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [propertyId1, setPropertyId1] = useState('');
  const [propertyId2, setPropertyId2] = useState('');

  // useEffect(() => {
  //   const selectedItemId = id;
  //   setLoading(true);
  //   fetch(`http://localhost:9000/similarProperties/${selectedItemId}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setProperties(data);
  //       setLoading(false);
  //       console.log(data)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       setLoading(false);
  //     });
  // }, []);

  const handleCompareClick = () => {
    fetch(`http://localhost:9000/properties/${propertyId1}/${propertyId2}`)
      .then(response => response.json())
      .then(data => {
        setProperties1(data);
        
      })
      .catch(error => {
        console.error(error);
      });

 
  };

  return (
    <>
   
      <div className="container mt-5">
        <h1 className="mb-4">Compare Two Properties</h1>
        <div className="row">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              placeholder="Enter Property id 1"
              value={propertyId1}
              onChange={(e) => setPropertyId1(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-4 mb-2">
            <input
              type="text"
              placeholder="Enter Property id 2"
              value={propertyId2}
              onChange={(e) => setPropertyId2(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-4 mb-2">
            <button className="btn btn-primary btn-block" onClick={handleCompareClick}>
              Compare
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-3">
          {loading ? (
            <p>Loading...</p>
          ) : (
            properties1.map((property, index) => (
              <div key={index} className="col mb-4">
                <div className="card">
                  {property.image && (
                    <img
                      src={`http://localhost:9000/${property.image}`}
                      className="card-img-top img-fluid"
                      alt={`Property ${index + 1}`}
                    />
                  )}
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Property Id:</strong> {property._id}
                      </li>
                      <li className="list-group-item">
                        <strong>Price:</strong> ${property.price}
                      </li>
                      <li className="list-group-item">
                        <strong>Bedrooms:</strong> {property.bedrooms}
                      </li>
                      <li className="list-group-item">
                        <strong>Bathrooms:</strong> {property.bathrooms}
                      </li>
                      <li className="list-group-item">
                        <strong>House Type:</strong> {property.houseType},{' '}
                      </li>
                      <li className="list-group-item">
                        <strong>Parking Space:</strong> {property.parkingSpace},{' '}
                      </li>
                      {/* <li className="list-group-item">
                        <strong>Year of Building:</strong> {property.yearOfBuilding},{' '}
                      </li> */}
                      {/* <li className="list-group-item">
                        <strong>Owner Details:</strong> {property.ownerDetails},{' '}
                      </li>
                      <li className="list-group-item">
                        <strong>Amenities:</strong> {property.amenities}
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}

export default Compare;