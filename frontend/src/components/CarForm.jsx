import React, { useState } from 'react';
import axios from 'axios';

const CarForm = ({ token, fetchCars }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags.split(','));
    images.forEach(image => formData.append('images', image));

    try {
      await axios.post('http://localhost:5000/api/cars', formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchCars(); // Refresh the car list after adding a new car
      setTitle('');
      setDescription('');
      setTags('');
      setImages([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>Add a New Car</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
      <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default CarForm;