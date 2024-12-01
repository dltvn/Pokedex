import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          navigate("/login"); // Redirect to Google OAuth login
        }
        return Promise.reject(error);
      }
    );
    axios.interceptors.request.use(
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

    // Cleanup the interceptor on unmount
    return () => {
        axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return children;
};

export default AxiosInterceptor;
