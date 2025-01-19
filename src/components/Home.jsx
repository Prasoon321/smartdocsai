import { useState, useEffect } from "react";
import FeatureSection from "./FeatureSection";
import Workflow from "./Workflow";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const Home = () => {
  const navigate = useNavigate();

  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
      // Storing relevant user details in localStorage
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
  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      loginWithRedirect().catch((error) => {
        console.log("Login failed:", error);
      });
    }
  };
  return (
    <div className="max-w-7xl mx-auto pt-20 px-6">
      <div className="flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
          Search and Analyze Your
          <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            {" "}
            PDFs or Docs Effortlessly
          </span>
        </h1>
        <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
          Simplify your document workflows with our powerful platform. Extract,
          search, and analyze data from PDFs and documents effortlessly. Unlock
          insights, save time, and manage your files smarter today!
        </p>
        <div className="flex justify-center my-10">
          <a
            className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
            id="stepstart"
            onClick={handleLogin}
            style={{ cursor: "pointer" }}
          >
            Start for free
          </a>
          <a href="#" className="py-3 px-4 mx-3 rounded-md border" id="stepdoc">
            Documentation
          </a>
        </div>
      </div>
      <FeatureSection />
      <Footer />
    </div>
  );
};

export default Home;
