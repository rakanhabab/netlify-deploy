import axios from "axios";

const baseURL = "https://sda-3-onsite-backend-teamwork-urid.onrender.com/api/v1/users";
const baseURLn = "https://sda-3-onsite-backend-teamwork-urid.onrender.com/api/v1/users";

export const getUsers = async (token) => {
    const response = await axios.get(baseURLn,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);
    return response.data;
}
export const deleteUserById = async (userId) => {
    const response = await axios.delete(`${baseURLn}/${userId}`);
    return response.data;
}