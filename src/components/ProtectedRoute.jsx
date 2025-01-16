import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    // Redirect to home page if authToken is not present
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
