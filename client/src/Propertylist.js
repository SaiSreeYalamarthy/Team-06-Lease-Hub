// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Buffer } from 'buffer';

// function PropertyManagement() {

//   const [properties, setProperties] = useState([]);
  
//   const [editedProperty, setEditedProperty] = useState({
//     id: '',
//     type: '',
//     bedrooms: '',
//     bathrooms: '',
//     price: '',
//     lat: '',
//     lng: '',
//     houseType: '',
//     parkingSpace: '',
//     basement: '',
//     flooring: '',
//     heating: '',
//     cooling: '',
//     address: '',
//     zipCode: '',
//     // Add other property fields as needed
//   });

//   const [propertyImage, setPropertyImage] = useState({
//     data: null,
//     contentType: ''
//   });
  
//   const [filterType, setFilterType] = useState('');

//   const location = useLocation();
//   const [username, setUsername] = useState(localStorage.getItem('username') || '');

//   // const username = localStorage.getItem('username') || location.state?.username;
//   console.log("edit username",username);


//   useEffect(() => {
//     // Try to get username from local storage or location state
//     // let currentUsername = localStorage.getItem('username');
//     const currentUsername = localStorage.getItem('username') || location.state?.username;

  
//   if (currentUsername && currentUsername !== username) {
//     setUsername(currentUsername);
//   }

//   if (currentUsername) {
//     fetchProperties(currentUsername);
//   } else {
//     console.error('Username not found');
//     // Redirect to login or handle the missing username appropriately
//   }
// }, [location, username]);

  
//   const fetchProperties = async (currentUsername) => {
//     try {
//       const response = await fetch(`http://localhost:9000/get-properties/${currentUsername}`);
//       if (response.ok) {
//         const data = await response.json();
//         setProperties(data.properties);
//       } else {
//         throw new Error('Failed to fetch properties');
//       }
//     } catch (error) {
//       console.error('Error fetching properties:', error.message);
//     }
//   };

  
//   const editProperty = async (propertyId) => {
//     const formData = new FormData();

//     // Append text fields to formData
//     Object.keys(editedProperty).forEach(key => {
//       if (key !== 'id') { // Exclude 'id' from formData
//         formData.append(key, editedProperty[key]);
//       }
//     });

//     // Append image file to formData
//     if (propertyImage && propertyImage.data) {
//       // Assuming propertyImage.data is already a Buffer or blob
//       const blob = new Blob([propertyImage.data], { type: propertyImage.contentType });
//       formData.append('propertyImage', blob);
//     }

//     try {
//       const response = await fetch(`http://localhost:9000/property/${propertyId}`, {
//         method: 'PUT',
//         body: formData // Use FormData
//         // Note: Do not set Content-Type header for FormData
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Updated property:', data.property);
//         alert("Property Updated ");
//         fetchProperties(username); // Refetch properties to update the list
//       } else {
//         throw new Error('Failed to update property');
//       }
//     } catch (error) {
//       console.error('Error editing property:', error.message);
//     }
//   };

//   const handlePropertyChange = (e) => {
//     setEditedProperty({
//       ...editedProperty,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // const handleImageChange = (e) => {
//   //   setPropertyImage(e.target.files[0]); // Update state with selected file
//   // };
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         // Convert the file to a buffer
//         const buffer = Buffer.from(reader.result);
//         // Set the state with the buffer and file type
//         setPropertyImage({
//           data: buffer,
//           contentType: file.type
//         });
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };


//   const handleEditClick = (property) => {
//     setEditedProperty({
//       id: property._id,
//       type: property.type,
//       bedrooms: property.bedrooms,
//       bathrooms: property.bathrooms,
//       price: property.price,
//       houseType: property.houseType,
//       parkingSpace: property.parkingSpace,
//       basement: property.basement,
//       flooring: property.flooring,
//       heating: property.heating,
//       cooling: property.cooling,
//       zipCode: property.zipCode,
//       address: property.address
      
    
//       // Set other fields as needed
//     });
    
//   };

//   const handleFilterChange = (e) => {
//     setFilterType(e.target.value);
//   };
  
//   const filteredProperties = properties.filter(property => filterType === '' || property.type === filterType);


//   return (
//     <div>
//       <h1>Property Management</h1>
//       <label>
//         Filter by Type:
//         <select value={filterType} onChange={handleFilterChange}>
//           <option value="">All</option>
//           <option value="buy">Buy</option>
//           <option value="rent">rent</option>
//           <option value="sharedaccommodation">Shared Accommodation</option>
//           <option value="serviceapartments">Service Apartments</option>
//           <option value="commercial">commercial</option>
//         </select>
//       </label>


// <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', border: '1px solid #ddd' }}>
//       <thead>
//         <tr style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Type</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Bedrooms</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Price</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Bathrooms</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>House Type</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Parking Space</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Basement</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Flooring</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Heating</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Cooling</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Address</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Zipcode</th>
//           <th style={{ padding: '8px', border: '1px solid #ddd' }}>Edit</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredProperties.map((property) => (
//           <tr key={property._id} style={{ border: '1px solid #ddd', borderBottom: 'none' }}>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.type}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.bedrooms}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property._id}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.price}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.bathrooms}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.houseType}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.parkingSpace}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.basement}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.flooring}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.heating}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.cooling}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.address}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.zipCode}</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>
//               <button style={{ backgroundColor: 'lightblue', border: '1px solid #ddd', padding: '8px' }} onClick={() => handleEditClick(property)}>
//                 Edit
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//       {/* Form remains the same */}
//       <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f8f8' }}>
//       {/* Form for editing property */}
//       <form onSubmit={(e) => {
//         e.preventDefault();
//         editProperty(editedProperty.id);
//       }}>
//         <h2 style={{ marginBottom: '20px', color: '#333' }}>Edit Property</h2>

//         {/* Type field */}
//         <div className="form-group">
//           <label><h6>Type:</h6></label>
//           <input type="text" className="form-control" name="type" value={editedProperty.type} onChange={handlePropertyChange} />
//         </div>

//         {/* ID field */}
//         <div className="form-group">
//           <label><h6>ID:</h6></label>
//           <input type="text" className="form-control" name="id" value={editedProperty.id} onChange={handlePropertyChange} />
//         </div>

//         {/* Bedrooms field */}
//         <div className="form-group">
//           <label><h6>Bedrooms:</h6></label>
//           <input type="number" className="form-control" name="bedrooms" value={editedProperty.bedrooms} onChange={handlePropertyChange} />
//         </div>

//         {/* Bathrooms field */}
//         <div className="form-group">
//           <label><h6>Bathrooms:</h6></label>
//           <input type="number" className="form-control" name="bathrooms" value={editedProperty.bathrooms} onChange={handlePropertyChange} />
//         </div>

//         {/* Price field */}
//         <div className="form-group">
//           <label><h6>Price:</h6></label>
//           <input type="number" className="form-control" name="price" value={editedProperty.price} onChange={handlePropertyChange} />
//         </div>

//         {/* House Type field */}
//         <div className="form-group">
//           <label><h6>House Type:</h6></label>
//           <input type="text" className="form-control" name="houseType" value={editedProperty.houseType} onChange={handlePropertyChange} />
//         </div>

//         {/* Parking Space field */}
//         <div className="form-group">
//           <label><h6>Parking Space:</h6></label>
//           <input type="number" className="form-control" name="parkingSpace" value={editedProperty.parkingSpace} onChange={handlePropertyChange} />
//         </div>

//         {/* Basement field */}
//         <div className="form-group">
//           <label><h6>Basement:</h6></label>
//           <input type="text" className="form-control" name="basement" value={editedProperty.basement} onChange={handlePropertyChange} />
//         </div>

//         {/* Flooring field */}
//         <div className="form-group">
//           <label><h6>Flooring:</h6></label>
//           <input type="text" className="form-control" name="flooring" value={editedProperty.flooring} onChange={handlePropertyChange} />
//         </div>

//         {/* Heating field */}
//         <div className="form-group">
//           <label><h6>Heating:</h6></label>
//           <input type="text" className="form-control" name="heating" value={editedProperty.heating} onChange={handlePropertyChange} />
//         </div>

//         {/* Cooling field */}
//         <div className="form-group">
//           <label><h6>Cooling:</h6></label>
//           <input type="text" className="form-control" name="cooling" value={editedProperty.cooling} onChange={handlePropertyChange} />
//         </div>

//         <div className="form-group">
//           <label><h6>Address:</h6></label>
//           <input type="text" className="form-control" name="address" value={editedProperty.address} onChange={handlePropertyChange} />
//         </div>

//         <div className="form-group">
//           <label><h6>ZipCode:</h6></label>
//           <input type="text" className="form-control" name="zipCode" value={editedProperty.zipCode} onChange={handlePropertyChange} />
//         </div>

//         {/* Property Image field */}
//         <div className="form-group">
//           <label htmlFor="propertyImage"><h6>Add Image:</h6></label>
//           <input
//             type="file"
//             id="propertyImage"
//             className="form-control-file"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//           {propertyImage.data && (
//             <img
//               src={`data:${propertyImage.contentType};base64,${propertyImage.data.toString('base64')}`}
//               alt="Property Preview"
//               className="mt-3 img-fluid"
//               style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}
//             />
//           )}
//         </div>

//         <button type="submit" className="btn btn-primary">Save</button>
//       </form>
//     </div>
//   </div>
// );
// }


// export default PropertyManagement;


import React, { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { Buffer } from 'buffer';



function PropertyManagement() {

  const [properties, setProperties] = useState([]);

  const [editedProperty, setEditedProperty] = useState({

    id: '',

    type: '',

    bedrooms: '',

    bathrooms: '',

    price: '',

    lat: '',

    lng: '',

    houseType: '',

    parkingSpace: '',

    basement: '',

    flooring: '',

    heating: '',

    cooling: '',

    address: '',

    zipCode: '',

    // Add other property fields as needed

  });



  const [propertyImage, setPropertyImage] = useState({

    data: null,

    contentType: ''

  });

  const [propertyImages, setPropertyImages] = useState([]);





  const [filterType, setFilterType] = useState('');



  const location = useLocation();

  const [username, setUsername] = useState(localStorage.getItem('username') || '');



  // const username = localStorage.getItem('username') || location.state?.username;

  console.log("edit username", username);





  useEffect(() => {

    // Try to get username from local storage or location state

    // let currentUsername = localStorage.getItem('username');

    const currentUsername = localStorage.getItem('username') || location.state?.username;





    if (currentUsername && currentUsername !== username) {

      setUsername(currentUsername);

    }



    if (currentUsername) {

      fetchProperties(currentUsername);

    } else {

      console.error('Username not found');

      // Redirect to login or handle the missing username appropriately

    }

  }, [location, username]);





  const fetchProperties = async (currentUsername) => {

    try {

      const response = await fetch(`http://localhost:9000/get-properties/${currentUsername}`);

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





  // const editProperty = async (propertyId) => {

  //   const formData = new FormData();



  //   // Append text fields to formData

  //   Object.keys(editedProperty).forEach(key => {

  //     if (key !== 'id') { // Exclude 'id' from formData

  //       formData.append(key, editedProperty[key]);

  //     }

  //   });



  //   // Append image file to formData

  //   if (propertyImage && propertyImage.data) {

  //     // Assuming propertyImage.data is already a Buffer or blob

  //     const blob = new Blob([propertyImage.data], { type: propertyImage.contentType });

  //     formData.append('propertyImage', blob);

  //   }



  //   try {

  //     const response = await fetch(`http://localhost:9000/property/${propertyId}`, {

  //       method: 'PUT',

  //       body: formData // Use FormData

  //       // Note: Do not set Content-Type header for FormData

  //     });



  //     if (response.ok) {

  //       const data = await response.json();

  //       console.log('Updated property:', data.property);

  //       alert("Property Updated ");

  //       fetchProperties(username); // Refetch properties to update the list

  //     } else {

  //       throw new Error('Failed to update property');

  //     }

  //   } catch (error) {

  //     console.error('Error editing property:', error.message);

  //   }

  // };



  const editProperty = async (propertyId) => {

    const formData = new FormData();



    // Append text fields to formData

    Object.keys(editedProperty).forEach(key => {

      if (key !== 'id') { // Exclude 'id' from formData

        formData.append(key, editedProperty[key]);

      }

    });



    // Append image files to formData

    // if (propertyImages && propertyImages.length > 0) {

    //   propertyImages.forEach((img, index) => {

    //     if (img.data) {

    //       const blob = new Blob([img.data], { type: img.contentType });

    //       // Append each image with a unique key

    //       formData.append(`propertyImages${index}`, blob);

    //     }

    //   });

    // }

    // Append image files to formData

    if (propertyImages && propertyImages.length > 0) {

      propertyImages.forEach((img) => {

        if (img.data) {

          const blob = new Blob([img.data], { type: img.contentType });

          // Append each image under the same field name

          formData.append('propertyImages', blob);

        }

      });

    }





    try {

      const response = await fetch(`http://localhost:9000/property/${propertyId}`, {

        method: 'PUT',

        body: formData // Use FormData

        // Note: Do not set Content-Type header for FormData

      });



      if (response.ok) {

        const data = await response.json();

        console.log('Updated property:', data.property);

        alert("Property Updated");

        fetchProperties(username); // Refetch properties to update the list

        // setEditedProperty({

        //   id: '',

        //   type: '',

        //   bedrooms: '',

        //   bathrooms: '',

        //   price: '',

        //   houseType: '',

        //   parkingSpace: '',

        //   basement: '',

        //   flooring: '',

        //   heating: '',

        //   cooling: '',

        //   zipCode: '',

        //   address: ''



        // });

        // setPropertyImages([]);

        window.location.reload();



      } else {

        throw new Error('Failed to update property');

      }

    } catch (error) {

      console.error('Error editing property:', error.message);
      alert('Failed to update property. Please try again.'); // Alert for unsuccessful update


    }

  };





  const handlePropertyChange = (e) => {

    setEditedProperty({

      ...editedProperty,

      [e.target.name]: e.target.value,

    });

  };



  // const handleImageChange = (e) => {

  //   setPropertyImage(e.target.files[0]); // Update state with selected file

  // };

  // const handleImageChange = (event) => {

  //   const file = event.target.files[0];

  //   if (file) {

  //     const reader = new FileReader();

  //     reader.onloadend = () => {

  //       // Convert the file to a buffer

  //       const buffer = Buffer.from(reader.result);

  //       // Set the state with the buffer and file type

  //       setPropertyImage({

  //         data: buffer,

  //         contentType: file.type

  //       });

  //     };

  //     reader.readAsArrayBuffer(file);

  //   }

  // };



  const handleImageChange = (event) => {

    const files = Array.from(event.target.files); // Convert FileList to an array

    const imagePromises = files.map(file => {

      return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onloadend = () => {

          // Convert the file to a buffer

          const buffer = Buffer.from(reader.result);

          // Resolve the promise with the image object

          resolve({

            data: buffer,

            contentType: file.type

          });

        };

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);

      });

    });



    Promise.all(imagePromises).then(images => {

      setPropertyImages(images); // Update state with an array of image objects

    }).catch(error => {

      console.error('Error processing images:', error);

    });

  };







  const handleEditClick = (property) => {

    setEditedProperty({

      id: property._id,

      type: property.type,

      bedrooms: property.bedrooms,

      bathrooms: property.bathrooms,

      price: property.price,

      houseType: property.houseType,

      parkingSpace: property.parkingSpace,

      basement: property.basement,

      flooring: property.flooring,

      heating: property.heating,

      cooling: property.cooling,

      zipCode: property.zipCode,

      address: property.address,

   

  





      // Set other fields as needed

    });

       

    if (property.images && Array.isArray(property.images)) {

      setPropertyImages(property.images);

    } else {

      // If there are no images, set an empty array or a default value

      setPropertyImages([]);

    }

  



  };



  const handleFilterChange = (e) => {

    setFilterType(e.target.value);

  };



  const filteredProperties = properties.filter(property => filterType === '' || property.type === filterType);





  return (

    <div>

      <h1>Property Management</h1>

      <label>

        Filter by Type:

        <select value={filterType} onChange={handleFilterChange}>

          <option value="">All</option>

          <option value="buy">Buy</option>

          <option value="rent">rent</option>

          <option value="sharedaccommodation">Shared Accommodation</option>

          <option value="serviceapartments">Service Apartments</option>

          <option value="commercial">commercial</option>

        </select>

      </label>





      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', border: '1px solid #ddd' }}>

        <thead>

          <tr style={{ border: '1px solid #ddd', backgroundColor: '#f2f2f2' }}>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Type</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Bedrooms</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Price</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Bathrooms</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>House Type</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Parking Space</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Basement</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Flooring</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Heating</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Cooling</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Address</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Zipcode</th>

            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Edit</th>

          </tr>

        </thead>

        <tbody>

          {filteredProperties.map((property) => (

            <tr key={property._id} style={{ border: '1px solid #ddd', borderBottom: 'none' }}>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.type}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.bedrooms}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property._id}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.price}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.bathrooms}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.houseType}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.parkingSpace}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.basement}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.flooring}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.heating}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.cooling}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.address}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{property.zipCode}</td>

              <td style={{ padding: '8px', border: '1px solid #ddd' }}>

                <button style={{ backgroundColor: 'lightblue', border: '1px solid #ddd', padding: '8px' }} onClick={() => handleEditClick(property)}>

                  Edit

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>



      {/* Form remains the same */}

      <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f8f8f8' }}>

        {/* Form for editing property */}

        <form onSubmit={(e) => {

          e.preventDefault();

          editProperty(editedProperty.id);

        }}>

          <h2 style={{ marginBottom: '20px', color: '#333' }}>Edit Property</h2>



          {/* Type field */}

          <div className="form-group">

            <label><h6>Type:</h6></label>

            <input type="text" className="form-control" name="type" value={editedProperty.type} onChange={handlePropertyChange} />

          </div>



          {/* ID field */}

          <div className="form-group">

            <label><h6>ID:</h6></label>

            <input type="text" className="form-control" name="id" value={editedProperty.id} onChange={handlePropertyChange} />

          </div>



          {/* Bedrooms field */}

          <div className="form-group">

            <label><h6>Bedrooms:</h6></label>

            <input type="number" className="form-control" name="bedrooms" value={editedProperty.bedrooms} onChange={handlePropertyChange} />

          </div>



          {/* Bathrooms field */}

          <div className="form-group">

            <label><h6>Bathrooms:</h6></label>

            <input type="number" className="form-control" name="bathrooms" value={editedProperty.bathrooms} onChange={handlePropertyChange} />

          </div>



          {/* Price field */}

          <div className="form-group">

            <label><h6>Price:</h6></label>

            <input type="number" className="form-control" name="price" value={editedProperty.price} onChange={handlePropertyChange} />

          </div>



          {/* House Type field */}

          <div className="form-group">

            <label><h6>House Type:</h6></label>

            <input type="text" className="form-control" name="houseType" value={editedProperty.houseType} onChange={handlePropertyChange} />

          </div>



          {/* Parking Space field */}

          <div className="form-group">

            <label><h6>Parking Space:</h6></label>

            <input type="number" className="form-control" name="parkingSpace" value={editedProperty.parkingSpace} onChange={handlePropertyChange} />

          </div>



          {/* Basement field */}

          <div className="form-group">

            <label><h6>Basement:</h6></label>

            <input type="text" className="form-control" name="basement" value={editedProperty.basement} onChange={handlePropertyChange} />

          </div>



          {/* Flooring field */}

          <div className="form-group">

            <label><h6>Flooring:</h6></label>

            <input type="text" className="form-control" name="flooring" value={editedProperty.flooring} onChange={handlePropertyChange} />

          </div>



          {/* Heating field */}

          <div className="form-group">

            <label><h6>Heating:</h6></label>

            <input type="text" className="form-control" name="heating" value={editedProperty.heating} onChange={handlePropertyChange} />

          </div>



          {/* Cooling field */}

          <div className="form-group">

            <label><h6>Cooling:</h6></label>

            <input type="text" className="form-control" name="cooling" value={editedProperty.cooling} onChange={handlePropertyChange} />

          </div>



          <div className="form-group">

            <label><h6>Address:</h6></label>

            <input type="text" className="form-control" name="address" value={editedProperty.address} onChange={handlePropertyChange} />

          </div>



          <div className="form-group">

            <label><h6>ZipCode:</h6></label>

            <input type="text" className="form-control" name="zipCode" value={editedProperty.zipCode} onChange={handlePropertyChange} />

          </div>



          {/* Property Image field */}

          {/* <div className="form-group">

          <label htmlFor="propertyImage"><h6>Add Image:</h6></label>

          <input

            type="file"

            id="propertyImage"

            className="form-control-file"

            accept="image/*"

            onChange={handleImageChange}

          />

          {propertyImage.data && (

            <img

              src={`data:${propertyImage.contentType};base64,${propertyImage.data.toString('base64')}`}

              alt="Property Preview"

              className="mt-3 img-fluid"

              style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }}

            />

          )}

        </div> */}

          <div className="form-group">

            <label htmlFor="propertyImage"><h6>Add Images:</h6></label>

            <input

              type="file"

              id="propertyImage"

              className="form-control-file"

              accept="image/*"

              multiple

              onChange={handleImageChange}

            />

            {propertyImages.map((img, index) => (

              img.data && (

                <img

                  key={index}

                  src={`data:${img.contentType};base64,${img.data.toString('base64')}`}

                  alt={`Property Preview ${index + 1}`}

                  className="mt-3 img-fluid"

                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px', marginRight: '10px' }}

                />

              )

            ))}

          </div>





          <button type="submit" className="btn btn-primary">Save</button>

        </form>

      </div>

    </div>

  );

}





export default PropertyManagement;

