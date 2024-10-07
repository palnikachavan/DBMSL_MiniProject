import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PetDetails() {
  const { id } = useParams();  // Get the pet ID from the URL
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    // Fetch pet details from the backend API
    fetch(`http://localhost:3001/api/pet/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
        return response.json();
      })
      .then((data) => {
        setPet(data);  // Set pet details
        setLoading(false);  // Stop loading
      })
      .catch((error) => {
        setError(error.message);  // Handle error
        setLoading(false);  // Stop loading
      });
  }, [id]);

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle errors
  if (error) {
    return <div>Error: {error}</div>;
  }

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
