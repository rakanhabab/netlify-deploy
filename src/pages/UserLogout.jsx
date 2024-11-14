import React from 'react';

function UserLogout() {

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('username');
    localStorage.removeItem('id');

    window.location.href = '/';
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <p>Logging you out...</p>
    </div>
  );
}

export default UserLogout;