import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching workouts from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Workouts data:', data);
        const items = data.results || data;
        setWorkouts(Array.isArray(items) ? items : []);
      })
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3>&#128187; Workouts</h3>
        <span className="badge bg-danger">{workouts.length} workouts</span>
      </div>
      <div className="card-body p-0">
        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr>
              <th>User</th>
              <th>Workout</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index}>
                <td>{workout.user}</td>
                <td><span className="badge bg-secondary">{workout.workout}</span></td>
                <td><strong>{workout.reps}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
