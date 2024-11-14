import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './ANB.css';


export default function AdminNavBar() {

  return (
    
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'lightcyan' }}>
      <div className="container">
      <h2>Admin Navigation Panel</h2>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarAdmin" aria-controls="navbarAdmin" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        
        <div className="collapse navbar-collapse" id='navbarAdmin'>
          <ul className="navbar-nav mx-auto">  
            <li className="nav-item">
              <Link className="nav-link" to="/create-product">Create Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin-product-listing">Product Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Orders Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">Users Dashboard</Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}