import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
// import { pdfjs } from "react-pdf";
// import { useNavigate } from "react-router-dom";
import Pdf from "./Pdf";
import "./dashboard.css";
import "./modal.css";
import Joyride from "react-joyride";
import Loader from "./Loader";
import ReactFileViewer from "react-file-viewer";
// import PdfComp from "./Loadpdf";
const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [fileextension, setfileextensiom] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [urlcreate, setUrlcreate] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [showtxtfile, setShowtxtfile] = useState(false);
  const [showdocfile, setShowdocfile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showPdf, setShowPdf] = useState(false);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null); // To store uploaded file
  const [pdffile, setPdfFile] = useState(null); // To store uploaded file
  const [fileName, setFileName] = useState(""); // To store the file name
  // const [selectedPDF, setSelectedPDF] = useState(null);
  const [{ run, steps }, setState] = useState({
    run: false,
    steps: [
      {
        content: <h2>How to use SmartDocsAi!</h2>,
        locale: { skip: <strong>SKIP</strong> },
        placement: "center",
        target: "#startchat",
      },
      {
        content: <h2>Upload your pdf first!</h2>,
        placement: "right",
        target: "#secondstep",
        title: "Upload your pdf",
      },
      {
        content: <h2>Now ask from pdf!</h2>,
        placement: "bottom",
        target: "#thirdstep",
        title: "Ask question from your pdf",
      },
    ],
  });
  const showdocument = () => {
    if (fileextension === "txt") {
      setShowtxtfile(true);
    } else if (fileextension === "pdf") {
      setShowPdf(true);
    } else if (fileextension === "doc") {
      setShowdocfile(true);
    }
  };
  // pdfjs.GlobalWorkerOptions.workerSrc =
  //   "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";
  // useEffect(() => {
  //   if (window.innerWidth <= 576) {
  //     // Adjust the breakpoint as needed
  //     setSidebarVisible(false);
  //   }
  // }, []);
  const boxShadowStyle = {
    boxShadow:
      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
  };
  // const asking query from the langchain
  const docupload = (file) => {
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const fileType = file.type;
    const fileUrl = URL.createObjectURL(file);
    console.log(fileUrl);
    setIsLoading(true);
    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);
    if (fileExtension === "pdf" && fileType === "application/pdf") {
      setPdfFile(fileUrl);
      setfileextensiom("pdf");
    }
    if (fileExtension === "doc" || fileExtension === "docx") {
      setfileextensiom("doc");
      setUrlcreate(fileUrl);
    }
    if (file && file.type === "text/plain") {
      setfileextensiom("txt");
      const reader = new FileReader();
      reader.onload = () => {
        setFileContent(reader.result); // Set the file content to state
      };
      reader.readAsText(file); // Read the file as text
    }
    fetch("https://fastapi-backend-ppfg.onrender.com/api/upload-file", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((langchainResponse) => {
        setIsLoading(false);
        setShowMessage(true);
        console.log(langchainResponse.message);
        // Hide the message after 2.5 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 2500);
      })
      .catch((error) => {
        alert("Error uploading file: ", error);
        setIsLoading(false);
      });
  };

  const queryUpload = (message) => {
    const formData = new FormData();
    formData.append("query", message);
    //https://fastapi-backend-ppfg.onrender.com
    // http://127.0.0.1:8000
    fetch("https://fastapi-backend-ppfg.onrender.com/api/query-pinecone", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((langchainResponse) => {
        // Check if 'answer' exists in the response
        if (langchainResponse) {
          const botMessage = langchainResponse.answer;
          console.log(langchainResponse.detail);
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
      setPdfFile(uploadedFile);
      setFileName(uploadedFile.name);
      setOpenModal(false);
      docupload(uploadedFile);
    }
  };

  // Handle file upload via input
  const handleFileUpload = (files) => {
    const uploadedFile = files[0];

    if (uploadedFile) {
      const fileType = uploadedFile.type;

      // Check if the file type is valid
      const validFileTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (validFileTypes.includes(fileType)) {
        setFile(uploadedFile);
        setOpenModal(false);
        setFileName(uploadedFile.name);
        docupload(uploadedFile);
      } else {
        alert(
          "Unsupported file type. Please upload a PDF, Word document, or text file."
        );
      }
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setPdfFile(null);
  };
  // Step 1: Handle user clicking the "Send" button or pressing Enter
  const handleSendMessage = () => {
    // Step 2: Capture input and file.
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: input }, // Add user message
        { type: "bot", text: "Wait..." }, // Add bot message that says "Wait..."
      ]); // Add "Wait..." as a bot message immediately

      // Clear input and file after sending
      setInput("");
      queryUpload(input);
    }
  };
  useEffect(() => {
    // Check localStorage to see if the tour has been completed
    const hasCompletedTour = localStorage.getItem("hasCompleteddashboardTour");
    if (!hasCompletedTour) {
      setState((prev) => ({ ...prev, run: true }));
    }
  }, []);
  const handleJoyrideCallback = (data) => {
    const { status } = data; // status includes information like "finished" or "skipped"
    const finishedStatuses = ["finished", "skipped"];
    if (finishedStatuses.includes(status)) {
      // Mark the tour as completed
      localStorage.setItem("hasCompleteddashboardTour", "true");
      setState((prev) => ({ ...prev, run: false }));
    }
  };
  return (
    <div className="dashboard">
      {/* <PdfComp/> */}
      <Joyride
        continuous
        callback={handleJoyrideCallback}
        run={run}
        steps={steps}
        hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
      />
      {isLoading && <Loader />}
      {/* {showMessage && <Donewithparsingmsg />} */}
      {/* Sidebar */}
      <div
        className={`sidebar ${
          sidebarVisible ? "" : "hidden"
        } w-64 min-w-[250px]`}
      >
        <div className="pdf-upload-app">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">PDF Query App</h2>

            <div
              className="hamburger-menu"
              onClick={() => setSidebarVisible(!sidebarVisible)}
            >
              <span className="text-white text-3xl" style={{ color: "red" }}>
                X
              </span>
            </div>
          </div>

          {/* Upload Button */}
          <label
            className="upload-btn inline-block w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            id="secondstep"
          >
            Upload PDF
            <input hidden onClick={() => setOpenModal(true)} />
          </label>

          {/* Uploaded File Section */}
          {fileextension && (
            <div
              className="file-info flex items-center justify-between bg-white mt-4 p-2 border rounded-md shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
              style={boxShadowStyle}
            >
              <div
                className="file-name text-black flex justify-center items-center text-lg font-semibold"
                style={{
                  marginRight: "15px",
                  paddingBottom: "8px",
                  fontSize: "15px",
                }}
              >
                {fileName}
              </div>
              <div className="file-actions flex items-center space-x-2">
                {/* Show File Icon */}
                <button
                  className="text-red-600 hover:text-red-800 text-xl font-semibold"
                  style={{ marginRight: "15px" }}
                  onClick={showdocument}
                >
                  <span className="text-lg">&#128065;</span>
                </button>
                {/* Remove File Icon */}
                <button
                  className="text-red-600 hover:text-red-800 text-xl font-semibold"
                  onClick={handleRemoveFile}
                >
                  <span className="text-lg">X</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Container */}
      <div className="chat-container flex-1 p-4">
        <div className="chat-header">
          <div
            className="hamburger-menu"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            <span>{"<"}</span>
            <span>{"<"}</span>
            <span>{"<"}</span>
          </div>
        </div>

        <div
          className="chat-messages overflow-auto max-h-[70vh]"
          id="startchat"
        >
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.type}`}>
              {message.text}
            </div>
          ))}
        </div>

        <div className="chat-input mt-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={handleSendMessage}
            id="thirdstep"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>

      {/* Pdf show container  */}
      {showPdf && (
        <div
          style={{
            position: "relative", // Ensure that the cross button is positioned relative to this container
          }}
        >
          {/* Cross Button */}
          <button
            style={{
              position: "absolute",
              top: "25px",
              right: "250px",
              background: "white",
              color: "black",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              width: "150px",
              zIndex: 10000,
              fontWeight: "700",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px", // Ensure the button is above the PDF viewer
            }}
            onClick={() => setShowPdf(false)} // Hide the PDF viewer when clicked
          >
            Close Pdf
          </button>

          {/* PDF Viewer */}
          {/* <PdfComp pdfFile={pdffile} /> */}
          <Pdf pdfFile={pdffile} />
        </div>
      )}
      {/* Txt file show up  */}
      {showtxtfile && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <span
                className="close-btn"
                onClick={() => setShowtxtfile(false)} // Close modal
              >
                &times;
              </span>
              <h2>File Content</h2>
            </div>
            <div className="file-content">
              <pre style={{ color: "black" }}>{fileContent}</pre>
            </div>
          </div>
        </div>
      )}
      {/* Show DOC File Content */}
      {showdocfile && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Viewing {fileName}</div>
              <button
                className="close-btn"
                onClick={() => setShowdocfile(false)}
              >
                &times;
              </button>
            </div>
            <ReactFileViewer filePath={urlcreate} />
          </div>
        </div>
      )}

      {/* Modal pop-up */}
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="border-slate-950"
        style={{
          position: "absolute",
          width: "70%",
          left: "255px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        }}
      >
        <Modal.Header className="text-black">Upload PDFs for Doc</Modal.Header>
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
            <p className="text-gray-600 text-black">
              Upload OR drag & drop your PDFs here.
            </p>
            <input
              type="file"
              accept=".pdf, .doc, .docx, .txt" // Updated to allow .txt files
              onChange={(e) => handleFileUpload(e.target.files)} // Handle file selection
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer mt-2 text-blue-600 underline text-black"
            >
              Choose files
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p className="text-sm text-gray-500 text-black">
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
