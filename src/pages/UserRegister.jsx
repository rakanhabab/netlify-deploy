import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import { register } from '../services/authService';

const UserRegister = () => {
  const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [PasswordConfirmation, setPasswordConfirmation] = useState('');
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: '',
        Address: '',
        Age: 0,
    });

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      
      if (name === 'PasswordConfirmation') {
        setPasswordConfirmation(value);
      } else {
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.Password == PasswordConfirmation) {
        console.log(formData);
        await register(formData);
        alert('User Registerd successfully');
        navigate("/login");
      } else {
        alert('Passwords do not match');
      }
      } catch (err) {
        setError(err);
        alert('Failed to register');
      }
     };

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-5">
          <h2 className="mb-4">Register!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">User Name:</label>
              <input
                type="text"
                id="Username"
                name="Username"
                className="form-control"
                value={formData.Username}
                onChange={handleInputChange}
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="PasswordConfirmation" className="form-label">Password Confirmation:</label>
              <input
                type="password"
                id="PasswordConfirmation"
                name="PasswordConfirmation"
                className="form-control"
                value={PasswordConfirmation}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">Address:</label>
              <textarea
                id="Address"
                name="Address"
                className="form-control"
                value={formData.Address}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Age" className="form-label">Age:</label>
              <input
                  type="number"
                  id="Age"
                  name="Age"
                  className="form-control"
                  value={formData.Age}
                  onChange={handleInputChange}
                  min="0" 
              />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>  
      );
    };
    
export default UserRegister;