
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

const Signup = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('user');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    ssn: '',
    occupation: ''
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = phone => /^\d{10}$/.test(phone);
  const isValidSSN = ssn => /^\d{3}-\d{2}-\d{4}$/.test(ssn);
  const isStrongPassword = password => password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate fields based on the user type
    const fieldsToValidate = {
      user: ['firstName', 'lastName', 'username', 'password', 'email', 'phone'],
      owner: ['firstName', 'lastName', 'username', 'password', 'email', 'phone', 'address'],
      service: ['username', 'password', 'email', 'ssn', 'occupation']
    };

    for (let field of fieldsToValidate[type]) {
      if (formData[field].trim() === '') {
        alert(`Please fill out the ${field} field.`);
        return;
      }
    }

    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if ((type === 'user' || type === 'owner') && !isValidPhone(formData.phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    if (type === 'service' && !isValidSSN(formData.ssn)) {
      alert('Please enter a valid SSN in the format XXX-XX-XXXX.');
      return;
    }

    if (!isStrongPassword(formData.password)) {
      alert('Password must be at least 8 characters long and include at least one uppercase letter and one number.');
      return;
    }

    try {
      const endpoint = `http://localhost:9000/signup/${type}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.status === 201) {
        alert(`${type} signup successful`);
      } else {
        alert(`${type} signup failed: ` + data.message);
      }
      // if (type === 'owner') {
      //   navigate('/owner'); // Replace '/owner' with the actual owner page route
      // } else if (type === 'service') {
      //   navigate('/serviceman'); // Replace '/service' with the actual service page route
      // } else {
      //   navigate('/'); // Redirect to the home page for other types
      // }
    } catch (error) {
      console.error('Error:', error);
      alert(`${type} signup failed: ` + error.message);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white p-3 rounded">
        <h2>Sign-Up</h2>
        <Form onSubmit={handleSubmit}>
          {/* Select Type of Signup */}
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control as="select" name="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="user">User</option>
              <option value="owner">Owner</option>
              <option value="service">Service</option>
            </Form.Control>
          </Form.Group>

          {/* Common Fields */}
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text" name="firstName" placeholder="Enter first name"
              value={formData.firstName} onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text" name="lastName" placeholder="Enter last name"
              value={formData.lastName} onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text" name="username" placeholder="Enter username"
              value={formData.username} onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>password</Form.Label>
            <Form.Control
              type="text" name="password" placeholder="Enter password"
              value={formData.password} onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>email</Form.Label>
            <Form.Control
              type="text" name="email" placeholder="Enter email"
              value={formData.email} onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>phone</Form.Label>
            <Form.Control
              type="text" name="phone" placeholder="Enter phone"
              value={formData.phone} onChange={handleChange}
            />
          </Form.Group>
          {/* ... Add other common fields: lastName, username, password, email, phone */}

          {/* Additional Fields for Owner and Service */}
          {['owner', 'service'].includes(type) && (
            <>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text" name="address" placeholder="Enter address"
                  value={formData.address} onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>SSN</Form.Label>
                <Form.Control
                  type="text" name="ssn" placeholder="Enter SSN"
                  value={formData.ssn} onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {/* Additional Field for Service */}
          {type === 'service' && (
            <Form.Group>
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                type="text" name="occupation" placeholder="Enter occupation"
                value={formData.occupation} onChange={handleChange}
              />
            </Form.Group>
          )}

          <Button variant="success" type="submit">Sign up</Button>
          <p className="mt-3">
            Already have an account?{' '}
            <Link to="/login" className="btn btn-primary">Log in</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;





