
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./components/LandingPage.jsx";
import ProductSelection from "./components/ProductSelection.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select" element={<ProductSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
