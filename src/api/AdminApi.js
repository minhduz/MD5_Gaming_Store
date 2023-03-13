import axios from 'axios';
import axiosInstance from './axios-intercepter';
import { baseUrl } from '../constansts/baseUrl';

export const getAdminCategoryApi = async (pageNumber) => {
    console.log("pN",pageNumber);
    return await axiosInstance.get(`${baseUrl}/api/v1/category/getPagingAndSortByID?page=${pageNumber}&size&direction`)
};

export const getAllCategoryApi = async () => {
    return await axiosInstance.get(`${baseUrl}/api/v1/category/getAll`)
}

export const createCategoryApi = async (category) => {
    return await axiosInstance.post(`${baseUrl}/api/v1/category/create`, category)
}

export const deleteCategoryApi = async (categoryID) => {
    return await axiosInstance.delete(`${baseUrl}/api/v1/category/delete/${categoryID}`)
}

export const updateCategoryApi = async (categoryUpdated) => {
    return await axiosInstance.put(`${baseUrl}/api/v1/category/update/${categoryUpdated.categoryID}`, categoryUpdated)
}

export const searchCategoryApi = async (categoryName) => {
    return await axiosInstance.get(`${baseUrl}/api/v1/category/findByName/${categoryName}`)
}

export const getAdminGameApi = async (pageNumber) => {
    return await axiosInstance.get(`${baseUrl}/api/v1/game/getPagingGame?page=${pageNumber}&size&direction`)
};

export const createGameApi = async (game) => {
    console.log("api: ",game);
    return await axiosInstance.post(`${baseUrl}/api/v1/game/create`, game)
}

export const getPlatformApi = async () => {
    return await axiosInstance.get(`${baseUrl}/api/v1/platform/getAll`)
}

export const getGameDetailApi = async (gameID) => {
    return await axios.get(`${baseUrl}/api/v1/game/getByID/${gameID}`)
}

export const updateGameApi = async (gameUpdated) => {
    return await axiosInstance.put(`${baseUrl}/api/v1/game/update/${gameUpdated.gameID}`, gameUpdated)
}





