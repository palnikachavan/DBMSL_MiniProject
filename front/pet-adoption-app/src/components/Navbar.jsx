import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/pets" className="hover:underline">
            Available Pets
          </Link>
        </li>
        <li>
          <Link to="/adoptions" className="hover:underline">
            Adoption History
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
