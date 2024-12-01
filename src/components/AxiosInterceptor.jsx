import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Retrieve JWT token from localStorage
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Add the token to Authorization header
        }
        return config;
      },
      (error) => {
        // Handle request error
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Redirect to login page on 401 Unauthorized
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup both interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor); // Remove request interceptor
      axios.interceptors.response.eject(responseInterceptor); // Remove response interceptor
    };
  }, [navigate]);

  return children;
};

export default AxiosInterceptor;
