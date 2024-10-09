import React, { useEffect, useState } from 'react';

const AdoptionHistory = () => {
    const [adopters, setAdopters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const fetchAdoptionHistory = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/adopt/history');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAdopters(data);
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
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">Adoption History</h1>
            {adopters.length === 0 ? (
                <p>No adoption history available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {adopters.map((adopter, index) => (
                        <div
                            key={index}
                            className="adopter-card border-solid border-2 border-sky-500 p-4 rounded-lg"
                        >
                            <p><strong>Name:</strong> {adopter.first_name} {adopter.last_name}</p>
                            <p><strong>Email:</strong> {adopter.email}</p>
                            <p><strong>Phone:</strong> {adopter.phone}</p>
                            <p>
                                <strong>Address:</strong> {adopter.address}, {adopter.city}, {adopter.state} - {adopter.zip_code}
                            </p>
                            <p><strong>Preferred Species:</strong> {adopter.preferred_species}</p>
                            <p><strong>Adoption History:</strong> {adopter.adoption_history ? adopter.adoption_history.split(',').join(', ') : 'None'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdoptionHistory;
