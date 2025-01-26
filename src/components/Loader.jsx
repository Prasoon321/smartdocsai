import "./modal.css";
import { useState, useEffect } from "react";

const Loader = () => {
  const [text, setText] = useState("Parsing Document...");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setText("Embedding Document...");
    }, 2500); // After 1 second, change to "Embedding Document..."

    const timer2 = setTimeout(() => {
      setText("Storing Embedding...");
    }, 5000); // After 2 more seconds, change to "Storing Embedding..."

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  return (
    <div>
      <div className="loader-container">
        <div
          className="terminal-loader"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <div className="terminal-header">
            <div className="terminal-title">Status </div>
            <div className="terminal-controls">
              <div className="control close"></div>
              <div className="control minimize"></div>
              <div className="control maximize"></div>
            </div>
          </div>
          <div className="text">{text}</div>
        </div>
      </div>
    </div>
  );
};

const Donewithparsingmsg = () => {
  return (
    <div>
      <div className="loader-container">
        <div
          className="terminal-loader"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <div className="terminal-header">
            <div className="terminal-title">Status : Submitted</div>
            <div className="terminal-title">Parsing Completed</div>
            <div className="terminal-controls">
              <div className="control close"></div>
              <div className="control minimize"></div>
              <div className="control maximize"></div>
            </div>
          </div>
          <div className="text">Ask Question Now</div>
        </div>
      </div>
    </div>
  );
};

export { Donewithparsingmsg }; // Named export
export default Loader; // Default export
