import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarList = ({ token }) => {
  const [cars, setCars] = useState([]); // Initialize as an empty array
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cars', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(response.data); // Ensure this is an array
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]); // Reset to an empty array on error
    }
  };

  useEffect(() => {
    if (token) {
      fetchCars();
    }
  }, [token]);

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className='form'>
      <h2>Your Cars</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <li key={car._id}>
              <Link to={`/cars/${car._id}`}>{car.title}</Link>
            </li>
          ))
        ) : (
          <li>No cars found.</li>
        )}
      </ul>
    </div>
  );
};

export default CarList;
