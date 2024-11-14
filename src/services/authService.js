import axios from "axios";

const baseURL = "https://sda-3-onsite-backend-teamwork-urid.onrender.com/api/v1/auth";
const baseURLn = "https://sda-3-onsite-backend-teamwork-urid.onrender.com/api/v1/auth";

console.log(baseURLn);
console.log(baseURLn);
console.log(baseURLn);

export const register = async (userRegisterDto) => {
    const response = await axios.post(`${baseURLn}/register`, userRegisterDto);
    return response.data; 
}

export const login = async (userLoginDto) => {
    console.log(baseURLn);
    console.log(baseURLn);
    const response = await axios.post(`${baseURLn}/login`, userLoginDto);
    
    return response.data; 
}