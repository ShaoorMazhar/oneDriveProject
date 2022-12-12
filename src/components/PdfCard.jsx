import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Document, Page, pdfjs } from 'react-pdf';

export default function PdfCard() {
  const [pdfLink, setPdfLink] = useState('');

  const { id } = useParams();
  const rootData = async () => {
    const result = await getSingleItem(id);

    setPdfLink(result?.data['@microsoft.graph.downloadUrl']);
  };
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    rootData();
  });
  const [numPage, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess() {
    setNumPages(numPage);
    setPageNumber(1);
  }

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
          <Document file={pdfLink} onloadSuccess={() => onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber}></Page>
          </Document>
        </div>
      </div>
    </div>
  );
}
