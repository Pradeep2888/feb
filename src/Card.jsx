import axios from 'axios';
import JsFileDownloader from 'js-file-downloader';
import React, { useState } from 'react'

function Card({name,url}) {
    const [pdfUrl, setPdfUrl] = useState('');

    const handleDownloadPDF = () => {
      
      const headers = {
        'Content-Type': 'application/pdf',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Basic your-api-key:_tS12r6anXnyhxe2-wGaOJFbjZA',
      };
      fetch(url, { headers })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          setPdfUrl(url);
        })
        .catch(error => {
          console.error(error);
        });
    };
  return (
    <div>
        <p>{name}</p>
        <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  )
}

export default Card