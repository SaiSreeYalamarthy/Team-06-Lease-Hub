import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

const Login = () => {
  const [loginType, setLoginType] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isValidUsername = username => username.trim() !== '';
  const isValidPassword = password => password.trim() !== '';

  const handleLogin = async (event) => {
    event.preventDefault();
    // Validate username and password
    if (!isValidUsername(username)) {
      alert('Please enter a username.');
      return;
    }

    if (!isValidPassword(password)) {
      alert('Please enter a password.');
      return;
    }

  try {
    const response = await fetch(`http://localhost:9000/login/${loginType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json(); // Parse the JSON response

    if (response.status === 200) {
        // Login successful, navigate to respective page
        if (loginType === 'owner') {
            localStorage.setItem('ownerSession', data.token); // Store the token in local storage
            // localStorage.setItem('ownerUsername', username); // Store the username in local storage
            console.log("BeforeLogin Owner", username)
            navigate('/owner',{state:{loggedin : true, username: username}});
        } 
        else if (loginType === 'service') {
          localStorage.setItem('serviceSession', data.token); // Store the token in local storage
          localStorage.setItem('serUsername', username); // Store the user username in local storage <-- Add this line
          console.log("Beforeservice", username)
          navigate('/serviceman',{state:{loggedin : true, username: username}});
        }
        else if (loginType === 'user') {
          
          localStorage.setItem('userSession', data.token); // Store the token
          // localStorage.setItem('userId',user._id);
          localStorage.setItem('userUsername', username); // Store the user username in local storage <-- Add this line

          navigate(`/user`,{state:{loggedin : true, username: username}});
          console.log(username);
          // navigate('/user');

        } else {
            navigate('/');
        }
    } else {
        // Login failed, alert the user
        alert(data.message); // Display the error message from the server
    }
} catch (error) {
    console.error('Login error:', error);
    alert('Login failed');
}
};

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white p-3 rounded">
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control as="select" value={loginType} onChange={(e) => setLoginType(e.target.value)}>
              <option value="user">User</option>
              <option value="owner">Owner</option>
              <option value="service">Service</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Login</Button>
          <p className="mt-3">
            Don't have an account?{' '}
            <Link to="/signup" className="btn btn-primary">Sign up</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default Login;





