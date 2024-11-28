import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage.jsx";
import GuessingGamePage from './pages/GuessingGamePage.jsx';
import TeamBuilderPage from './pages/TeamBuilderPage.jsx';

function App() {
  return (
    <div className="flex flex-col h-[100vh] overflow-hidden">
      <Header/>
      <div className="flex-1">
        <Router>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/guess" element={<GuessingGamePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/teams" element={<TeamBuilderPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
