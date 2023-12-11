import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container className="text-center">
        <h4>About Us</h4>
        <p>
          A platform where owners and potential buyers/renters can interact with each other.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
