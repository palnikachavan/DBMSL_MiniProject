import React, { useEffect, useState } from 'react';

const AdoptionHistory = () => {
    const [adopters, setAdopters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdoptionHistory = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/adopt/history');
                const data = await response.json();
                console.log(data); // Add this line to check the data in the console
                setAdopters(data); // Set fetched data into the adopters state
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch adoption history');
                setLoading(false);
            }
        };

        fetchAdoptionHistory();
    }, []);

    if (loading) {
        return <p>Loading adoption history...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='w-full p-2 m-2'>
            <h1 className="text-3xl font-bold mb-4">Adoption History</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {adopters.length === 0 ? (
                    <p>No adoption history available.</p>
                ) : (
                    adopters.map((adopter, index) => (
                        <div key={index} className="adopter-card border-solid border-2 border-sky-500 p-4 rounded-lg">
                            <p><strong>Email:</strong> {adopter.email}</p>
                            <p><strong>Phone:</strong> {adopter.phone}</p>
                            <p><strong>Address:</strong> {adopter.address}, {adopter.city}, {adopter.state} - {adopter.zip_code}</p>
                            <p><strong>Preferred Species:</strong> {adopter.preferred_species}</p>
                            <p><strong>Adoption History:</strong> {adopter.adoption_history || 'None'}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};


// <div className='w-full'>
// <h1 className="text-3xl font-bold mb-4">Available Pets for adoption</h1>
// <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//   {pets.map((pet) => (
//     <div key={pet.pet_id} className="bg-white p-4 rounded-lg shadow-lg">
//       <span className="text-xl font-semibold">{pet.name}</span>
//       <span className='text-sm ml-3'>({pet.species_name})</span>
//       <p>{pet.breed}</p>
//       <p>{pet.age} years old</p>
//       <Link to={`/pet/${pet.pet_id}`} className="text-blue-500 hover:underline">
//         View Details
//       </Link>
//     </div>
//   ))}
// </div>
// </div>


export default AdoptionHistory;
