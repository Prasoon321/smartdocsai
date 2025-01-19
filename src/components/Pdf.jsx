// PDFViewer.jsx
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useEffect, useState } from "react";

const PdfComp = ({ pdfUrl }) => {
  const [validUrl, setValidUrl] = useState(null);

  useEffect(() => {
    // Validate pdfUrl is not null and create a valid URL if necessary
    if (pdfUrl) {
      setValidUrl(pdfUrl); // Set the valid URL for the viewer
    }
  }, [pdfUrl]);

  if (!validUrl) {
    return <p>No PDF to display. Please upload a valid PDF file.</p>;
  }

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default PdfComp;
