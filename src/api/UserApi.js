import axios from 'axios';
import { baseUrl } from '../constansts/baseUrl';

export const getHomeCategoryApi = async () =>{
    return await axios.get(`${baseUrl}/api/v1/category/getHomeCategory`)
};

export const loginApi = async (loginInfo) => {
    return await axios.post(`${baseUrl}/api/v1/user/login`, loginInfo)
}
   
export const getHomeGameApi = async () =>{
    return await axios.get(`${baseUrl}/api/v1/game/getHomeGame`)
};

export const signupApi = async (signupInfo) => {
    return await axios.post(`${baseUrl}/api/v1/user/signup`, signupInfo)
};

export const getGameCategoryApi = async (categoryID) => {
    return await axios.get(`${baseUrl}/api/v1/category/findCategoryGame/${categoryID}`)
}

