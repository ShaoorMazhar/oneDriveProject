import React from 'react';

import { Link } from 'react-router-dom';

export default function LinkGroup({ videoid, pdfid, imageid }) {
  return (
    <div>
      <h4 style={{ marginTop: '3rem' }}>Load the following files</h4>
      <div style={{ marginTop: '1rem' }}>
        {imageid === undefined ? (
          <>
            <Link to={``} style={{ fontSize: '18px' }}>
              Image
            </Link>
            <p> Image is not available</p>
          </>
        ) : (
          <Link to={`/imageCard/${imageid}`} style={{ fontSize: '18px' }}>
            Image
          </Link>
        )}
      </div>
      <div style={{ marginTop: '1rem' }}>
        {pdfid === undefined ? (
          <>
            <Link to={``} style={{ fontSize: '18px' }}>
              Pdf
            </Link>
            <p>pdf is not available</p>
          </>
        ) : (
          <Link to={`/pdfCard/${pdfid}`} style={{ fontSize: '18px' }}>
            Pdf
          </Link>
        )}
      </div>

      <div style={{ marginTop: '1rem' }}>
        {videoid === undefined ? (
          <>
            <Link to={``} style={{ fontSize: '18px' }}>
              Video
            </Link>
            <p>video is not available</p>
          </>
        ) : (
          <Link to={`/videoCard/${videoid}`} style={{ fontSize: '18px' }}>
            Video
          </Link>
        )}
      </div>
    </div>
  );
}
