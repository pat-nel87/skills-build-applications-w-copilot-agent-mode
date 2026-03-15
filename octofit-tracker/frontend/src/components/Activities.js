import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching activities from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Activities data:', data);
        const items = data.results || data;
        setActivities(Array.isArray(items) ? items : []);
      })
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3>&#127939; Activities</h3>
        <span className="badge bg-info">{activities.length} total</span>
      </div>
      <div className="card-body p-0">
        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr>
              <th>User</th>
              <th>Activity</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                <td>{activity.user}</td>
                <td><span className="badge bg-secondary">{activity.activity}</span></td>
                <td>{activity.distance} km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
