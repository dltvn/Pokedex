import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage.jsx";
import GuessingGamePage from './pages/GuessingGamePage.jsx';
import TeamBuilderPage from './pages/TeamBuilderPage.jsx';
import PokedexPage from "./pages/PokedexPage.jsx";
import axios from "axios";
import Modal from "react-modal";
import LoginPage from './pages/LoginPage.jsx';
import AxiosInterceptor from './components/AxiosInterceptor.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement("#root");

function App() {
  return (
    <Router>
      <AxiosInterceptor/>
      <div className="flex flex-col min-h-[100vh] relative">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/pokedex" element={<PokedexPage />} />
            <Route path="/who-is-that-pokemon" element={<GuessingGamePage />} />
            <Route path="/teams" element={<TeamBuilderPage />} />
            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

if (import.meta.env.MODE === 'production') {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

export default App;
