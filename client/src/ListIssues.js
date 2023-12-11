import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const IssueList = () => {
    const [issues, setIssues] = useState([]);
    const location = useLocation();
    const loggedUsername = location.state?.username || localStorage.getItem('username') || '';

    useEffect(() => {
        const fetchPropertiesAndIssues = async () => {
            // Fetch properties with the username query
            const propertiesResponse = await fetch(`http://localhost:9000/get/properties?username=${encodeURIComponent(loggedUsername)}`);
            if (!propertiesResponse.ok) {
                throw new Error('Network response was not ok for properties');
            }
            const propertiesData = await propertiesResponse.json();
            const ownedPropertyIds = propertiesData.map(property => property._id);

            // Fetch issues with the username query
            const issuesResponse = await fetch(`http://localhost:9000/get/issues?username=${encodeURIComponent(loggedUsername)}`);
            if (!issuesResponse.ok) {
                throw new Error('Network response was not ok for issues');
            }
            const issuesData = await issuesResponse.json();
            
            // Filter issues to include only those that are associated with owned properties
            const relatedIssues = issuesData.filter(issue => ownedPropertyIds.includes(issue.property.toString()));
            setIssues(relatedIssues);
        };

        if (loggedUsername) {
            fetchPropertiesAndIssues().catch(console.error);
        } else {
            console.error('Username not found for issue list.');
        }
    }, [loggedUsername]); // Dependency array ensures useEffect runs when loggedUsername changes

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Issues Page</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.map((issue) => (
                        <tr key={issue._id}>
                            <td>{issue.type}</td>
                            <td>{issue.description}</td>
                            <td style={{ color: issue.isOpen ? 'red' : 'green' }}>
                                {issue.isOpen ? 'Open' : 'Closed'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IssueList;

