import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <div className="flex flex-col h-[100vh] overflow-hidden">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/pokedex" element={<PokedexPage />} />
            <Route path="/guess" element={<GuessingGamePage />} />
            <Route path="/" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/teams" element={<TeamBuilderPage />} />
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
