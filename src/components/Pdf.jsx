// PDFViewer.jsx
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfComp = ({ pdfUrl }) => {
  if (!pdfUrl) {
    return <p style={{ padding: "1rem" }}>Select a PDF to view.</p>;
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
