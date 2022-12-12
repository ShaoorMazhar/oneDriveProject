import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Imagecard() {
  const [imageLink, setImageLink] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate('/');
  };
  const rootData = async () => {
    const result = await getSingleItem(id);

    setImageLink(result?.data['@microsoft.graph.downloadUrl']);
  };
  useEffect(() => {
    rootData();
  }, []);
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
            src={imageLink}
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
