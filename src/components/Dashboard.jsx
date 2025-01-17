import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import PdfComp from "./Pdf";
import "./dashboard.css";
import "./modal.css";

const Dashboard = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [input, setInput] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const pdfurl = [];
  const navigate = useNavigate();

  useEffect(() => {
    // Load PDF URLs from localStorage on component mount
    const storedPdfUrls = JSON.parse(localStorage.getItem("pdfUrls")) || [];
    setPdfUrls(storedPdfUrls);
    console.log(storedPdfUrls);
  }, []);

  const handleFileUploadmain = (files) => {
    const file = files[0]; // Get the first file (as we are only allowing one file)

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedPDF(fileURL);
    }
    if (file) {
      setPdfFile(file); // Set the selected file in state
      setOpenModal(false); // Close modal if necessary
      handleSubmit(file); // Call the handleSubmit function with the selected file
      console.log("File selected:", file);
    } else {
      alert("Please select a valid file.");
    }
  };

  const handleFileDrop = (files) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        handleSubmit(file); // Pass the file to handleSubmit
      } else {
        alert("Please upload a valid PDF file.");
      }
    }
  };
  const handleSubmit = async (file) => {
    if (!file) {
      alert("File is not uploaded ");
      return;
    }

    const formData = new FormData();
    const formDatacloud = new FormData();
    const userinfo = JSON.parse(localStorage.getItem("user"));
    if (!userinfo) {
      throw new Error("User information not found");
    }

    // Create FormData and append fields
    formDatacloud.append("pdf", file); // Append the file
    formData.append("pdf", file); // Append the file
    const newPdf = { name: file.name };

    // Update pdfUrls by adding the new PDF without overwriting the state

    setPdfUrls((prevPdfUrls) => {
      const updatedPdfUrls = [...prevPdfUrls, newPdf];
      localStorage.setItem("pdfUrls", JSON.stringify(updatedPdfUrls)); // Save to localStorage
      return updatedPdfUrls;
    });
    // Send the PDF to Node.js for Cloudinary upload
    fetch("http://localhost:3000/api/upload-pdf", {
      method: "POST",
      body: formDatacloud,
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((cloudinaryResponse) => {
        console.log(cloudinaryResponse); // Log the entire response
        console.log(cloudinaryResponse.pdfpath); // Access the pdfpath
      })
      .catch((error) => {
        console.error("Error uploading PDF:", error); // Handle any errors
      });

    fetch("http://127.0.0.1:8000/api/ask-query", {
      method: "POST",
      body: formDatacloud,
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((langchainResponse) => {
        console.log(langchainResponse); // Log the entire response
        console.log(langchainResponse.text); // Access the pdfpath

        alert("Exceeded access token limit");
      })
      .catch((error) => {
        console.error("Error fetching answer from PDF:", error); // Handle any errors
      });
  };

  const handleRemoveFile = (url) => {
    // Remove the PDF URL from the array
    const updatedPdfUrls = pdfUrls.filter((pdfUrl) => pdfUrl.path !== url);

    // Save the updated list to localStorage
    localStorage.setItem("pdfUrls", JSON.stringify(updatedPdfUrls));

    // Update the state
    setPdfUrls(updatedPdfUrls);
    setSelectedPdfUrl(null);
  };

  const handleViewFile = (url) => {
    // Assuming pdf.path contains a unique ID or URL
    navigate(`${encodeURIComponent(url)}`);
  };
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { type: "user", text: input }]);
      setInput("");

      // Simulate a response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "This is a response based on the PDF content." },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarVisible ? "" : "hidden"}`}>
        <div className="pdf-upload-app">
          <h2 className="text-2xl font-bold mb-4">PDF Query App</h2>

          {/* Upload Button */}
          <label className="upload-btn inline-block cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Upload PDF
            <input hidden onClick={() => setOpenModal(true)} />
          </label>

          {/* Uploaded File Section */}
          {pdfUrls.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium">Uploaded PDFs:</h3>
              <ul className="mt-2 space-y-2">
                {pdfUrls.map((pdf, index) => (
                  <li
                    key={index}
                    className="flex items-center  p-2 border rounded-md bg-gray-100"
                  >
                    <span
                      className="truncate"
                      style={{ color: "black", marginRight: "10px" }}
                    >
                      {pdf.name}
                    </span>
                    <div className="flex space-x-2">
                      {/* Eye Icon */}
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleViewFile(pdf.path)}
                        style={{
                          color: "black",
                          marginRight: "5px",
                          fontSize: "30px",
                        }}
                      >
                        &#128065; {/* Eye Icon */}
                      </button>
                      {/* Cross Icon */}
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveFile(pdf.path)}
                        style={{
                          color: "black",
                          fontSize: "20px",
                        }}
                      >
                        &#x2715; {/* Cross Icon */}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        <div className="chat-header">
          <div
            className="hamburger-menu"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            <span>{"<"}</span>
            <span>{"<"}</span>
            <span>{"<"}</span>
          </div>
          <h3>Ask Questions</h3>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.type}`}>
              {message.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      {/* Pdf show container  */}
      {selectedPDF && (
        <div
          style={{
            width: "30%",
            borderLeft: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <PdfComp pdfUrl={selectedPDF} />
        </div>
      )}
      {/* Modal pop-up */}
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        style={{ position: "absolute", width: "70%", left: "255px" }}
      >
        <Modal.Header>Upload PDFs for Doc</Modal.Header>
        <Modal.Body>
          {/* Drag and Drop Section */}
          <div
            onDrop={(e) => {
              e.preventDefault();
              handleFileDrop(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
            className="drag-drop-area border-2 border-dashed border-gray-300 p-4 rounded-md text-center"
          >
            <p className="text-gray-600">
              Upload OR drag & drop your PDFs here.
            </p>
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={(e) => handleFileUploadmain(e.target.files)} // Handle file selection
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer mt-2 text-blue-600 underline"
            >
              Choose files
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p className="text-sm text-gray-500">
            *Upload PDF documents up to a maximum of 10MB each to your
            collection to start a conversation.
          </p>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
