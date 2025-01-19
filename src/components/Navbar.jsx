import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import AlterComponent from "../components/AlterComponent";
import { useNavigate } from "react-router-dom";
import Joyride, { STATUS } from "react-joyride";
import "./modal.css";
const Navbar = () => {
  const navigate = useNavigate();
  const [usercred, Setusercred] = useState({});
  const [userdeatil, SetUserDeatil] = useState({});
  const [isauth, SetIsAuth] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [{ run, steps }, setState] = useState({
    run: false,
    steps: [
      {
        content: <h2>Click the button to begin your journey!</h2>,
        locale: { skip: <strong>SKIP</strong> },
        placement: "center",
        target: "#stepstart",
      },
      {
        content: <h2>Sign up to unlock powerful features!</h2>,
        placement: "bottom",
        target: "#stepsaccount",
        title: "First step",
      },
      {
        content: <h2>Learn how to make the most of our platform!</h2>,
        placement: "bottom",
        target: "#stepdoc",
        title: "Second step",
      },
    ],
  });

  const [isauthenticated, setIsauthenticated] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const openLink = () => {
    window.open("https://github.com/Prasoon321/smartdocsai.git", "_blank");
  };
  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      loginWithRedirect().catch((error) => {
        console.log("Login failed:", error);
      });
    }
  };
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  useEffect(() => {
    if (isAuthenticated && user) {
      // Storing relevant user details in localStorage
      setIsauthenticated(true);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          name: user.name,
          picture: user.picture,
          authToken: true,
        })
      );
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    // Check localStorage to see if the tour has been completed
    const hasCompletedTour = localStorage.getItem("hasCompletedTour");
    if (!hasCompletedTour) {
      setState((prev) => ({ ...prev, run: true }));
    }
    const userinfo = JSON.parse(localStorage.getItem("user"));
    if (userinfo) {
      SetIsAuth(true);
      SetUserDeatil({ name: userinfo.name, photo: userinfo.picture });
    }
  }, []);
  const handleJoyrideCallback = (data) => {
    const { status } = data; // status includes information like "finished" or "skipped"
    const finishedStatuses = ["finished", "skipped"];
    if (finishedStatuses.includes(status)) {
      // Mark the tour as completed
      localStorage.setItem("hasCompletedTour", "true");
      setState((prev) => ({ ...prev, run: false }));
    }
  };
  return (
    <nav className="sticky top-0 z-50 py-1 backdrop-blur-lg border-b border-neutral-700/80">
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
      {showAlert && <AlterComponent />}
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">SmartDocsAi</span>
          </div>
          <ul>
            <button className="btn-github" onClick={openLink}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14C6.33325 13.8466 6.33325 13.4266 6.33325 12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2133 10.6933 10.7733 9.20659 10.94C9.44659 11.1466 9.66659 11.5533 9.66659 12.1733C9.66659 13.0666 9.66659 13.7866 9.66659 14C9.66659 14.18 9.77325 14.3933 10.1133 14.3333C12.7599 13.44 14.6666 10.9466 14.6666 7.99998C14.6666 7.1245 14.4941 6.25759 14.1591 5.44876C13.8241 4.63992 13.333 3.90499 12.714 3.28593C12.0949 2.66688 11.36 2.17581 10.5511 1.84078C9.7423 1.50575 8.8754 1.33331 7.99992 1.33331V1.33331Z"
                  fill="currentcolor"
                ></path>
              </svg>
              <span>View on Github</span>
            </button>
          </ul>
          <div className="lg:flex justify-center space-x-12 items-center">
            {isauth ? (
              <>
                <a
                  className=" py-2 px-3 rounded-md flex items-center justify-center"
                  style={{ cursor: "pointer" }}
                  id="stepsaccount"
                >
                  <div
                    style={{
                      width: "50px", // Fixed width
                      height: "50px", // Fixed height to maintain a square shape
                      overflow: "hidden", // Ensures the image doesn't overflow the container
                      borderRadius: "50%", // Makes the container circular if you want a round image
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={userdeatil.photo}
                      style={{
                        width: "100%", // Ensures the image fits within the container's width
                        height: "100%", // Ensures the image fits within the container's height
                        objectFit: "cover", // Ensures the image covers the area without stretching
                      }}
                      alt={userdeatil.name}
                    />
                  </div>
                </a>
              </>
            ) : (
              <a
                className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                onClick={handleLogin}
                style={{ cursor: "pointer" }}
                id="stepsaccount"
              >
                Create an account
              </a>
            )}
          </div>

          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <button className="btn-github">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99992 1.33331C7.12444 1.33331 6.25753 1.50575 5.4487 1.84078C4.63986 2.17581 3.90493 2.66688 3.28587 3.28593C2.03563 4.53618 1.33325 6.23187 1.33325 7.99998C1.33325 10.9466 3.24659 13.4466 5.89325 14.3333C6.22659 14.3866 6.33325 14.18 6.33325 14C6.33325 13.8466 6.33325 13.4266 6.33325 12.8733C4.48659 13.2733 4.09325 11.98 4.09325 11.98C3.78659 11.2066 3.35325 11 3.35325 11C2.74659 10.5866 3.39992 10.6 3.39992 10.6C4.06659 10.6466 4.41992 11.2866 4.41992 11.2866C4.99992 12.3 5.97992 12 6.35992 11.84C6.41992 11.4066 6.59325 11.1133 6.77992 10.9466C5.29992 10.78 3.74659 10.2066 3.74659 7.66665C3.74659 6.92665 3.99992 6.33331 4.43325 5.85998C4.36659 5.69331 4.13325 4.99998 4.49992 4.09998C4.49992 4.09998 5.05992 3.91998 6.33325 4.77998C6.85992 4.63331 7.43325 4.55998 7.99992 4.55998C8.56659 4.55998 9.13992 4.63331 9.66659 4.77998C10.9399 3.91998 11.4999 4.09998 11.4999 4.09998C11.8666 4.99998 11.6333 5.69331 11.5666 5.85998C11.9999 6.33331 12.2533 6.92665 12.2533 7.66665C12.2533 10.2133 10.6933 10.7733 9.20659 10.94C9.44659 11.1466 9.66659 11.5533 9.66659 12.1733C9.66659 13.0666 9.66659 13.7866 9.66659 14C9.66659 14.18 9.77325 14.3933 10.1133 14.3333C12.7599 13.44 14.6666 10.9466 14.6666 7.99998C14.6666 7.1245 14.4941 6.25759 14.1591 5.44876C13.8241 4.63992 13.333 3.90499 12.714 3.28593C12.0949 2.66688 11.36 2.17581 10.5511 1.84078C9.7423 1.50575 8.8754 1.33331 7.99992 1.33331V1.33331Z"
                  fill="currentcolor"
                ></path>
              </svg>
              <span>View on Github</span>
            </button>
            <div className="flex space-x-6">
              <a
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
                onClick={handleLogin}
                style={{ cursor: "pointer" }}
              >
                Create an account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
