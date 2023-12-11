import React, { useState, useEffect } from 'react';

function Issues() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ type: '', description: '' });
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/get/issues')
      .then((response) => response.json())
      .then((data) => setIssues(data))
      .catch((error) => console.error('Error fetching issues:', error));

    fetchTenantProperties();
  }, []);

  const fetchTenantProperties = async () => {
    const tenantUsername = localStorage.getItem('userUsername');
    console.log('Fetched username from localStorage:', tenantUsername);

    const response = await fetch(`http://localhost:9000/get-tenant-properties/${tenantUsername}`);
    if (response.ok) {
      const data = await response.json();
      console.log('Fetched properties:', data.properties);

      setPropertyOptions(data.properties);
      if (data.properties.length > 0) {
        setSelectedPropertyId(data.properties[0]._id);
      }
    } else {
      console.error('Failed to fetch properties:', response.statusText);
    }
  };

  const handlePropertyChange = (event) => {
    setSelectedPropertyId(event.target.value);
    console.log('Selected property ID:', event.target.value);
  };

  const createIssue = () => {
    const issueWithProperty = {
      ...newIssue,
      propertyId: selectedPropertyId,
    };

    fetch('http://localhost:9000/create/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(issueWithProperty),
    })
      .then((response) => response.json())
      .then((data) => {
        setIssues([...issues, data]);
        setNewIssue({ type: '', description: '', propertyId: '' });
      })
      .catch((error) => console.error('Error creating issue:', error));
  };

  const closeIssue = (id) => {
    fetch(`http://localhost:9000/update/issues/${id}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        setIssues(issues.map((issue) => (issue._id === id ? data : issue)));
      })
      .catch((error) => console.error('Error closing issue:', error));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Issues Page</h1>
      <div className="form-group">
        <label>Type:</label>
        <select
          className="form-control"
          onChange={(e) => setNewIssue({ ...newIssue, type: e.target.value })}
        >
          <option value="">Select an issue type</option>
          <option value="electric">Electric Issue</option>
          <option value="plumbing">Plumbing</option>
          <option value="flooring">Flooring</option>
          <option value="utility">Utility Issue</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="form-control"
          value={newIssue.description}
          onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
        />
        <label>Property:</label>
        <select
          className="form-control"
          value={selectedPropertyId}
          onChange={handlePropertyChange}
        >
          {propertyOptions.map((property) => (
            <option key={property._id} value={property._id}>
              {property._id}
            </option>
          ))}
        </select>
      </div>
      <br />
      <button className="btn btn-primary" onClick={createIssue}>
        Create Issue
      </button>
      <ul className="list-group mt-3">
        {issues.map((issue) => (
          <li key={issue._id} className="list-group-item">
            <p>Type: {issue.type}</p>
            <p>Description: {issue.description}</p>
            <p>Status: {issue.isOpen ? 'Open' : 'Closed'}</p>
            {issue.isOpen && (
              <button className="btn btn-danger" onClick={() => closeIssue(issue._id)}>
                Close Issue
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Issues;
