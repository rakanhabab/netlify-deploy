import axios from "axios";

const baseURL = "https://sda-3-onsite-backend-teamwork-urid.onrender.com/api/v1/products";
const baseURLn = "https://sda-3-onsite-backend-teamwork-urid.onrender.com/api/v1/products";
export const getProducts = async (
    pageNumber = 1,
    pageSize = 5,
    searchQuery = "",
    sortBy = "default",
    categoryFilter = ""
) => {
    const params = new URLSearchParams();

    
    console.log(baseURLn);
    console.log(baseURLn);

    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);

    if (searchQuery) {
        params.append('searchQuery', searchQuery);
    }
    
    if (sortBy != "default") {
      params.append('sortBy', sortBy);
    }
    if (categoryFilter) {
      params.append('categoryFilter', categoryFilter);
    }

    const response = await axios.get(`${baseURLn}?${params.toString()}`);
    return response.data;
}
export const getProductById = async (productId) => {
    const response = await axios.get(`${baseURLn}/${productId}`);
    return response.data;
}
export const deleteProductById = async (productId) => {
    const response = await axios.delete(`${baseURLn}/${productId}`);
    return response.data;
}

export const updateProduct = async (productId, updatedProductData) => {
    const response = await axios.put(`${baseURLn}/${productId}`, updatedProductData);
    return response;
}
export const createProduct = async (createProductData) => {
    const response = await axios.post(`${baseURLn}`, createProductData);
    return response;
}
export const getAllCategories = async () => {
    const response = await axios.get('https://sda-3-onsite-backend-teamwork-urid.onrender.com/api/v1/categories');
    console.log(baseURLn);
    return response;
}

