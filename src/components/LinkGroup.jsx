import React from 'react';

import { Link } from 'react-router-dom';

export default function LinkGroup({ videoid }) {
  return (
    <div>
      <h4 style={{ marginTop: '3rem' }}>Load the following files</h4>
      <div style={{ marginTop: '1rem' }}>
        <Link to='/imageCard' style={{ fontSize: '18px' }}>
          Image
        </Link>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Link to='/pdfCard' style={{ fontSize: '18px' }}>
          Pdf
        </Link>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Link to={`/videoCard/${videoid}`} style={{ fontSize: '18px' }}>
          Video
        </Link>
      </div>
    </div>
  );
}
