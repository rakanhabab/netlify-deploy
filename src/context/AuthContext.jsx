import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');

    const fetchData = async () => {
        try {
        } catch (error) {
            setError(error);
        } 
    };

    useEffect(() => {
        fetchData();
    }, [isLoggedIn]);
    
  return (
      <AuthContext.Provider value={{
          isAdmin, setIsAdmin,
          isLoggedIn, setIsLoggedIn,
          username, setUsername,
          id, setId
      }}>
      {children}
    </AuthContext.Provider>
  );
};
