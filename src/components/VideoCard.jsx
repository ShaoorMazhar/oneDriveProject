import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { getSingleItem } from '../services/services';
import ReactPlayer from 'react-player';
function VideoCard() {
  const [videolink, setVideoLink] = useState('');

  const { id } = useParams();

  const rootData = async () => {
    const result = await getSingleItem(id);

    setVideoLink(result?.data['@microsoft.graph.downloadUrl']);
  };

  useEffect(() => {
    rootData();
  }, []);
  return (
    <div className='container text-center'>
      <h3 style={{ marginTop: '2rem' }}>This is Video</h3>
      <div className='row justify-content-center mt-5'>
        <div
          style={{
            height: '500px',
            overflow: 'hidden',
            padding: '0',
          }}
          class='col-9'
        >
          <ReactPlayer
            url={videolink}
            playing={true}
            controls={true}
            width='100%'
            height='500px'
          />
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
