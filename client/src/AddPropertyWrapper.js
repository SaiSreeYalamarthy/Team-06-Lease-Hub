

import React from 'react';
import { useLocation } from 'react-router-dom';
import AddProperty from './AddProperty'; // Assuming AddProperty is in the same directory

const AddPropertyWrapper = () => {
  const location = useLocation();
//   const username = "random";
  const { username } = location.state || { username: "username" }; // Default username if not provided

  console.log("Username received in wrapper:", username);


  return <AddProperty username={username} />;
};

export default AddPropertyWrapper;

