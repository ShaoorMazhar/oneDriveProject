import React, { useState, useEffect } from 'react';

import urlimg from '../assets/myDoc.pdf';

import { Document, Page, pdfjs } from 'react-pdf';

export default function PdfCard() {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });
  const [numPage, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess() {
    setNumPages(numPage);
    setPageNumber(1);
  }
  console.log(urlimg);
  return (
    <div className='container text-center'>
      <div className='row justify-content-center mt-2'>
        <div
          style={{
            height: '96vh',
            overflow: 'hidden',
            padding: '0',

            display: 'flex',
            justifyContent: 'center',
          }}
          className='col-8'
        >
          <Document file={urlimg} onloadSuccess={() => onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber}></Page>
          </Document>
        </div>
      </div>
    </div>
  );
}
