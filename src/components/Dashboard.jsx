import { useState } from "react";
import { Button, Modal } from "flowbite-react";
// import { useNavigate } from "react-router-dom";
// import PdfComp from "./Pdf";
import "./dashboard.css";
import "./modal.css";

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null); // To store uploaded file
  const [fileName, setFileName] = useState(""); // To store the file name
  // const [selectedPDF, setSelectedPDF] = useState(null);

  // const asking query from the langchain
  const queryUpload = (message, file) => {
    const formData = new FormData();
    formData.append("pdf", file); // 'pdf' matches the backend's expected parameter name
    formData.append("query", message);

    console.log(message);
    console.log(file); // Add user message to the request

    // Step 5: Send FormData to FastAPI
    fetch("https://smartdocaifastapi-1.onrender.com/api/ask-query", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((langchainResponse) => {
        // Check if 'answer' exists in the response
        if (langchainResponse && langchainResponse.answer) {
          const botMessage = langchainResponse.answer;
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = {
              type: "bot",
              text: botMessage,
            };
            return updatedMessages;
          });
        } else {
          // Handle the case when there is no answer in the response
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1] = {
              type: "bot",
              text: "Sorry, I couldn't find an answer similar to your question in context to the pdf",
            };
            return updatedMessages;
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching answer from PDF:", error);
      });
  };

  // Handle drag and drop
  const handleFileDrop = (files) => {
    const uploadedFile = files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    }
  };

  // Handle file upload via input
  const handleFileUpload = (files) => {
    const uploadedFile = files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
  };
  // Step 1: Handle user clicking the "Send" button or pressing Enter
  const handleSendMessage = () => {
    // Step 2: Capture input and file
    if (input.trim() || file) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: input }, // Add user message
        { type: "bot", text: "Wait..." }, // Add bot message that says "Wait..."
      ]); // Add "Wait..." as a bot message immediately

      // Clear input and file after sending
      setInput("");
      setFile(null);

      // Step 3: Prepare FormData for file upload
      queryUpload(input, file);
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
          {file && fileName && (
            <div className="file-info flex items-center justify-between mt-4 p-2 border rounded-md shadow-lg hover:shadow-xl transition-all">
              <div className="file-name text-gray-800">{fileName}</div>
              <div className="file-actions flex items-center space-x-2">
                {/* Open PDF Icon (assuming you have a method to show PDF) */}
                <button
                  className="text-blue-600"
                  onClick={() =>
                    window.open(URL.createObjectURL(file), "_blank")
                  }
                >
                  <i className="fas fa-eye"></i>{" "}
                  {/* Eye Icon for showing PDF */}
                </button>

                {/* Remove File Icon */}
                <button className="text-red-600" onClick={handleRemoveFile}>
                  <i className="fas fa-times-circle"></i>{" "}
                  {/* Cross Icon to remove */}
                </button>
              </div>
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
          <h3>Step 1 : Select One Pdf at a time</h3>
          <h3 style={{ marginRight: "20px" }}>
            Step 2 : Ask Questions from your selected pdf
          </h3>
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
      {/* {selectedPDF && (
        <div
          style={{
            width: "30%",
            borderLeft: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <PdfComp pdfUrl={selectedPDF} />
        </div>
      )} */}
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
              onChange={(e) => handleFileUpload(e.target.files)} // Handle file selection
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
