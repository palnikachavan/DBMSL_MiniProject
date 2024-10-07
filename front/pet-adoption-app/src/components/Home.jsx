import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch pets from the database (backend API)
    fetch('/api/pets')
      .then((response) => response.json())
      .then((data) => setPets(data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Available Pets</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pets.map((pet) => (
          <div key={pet.pet_id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{pet.name}</h2>
            <p>{pet.breed}</p>
            <p>{pet.age} years old</p>
            <Link to={`/pet/${pet.pet_id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
