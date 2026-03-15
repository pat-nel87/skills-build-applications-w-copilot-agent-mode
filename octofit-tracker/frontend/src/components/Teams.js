import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching teams from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Teams data:', data);
        const items = data.results || data;
        setTeams(Array.isArray(items) ? items : []);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3>&#129309; Teams</h3>
        <span className="badge bg-success">{teams.length} teams</span>
      </div>
      <div className="card-body p-0">
        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td><strong>{team.name}</strong></td>
                <td>
                  {Array.isArray(team.members)
                    ? team.members.map((m, i) => (
                        <span key={i} className="badge bg-outline-info me-1">{m}</span>
                      ))
                    : String(team.members)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
