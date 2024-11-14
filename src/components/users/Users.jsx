import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { UserContext } from '../../context/UserContext';
import Pagination from '../navbar/Pagination';
import SearchBar from '../SearchBar';
import { useNavigate } from 'react-router-dom';

import { deleteUserById } from '../../services/userService';

const Users = () => {
  const { users, isLoading, error, pageNumber, setPageNumber, totalItems, pageSize, searchQuery, setSearchQuery } = useContext(UserContext);
  const isAdmin = localStorage.getItem('isAdmin') === "true";
  const isLoggedIn = localStorage.getItem('isLoggedIn') === "true";

  const navigate = useNavigate();

  if (!isAdmin) {
    window.location.href = '/';
  }

  if (isLoading) {
    return <p>Products are loading please wait...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  const handleDeleteButtonClick = async (user) => {
    if (window.confirm("are you sure you want to delete this user?"))
      deleteUserById(user);
  };

  

  return (
    <div className="container mt-4">
      <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      <h2 className="mb-4">Here are the Users!</h2>
      {users.length === 0 ? (
        <p className="text-muted">No users found.</p>
      ) : (
        users.map(user => (
          <div key={user.userId} className="user-item p-3 mb-3 border shadow-sm rounded">
            <h5>{user.userName}</h5>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age > 0 ? user.age : 'N/A'}</p>
            <p><strong>Address:</strong> {user.address || 'N/A'}</p>
            <div className="mt-3">
              {/* <button 
                className="btn btn-primary mr-2" 
                onClick={() => handleDetailsButtonClick(user.userId)}
              >
                User Details
              </button> */}
              <button 
                className="btn btn-danger" 
                onClick={() => handleDeleteButtonClick(user.userId)}
              >
                Delete User
              </button>
            </div>
          </div>
        ))
      )}
      <Pagination
        pageSize={pageSize}
        totalItems={totalItems}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}

export default Users;