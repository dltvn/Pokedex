import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage.jsx";

function App() {
  return (
    <div className="flex flex-col h-[100vh] overflow-hidden">
      <Header/>
      <div className="flex-1">
        <Router>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
