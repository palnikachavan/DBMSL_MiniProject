import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import PetDetails from './components/PetDetails.jsx';
import AdopterForm from './components/AdopterForm.jsx';
import Admin from './components/Admin.jsx';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pet/:id" element={<PetDetails />} />
          <Route path="/adopt/:id" element={<AdopterForm />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
