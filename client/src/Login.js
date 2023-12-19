import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      // Faceți o cerere POST către server pentru autentificare
      fetch('http://localhost:8080/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (response.ok) {
            alert('Te-ai conectat cu success!');
            return response.json();
          } else {
            throw new Error('Utilizator sau parolă incorecte.');
          }
        })
        .then((data) => {
          console.log(data); // Afișați răspunsul primit de la server (opțional)
          setLoggedIn(true);
        })
        .catch((error) => {
          console.error('Eroare la autentificare:', error.message);
          alert(error.message); // Afișați un mesaj de eroare
        });
    } else {
      alert('Vă rugăm să completați toate câmpurile.');
    }
  };
  
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="container mt-5">
      {loggedIn ? (
        <div>
          <h1>Bun venit, {username}!</h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
