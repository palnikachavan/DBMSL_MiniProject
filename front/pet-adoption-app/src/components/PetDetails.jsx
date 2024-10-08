import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../index.css"

function PetDetails() {
  const { id } = useParams(); // Fetches 'id' from the URL params
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/pets/${id}`) // Make sure this URL matches your backend route
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
        return response.json();
      })
      .then((data) => {
        setPet(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading pet details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return pet ? (
    <div className='center'>
      <h1 className='text-3xl font-bold'>{pet.name}</h1>
      <p className='pt-3'>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>
      <p>Gender: {pet.gender}</p>
      <p>Description: {pet.description}</p>
      <p>Health Status: {pet.health_status}</p>
    </div>
  ) : (
    <p>No pet details found</p>
  );
}

export default PetDetails;
