import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token"); // Remove token
          navigate("/login"); // Redirect to login page
        }
        return Promise.reject(error);
      }
    );

    // Cleanup Interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return null; // This component does not render anything
};

export default AxiosInterceptor;
