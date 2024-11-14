import { createContext, useState, useEffect } from "react";
import { getProducts, getAllCategories } from "../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [sortBy, setSortBy ] = useState('default');
    const [searchQuery, setSearchQuery ] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const categoriesData = await getAllCategories();

            setCategories(categoriesData.data.data);

            const data = await getProducts(pageNumber, 6, searchQuery, sortBy, category);

            setTotalItems(data.data.totalItems);
            setPageSize(data.data.pageSize);
            setProducts(data.data.products);
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
    }, [category, searchQuery, sortBy]);
    
  return (
      <ProductContext.Provider value={{
          products,
          categories, setCategories,
          isLoading,
          error,
          totalItems,
          pageSize,
          sortBy, setSortBy,
          searchQuery, setSearchQuery,
          pageNumber, setPageNumber,
          category, setCategory
      }}>
      {children}
    </ProductContext.Provider>
  );
};