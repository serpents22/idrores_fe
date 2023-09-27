import router from "@/router";
import axios from "axios"


  const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // baseURL: 'https://www.idrolife-idrobit.com/api/v1',
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    }
  })
  

  const authInterceptor = (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem('auth.token')}`;
    return config;
  }
  
  const clearLocalStorageOnUnauthorized = (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.clear();
    }
    return Promise.reject(error);
  };
  
  apiClient.interceptors.request.use(authInterceptor);
  apiClient.interceptors.response.use((response) => response, clearLocalStorageOnUnauthorized);
  
  export default apiClient

