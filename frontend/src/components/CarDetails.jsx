import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CarDetail = ({ token }) => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  const fetchCar = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCar(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/'); // Redirect to the car list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [id, token]);

  if (!car) return <div>Loading...</div>;

  return (
    <div className='form'>
      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <p>Tags: {car.tags.join(', ')}</p>
      <div>
        {car.images.map((image, index) => (
          <img key={index} src={image} alt={car.title} style={{ width: '100px', height: 'auto' }} />
        ))}
      </div>
      <button onClick={handleDelete}>Delete Car</button>
      {/* Add edit functionality here */}
    </div>
  );
};

export default CarDetail;
