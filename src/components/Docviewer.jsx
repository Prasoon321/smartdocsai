import mammoth from "mammoth";
import { useState, useEffect } from "react";

const DocViewer = ({ docFile }) => {
  const [docContent, setDocContent] = useState(null);

  useEffect(() => {
    const fetchDocContent = async () => {
      try {
        const response = await fetch(docFile); // Fetch the DOCX file
        const arrayBuffer = await response.arrayBuffer(); // Convert to ArrayBuffer
        const { value } = await mammoth.convertToHtml({ arrayBuffer });
        setDocContent(value); // Set the HTML content
      } catch (err) {
        console.error("Error reading DOCX file:", err);
        setDocContent("<p>Failed to load document.</p>");
      }
    };

    if (docFile) fetchDocContent();
  }, [docFile]);

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
      dangerouslySetInnerHTML={{ __html: docContent }}
    />
  );
};

export default DocViewer;
