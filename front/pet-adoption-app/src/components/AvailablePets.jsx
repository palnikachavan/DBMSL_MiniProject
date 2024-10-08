import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AvailablePets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Fetch pets from the database (backend API)
    fetch('http://localhost:3001/api/pets')
      .then((response) => response.json())
      .then((data) => setPets(data));
  }, []);

  return (
    <div className='w-full'>
      <h1 className="text-3xl font-bold mb-4">Available Pets for adoption</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pets.map((pet) => (
          <div key={pet.pet_id} className="bg-white p-4 rounded-lg shadow-lg">
            <span className="text-xl font-semibold">{pet.name}</span>
            <span className='text-sm ml-3'>({pet.species_name})</span>
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

export default AvailablePets;
