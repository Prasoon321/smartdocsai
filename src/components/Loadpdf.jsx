import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null); // Initialize numPages as null
  const [pageNumber, setPageNumber] = useState(1);

  // Callback function to set number of pages once the document is loaded
  function onDocumentLoadSuccess({ numPages }) {
    console.log("Document loaded, number of pages:", numPages);
    setNumPages(numPages);
  }
  console.log("PDF file received in PdfComp:", pdfFile); // Ensure the file URL is being passed

  // Function to go to the next page
  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Function to go to the previous page
  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div
      className="pdf-div"
      style={{
        height: "90vh", // Set a maximum height relative to the viewport
        width: "80vw", // Set a maximum width relative to the viewport
        maxHeight: "90%", // Ensure it doesn't exceed 80% of the screen height
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
      <p style={{ color: "black" }}>
        Page {pageNumber} of {numPages}
      </p>

      {/* Render the Document component */}
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        style={{ color: "black" }}
      >
        <Page
          style={{ color: "black" }}
          pageNumber={pageNumber} // Render only the current page
          renderTextLayer={false} // Disable text layer for better performance
          renderAnnotationLayer={false} // Disable annotation layer for better performance
        />
      </Document>

      {/* Navigation buttons for Next/Prev page */}
      <div className="pdf-navigation" style={{ color: "black" }}>
        <button
          onClick={goToPrevPage}
          disabled={pageNumber === 1}
          style={{ marginRight: "20px" }}
        >
          Previous
        </button>
        <button onClick={goToNextPage} disabled={pageNumber === numPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PdfComp;
