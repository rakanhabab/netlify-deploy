import React from 'react'


import Users from '../components/users/Users';
import { UserProvider } from '../context/UserContext';

export default function UserList() {
  return (
    <div>
      <h2>List of Users</h2>
      <UserProvider>
        <Users/>
      </UserProvider>
  </div>
  )
}