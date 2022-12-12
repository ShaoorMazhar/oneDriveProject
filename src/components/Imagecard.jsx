import React from 'react';

import { Navigate, useNavigate } from 'react-router-dom';
export default function Imagecard() {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate('/');
  };
  return (
    <div className='container text-center'>
      <h3 style={{ marginTop: '2rem' }}>This is Image</h3>
      <div
        className='row align-items-center mt-5'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div
          style={{
            height: '500px',
            overflow: 'hidden',
            padding: '0',
          }}
          className='col-5'
        >
          <img
            style={{ objectFit: 'contain' }}
            src='https://mymodernmet.com/wp/wp-content/uploads/2021/04/Nature-Sounds-For-Well-Being-03.jpg'
            alt='dummyImage'
          />
        </div>
        <button
          type='button'
          class='btn btn-primary'
          style={{ marginTop: '2rem' }}
          onClick={handleReturn}
        >
          Back
        </button>
      </div>
    </div>
  );
}
