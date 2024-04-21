import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const PanoramaForm = () => {
  const [universityName, setUniversityName] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('owner', universityName);
    formData.append('name', imageName);
    formData.append('image', imageFile);

    try {
      const response = await axios.post('http://localhost:8080/3d-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };
  return (
    <>
      <Navbar />
      <form
        onSubmit={handleFormSubmit}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          border: '2px solid #16826A',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0',
          padding: '5px 15px 25px 15px',
        }}
      >
        <h2
          style={{
            fontSize: '25px',
          }}
        >
          Добавить панораму
        </h2>
        <input
          style={{
            width: '350px',

            padding: '10px',
            border: '1px solid #ccc',
            backgroundColor: '#FAFCFC',
            borderRadius: '5px',
            fontSize: '16px',
            marginBottom: '10px',
          }}
          type="text"
          value={universityName}
          onChange={e => setUniversityName(e.target.value)}
          placeholder="Название вуза"
        />
        <input
          style={{
            width: '350px',

            padding: '10px',
            backgroundColor: '#FAFCFC',

            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            marginBottom: '10px',
          }}
          type="text"
          value={imageName}
          onChange={e => setImageName(e.target.value)}
          placeholder="Название картинки"
        />
        <input
          style={{
            width: '350px',

            padding: '10px',
            border: '1px solid #ccc',
            backgroundColor: '#FAFCFC',

            borderRadius: '5px',
            fontSize: '16px',
            marginBottom: '10px',
          }}
          type="file"
          onChange={e => setImageFile(e.target.files[0])}
        />
        <button
          style={{
            width: '250px',
            fontSize: '14px',
            padding: '15px 20px',
            backgroundColor: '#16826A',
            border: 'NONE',
            color: '#fff',
            cursor: 'pointer',
            borderRadius: '10px',
          }}
          type="submit"
        >
          Отправить
        </button>
      </form>
    </>
  );
};

export default PanoramaForm;
