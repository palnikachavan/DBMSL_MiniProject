import { useState, useEffect } from 'react';

const FilterComponent = ({ onFilter }) => {
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');

  useEffect(() => {
    // Fetch species options from the backend
    fetch('http://localhost:3001/api/pets/species')
      .then((response) => response.json())
      .then((data) => setSpecies(data));

    // Fetch breeds options from the backend
    fetch('http://localhost:3001/api/pets/breeds')
      .then((response) => response.json())
      .then((data) => setBreeds(data));
  }, []);

  const handleFilter = () => {
    onFilter({ species: selectedSpecies, breed: selectedBreed });
  };

  return (
    <div className="mb-4">
      <select
        value={selectedSpecies}
        onChange={(e) => setSelectedSpecies(e.target.value)}
        className="mr-4 p-2 border rounded"
      >
        <option value="">All Species</option>
        {species.map((s) => (
          <option key={s.species_name} value={s.species_name}>
            {s.species_name}
          </option>
        ))}
      </select>

      <select
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Breeds</option>
        {breeds.map((b) => (
          <option key={b.breed} value={b.breed}>
            {b.breed}
          </option>
        ))}
      </select>

      <button onClick={handleFilter} className="ml-4 p-2 bg-blue-500 text-white rounded">
        Filter
      </button>
    </div>
  );
};

export default FilterComponent;
