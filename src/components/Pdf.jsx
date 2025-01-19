// PDFViewer.jsx
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useEffect, useState } from "react";

const Pdf = ({ pdfUrl }) => {
  const [validUrl, setValidUrl] = useState(null);

  useEffect(() => {
    if (pdfUrl) {
      console.log("PDF URL:", pdfUrl);
      setValidUrl(pdfUrl);
    }
  }, [pdfUrl]);

  if (!validUrl) {
    return <p>No PDF to display. Please upload a valid PDF file.</p>;
  }

  return (
    <div
      style={{
        height: "80vh", // Set a maximum height relative to the viewport
        width: "80vw", // Set a maximum width relative to the viewport
        maxHeight: "80%", // Ensure it doesn't exceed 80% of the screen height
        maxWidth: "80%", // Ensure it doesn't exceed 80% of the screen width
        overflow: "auto",
        position: "fixed", // Fixes it in the center of the viewport
        top: "50%", // Centers vertically
        left: "50%", // Centers horizontally
        transform: "translate(-50%, -50%)", // Adjusts position to be perfectly centered
        background: "#fff", // Optional: Background color for contrast
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", // Adds a subtle shadow
        borderRadius: "8px", // Optional: Rounded corners for aesthetics
        padding: "16px",
        zIndex: 999, // Optional: Padding inside the container
      }}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default Pdf;
