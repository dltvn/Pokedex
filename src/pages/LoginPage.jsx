import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // React Router's useNavigate

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Send credential (ID token) to your server
      const response = await axios.post("/api/auth/google", { idToken: credential });

      // Save the JWT received from your server
      localStorage.setItem("token", response.data.token);

      alert("Login successful!");
      
      // Navigate to /pokedex after login success
      window.location.href = "/pokedex";
    } catch (error) {
      console.error("Error during server authentication:", error);
      alert("Login failed.");
    }
  };

  const handleError = () => {
    console.error("Google Login failed");
    alert("Google Login failed.");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
