// import React from 'react';
// import { Container, Card, Row, Col } from 'react-bootstrap';
// import HomeImage1 from './home1.jpg'; // Import your home images here
// import HomeImage2 from './home2.jpg';

// const SellPage = () => {
//   const sellHomes = [
//     {
//       id: 1,
//       imageSrc: HomeImage1,
//       price: '$300,000',
//       bedrooms: 4,
//       bathrooms: 2,
//     },
//     {
//       id: 2,
//       imageSrc: HomeImage2,
//       price: '$400,000',
//       bedrooms: 3,
//       bathrooms: 2.5,
//     },
//     // Add more homes as needed
//   ];

//   return (
//     <Container className="min-vh-100">
//       <h1 className="text-2xl font-bold mb-4">Sell Homes</h1>
//       <Row>
//         {sellHomes.map((home) => (
//           <Col key={home.id} md={6} lg={4} className="mb-4">
//             <Card>
//               <Card.Img src={home.imageSrc} alt={`Home ${home.id}`} />
//               <Card.Body>
//                 <Card.Title>Price: {home.price}</Card.Title>
//                 <Card.Text>Bedrooms: {home.bedrooms}</Card.Text>
//                 <Card.Text>Bathrooms: {home.bathrooms}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default SellPage;
import React, { useState, useEffect } from 'react';

const SellPage = () => {
  const [sellProperties, setSellProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:9000/properties?type=sell');
        if (!response.ok) {
          throw new Error('Failed to fetch properties.');
        }
        const properties = await response.json();
        setSellProperties(properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <h1>Welcome to the Sell Page</h1>
      <div className="properties-list">
        {sellProperties.map((property) => (
          <div key={property._id} className="property-card">
            <img src={property.imageUrl} alt={property.title} />
            <div className="property-info">
              <p>Price: {property.price}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              {/* Add more property details as needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellPage;
