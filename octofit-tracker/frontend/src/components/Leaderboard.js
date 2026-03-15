import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching leaderboard from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Leaderboard data:', data);
        const items = data.results || data;
        setLeaderboard(Array.isArray(items) ? items : []);
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3>&#127942; Leaderboard</h3>
        <span className="badge bg-warning text-dark">{leaderboard.length} teams</span>
      </div>
      <div className="card-body p-0">
        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index}>
                <td><span className="badge bg-info">{index + 1}</span></td>
                <td>{entry.team}</td>
                <td><strong>{entry.points}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
