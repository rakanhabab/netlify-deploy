import axios from "axios";

const baseURL = "https://sda-3-onsite-backend-teamwork-urid.onrender.com/api/v1/orders";
const baseURLn = "https://sda-3-onsite-backend-teamwork-urid.onrender.com/api/v1/orders";
//
export const getOrders = async (
    pageNumber = 1,
    pageSize = 20,
    searchQuery = ""
) => {
    const params = new URLSearchParams();

    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);

    console.log(searchQuery);

    if (searchQuery) {
        params.append('searchQuery', searchQuery);
    }
    
    const response = await axios.get(`${baseURLn}?${params.toString()}`);
    return response.data;
}

export async function processPayment({ cartData, userId }) {
    
    const createOrderDto = {
      UserId: userId,  
      OrderProducts: cartData.map(item => ({
        ProductId: item.productId,
        Quantity: item.quantity,
        Price: item.price
      }))
    };
  
    try {
      const response = await axios.post(baseURLn, createOrderDto);
  
      if (response.status == 201) {
        return response.data; 
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
}

    export const updateOrder = async (orderId, updateOrderDto) => {
      const response = await axios.put(`${baseURLn}/${orderId}`, updateOrderDto);
      console.log(response);
        return response;
    }
    
    
    export const getOrderById = async (orderId) => {
        const response = await axios.get(`${baseURLn}/${orderId}`);
        return response.data;
    }

    export const deleteOrderById = async (orderId) => {
      const response = await axios.delete(`${baseURLn}/${orderId}`);
      console.log(response);
    return response.data;
}