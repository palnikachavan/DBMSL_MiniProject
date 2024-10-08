import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import AvailablePets from './components/AvailablePets.jsx';
import AdoptionHistory from './components/AdoptionHistory.jsx';
import ContactUs from './components/ContactUs.jsx';
import PetDetails from './components/PetDetails.jsx';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<AvailablePets />} />
          <Route path="/adoptions" element={<AdoptionHistory />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pet/:id" element={<PetDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
