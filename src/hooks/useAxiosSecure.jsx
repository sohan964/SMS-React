import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: "http://localhost:5074/api"
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(config =>{
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },(error)=>{
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(response =>{
        return response;
    }, async(error)=>{
        const status = error.response.status;
        if(status === 401 || status === 403){
            localStorage.removeItem('access-token');
            navigate('/');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;