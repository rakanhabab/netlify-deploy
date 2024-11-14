import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import { login } from '../services/authService';
//import { AuthContext } from '../context/AuthContext';

const UserLogin = () => {
  //const { setUsername, setIsAdmin, setIsLoggedIn, isLoggedIn, setId} = useContext(AuthContext)
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    Email: '',
    Password: ''
  });
  


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await login(formData);
      console.log(response);
      if (response.isBanned) {
        alert('this User is banned, We cannot Log you in');
      } else {
        alert('Logged In successfully');

        console.log(response);

        localStorage.setItem('authToken', response.token);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('isAdmin', response.isAdmin);
        localStorage.setItem('username', response.username);
        localStorage.setItem('id', response.id);

        window.location.href = '/';
      }
    } catch (err) {
      setError(err);
      alert('Failed to Log In');
    }
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <h2 className="mb-4 text-center">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email:</label>
              <input
                type="text"
                id="Email"
                name="Email"
                className="form-control"
                value={formData.Email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">Password:</label>
              <input
                type="password"
                id="Password"
                name="Password"
                className="form-control"
                value={formData.Password}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
            <div className="text-center">
              <Link to="/register">Not Registered?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UserLogin;