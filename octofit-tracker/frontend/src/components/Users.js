import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Fetching users from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Users data:', data);
        const items = data.results || data;
        setUsers(Array.isArray(items) ? items : []);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3>&#128100; Users</h3>
        <span className="badge bg-primary">{users.length} users</span>
      </div>
      <div className="card-body p-0">
        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td><strong>{user.name}</strong></td>
                <td><a href={`mailto:${user.email}`} className="link-info">{user.email}</a></td>
                <td><span className="badge bg-secondary">{user.team}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
