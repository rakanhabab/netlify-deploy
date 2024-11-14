import React from 'react'
import NavBar from '../navbar/NavBar'
import AdminNavBar from '../navbar/AdminNavBar';
import './Header.css';


const Header = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <header>
      <NavBar />
      {isAdmin && (
        <div className="admin-panel">
          <AdminNavBar />
        </div>
      )}
    </header>
  );
};
export default Header