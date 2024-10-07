import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`/api/pets/${id}`)
      .then((response) => response.json())
      .then((data) => setPet(data));
  }, [id]);

  if (!pet) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>
      <p><strong>Species:</strong> {pet.species}</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age} years</p>
      <p><strong>Weight:</strong> {pet.weight} kg</p>
      <p><strong>Health Status:</strong> {pet.health_status}</p>
      <p className="mb-4">{pet.description}</p>
      {!pet.is_adopted ? (
        <Link to={`/adopt/${pet.pet_id}`} className="bg-blue-500 text-white py-2 px-4 rounded">
          Adopt Me!
        </Link>
      ) : (
        <p className="text-green-600 font-semibold">Adopted</p>
      )}
    </div>
  );
}

export default PetDetails;
