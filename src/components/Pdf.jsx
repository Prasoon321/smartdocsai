import { Worker, Viewer } from "@react-pdf-viewer/core";
import { useEffect, useState } from "react";

const Pdf = ({ pdfFile }) => {
  const [validUrl, setValidUrl] = useState(null);

  useEffect(() => {
    if (pdfFile) {
      console.log("PDF File Received:", pdfFile); // Log the pdfFile to inspect its value

      // Check if the pdfFile is a valid URL
      const isValidUrl = (url) => {
        try {
          const Url = new URL(url); // Try to create a new URL object to check if it's valid
          return Url;
        } catch (e) {
          return false;
        }
      };

      if (isValidUrl(pdfFile)) {
        console.log("Valid PDF URL:", pdfFile);
        setValidUrl(pdfFile); // Set the valid URL
      } else {
        console.log("Invalid PDF URL:", pdfFile); // Log the invalid URL for debugging
        setValidUrl(null); // Reset the validUrl to null if the URL is invalid
      }
    }
  }, [pdfFile]);

  if (!validUrl) {
    return (
      <p className="text-black">
        No PDF to display. Please upload a valid PDF file.
      </p>
    );
  }

  return (
    <div
      style={{
        height: "80vh",
        width: "80vw",
        maxHeight: "80%",
        maxWidth: "80%",
        overflow: "auto",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        borderRadius: "8px",
        padding: "16px",
        zIndex: 999,
      }}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
        <Viewer fileUrl={validUrl} />
      </Worker>
    </div>
  );
};

export default Pdf;
