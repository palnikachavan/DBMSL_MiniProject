import { useParams } from 'react-router-dom';
import { useState } from 'react';

function AdopterForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the backend
    fetch(`/api/adopt/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log('Adopted successfully', data));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Adopt a Pet</h1>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="border p-2 mb-4 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
}

export default AdopterForm;
