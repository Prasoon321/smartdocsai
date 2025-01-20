import "./modal.css";

const Loader = () => {
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
          <div className="text">Parsing Pdf...</div>
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
