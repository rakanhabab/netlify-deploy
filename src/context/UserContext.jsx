import { createContext, useState, useEffect } from "react";

import { getUsers } from "../services/userService";
import { jwtDecode } from "jwt-decode";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalItems, setTotalItems] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const token = localStorage.getItem('authToken');

    console.log(jwtDecode(token));


    const fetchData = async () => {
        try {
            setIsLoading(true);

            const data = await getUsers(token);

            console.log(data);
            console.log("Count", data.data.length);

            const filteredUsers = data.data.filter(user =>
                user.userName.toLowerCase().includes(searchQuery.toLowerCase())
              );
        
            setTotalItems(filteredUsers.length);
            setPageSize(10);  
        
            const startIndex = (pageNumber - 1) * pageSize;  
            const endIndex = startIndex + pageSize;
        
            const currentPageUsers = filteredUsers.slice(startIndex, endIndex);
            setUsers(currentPageUsers);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageNumber]);

    useEffect(() => {
        setPageNumber(1);
        fetchData();
    }, [searchQuery]);
    
    
  return (
      <UserContext.Provider value={{
          users, setUsers,
          isLoading, setIsLoading,
          error, setError,
          totalItems, pageSize,
          pageNumber, setPageNumber,
          searchQuery, setSearchQuery
      }}>
      {children}
    </UserContext.Provider>
  );
};
