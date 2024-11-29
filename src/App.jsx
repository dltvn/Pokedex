import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage.jsx";
import GuessingGamePage from './pages/GuessingGamePage.jsx';
import TeamBuilderPage from './pages/TeamBuilderPage.jsx';
import PokedexPage from "./pages/PokedexPage.jsx";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-[100vh]">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/pokedex" element={<PokedexPage />} />
            <Route path="/who-is-that-pokemon" element={<GuessingGamePage />} />
            <Route path="/teams" element={<TeamBuilderPage />} />
            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/api/auth/google";
    }
    return Promise.reject(error);
  }
);

export default App;
