import { createContext, useState, useEffect } from "react";
import { getOrders } from "../services/orderService";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const isAdmin = localStorage.getItem('isAdmin') === "true";
            console.log(isAdmin);
            console.log(localStorage.getItem('username'));

            if (!isAdmin) {
                const data = await getOrders(pageNumber, 20, localStorage.getItem('username'));
                console.log(data);

                setTotalItems(data.data.totalItems);
                setPageSize(data.data.pageSize);
                setOrders(data.data.orders);
            } else {
                const data = await getOrders(pageNumber, 20, searchQuery);
                console.log(data);

                setTotalItems(data.data.totalItems);
                setPageSize(data.data.pageSize);
                setOrders(data.data.orders);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageNumber, searchQuery]);

    
    
  return (
      <OrderContext.Provider value={{
          orders,
          isLoading, error,
          totalItems, pageSize,
          searchQuery, setSearchQuery,
          pageNumber, setPageNumber
      }}>
      {children}
    </OrderContext.Provider>
  );
};